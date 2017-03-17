/*
 * IIFE to encapsulate code and avoid global variables
 */
(function() {

    /*
     * attaching results controller function to the turtleFacts module 
     */
    angular
        .module("app")
        .controller("generalLedgerCtrl", GeneralLedgerCtrl);

    /*
     * injecting the [] into the students controller 
     * using the $inject method.
     *
     * Injecting dependencies like this is done so as to avoid issues when 
     * uglifying the code. Function arguments will get shortened during the 
     * uglify process but strings will not. Therefore by injecting the argument
     * as strings in an array using the $inject method we can be sure angular 
     * still knows what we want to do.
     */
    GeneralLedgerCtrl.$inject = ['$state', '$scope', '$http', '$filter'];

    /*
     * definition of the results controller function itself. Taking 
     * quizMetrics as an argument
     */
    function GeneralLedgerCtrl($state, $scope, $http, $filter) {
        var vm = this;
        $scope.currency = {};

        //vm.reportTitle = "General Ledger";

        var API_URL = "http://compacct.api.hybrain.co/api/v1/";
        //Retrieve all employees from API
        $http.get(API_URL + "currencies")
            .success(function(response) {
                $scope.currencies = response;
                // for (var j=0; j < data.length; j++) {
                //     $scope.featureName=data[j]; 
                // }
                // console.log($scope.currencies);
            });


        $http.get(API_URL + "accounts")
            .success(function(response) {
                $scope.accounts = response;
                // for (var j=0; j < data.length; j++) {
                //     $scope.featureName=data[j]; 
                // }
                // console.log($scope.accounts);
            });

        $http.get(API_URL + "journals/filter-by-date")
            .success(function(response) {
                var journals = response;

                $scope.journals = Enumerable.From(journals)
                    .GroupBy("$.acct_name", null,
                        function(key, g) {
                            return {
                                acct_name: key,
                                entry_credit: g.Sum("$.entry_credit"),
                                entry_debit: g.Sum("$.entry_debit")
                            }
                        })
                    .ToArray();
                console.log($scope.journals);
            });



        $scope.getBalance = function(debit, credit) {
            var result = debit - credit;
            var total = $filter('currency')(result, '', 2).toString();
            if (result < 0) {
                total = total.replace(/\B(?=(\d{3})+\b)/g, ",").replace(/-(.*)/, "($1)");
            }
            return total;
        }
    }



})();