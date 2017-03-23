/*
 * IIFE to encapsulate code and avoid global variables
 */
(function() {

    /*
     * attaching results controller function to the turtleFacts module 
     */
    angular
        .module("app")
        .controller("dailyCashPositionCtrl", DailyCashPositionCtrl);

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
    DailyCashPositionCtrl.$inject = ['$state', '$scope', '$http', '$filter'];

    /*
     * definition of the results controller function itself. Taking 
     * quizMetrics as an argument
     */
    function DailyCashPositionCtrl($state, $scope, $http, $filter) {
        var vm = this;

        var API_URL = "http://compacct.api.hybrain.co/api/v1/";

        var init = function() {
            $http.get(API_URL + "journals/filter-by-date")
                .success(function(response) {
                    var dailyCashPosition = response;
                    
                    $scope.dailyCashPosition = Enumerable.From(dailyCashPosition)
                        /*Account Type
                        Cash - 3
                        */
                        .Where("$.acc_type_id == 3 ", null,
                            function(key, g) {
                                return {
                                    acct_name: key,
                                    entry_credit: g.Sum("$.entry_credit"),
                                    entry_debit: g.Sum("$.entry_debit")
                                }
                            })
                        .ToArray();              
                        console.log("DCP: " + $scope.dailyCashPosition);
                        $scope.$broadcast('dataLoaded')
                });

        }
        init();

        // // $scope.$on('dataLoaded', function(event) {
        // //     console.log('dataLoaded');
        // //     $scope.cfOperatingSum = 0;

        // //     // 1. Sum of Operating Activities
        // //     var getTotal = function(account) {
        // //         for (var i = 0; i < account.length; i++) {
        // //             var item = account[i];
        // //             var balance = item.entry_debit - item.entry_credit;
        // //             $scope.cfOperatingSum = $scope.cfOperatingSum + balance;
        // //         }
        // //     }
        // //     getTotal($scope.cashFlowOperation);
        // //     console.log("Income Sum: " + $scope.cfOperatingSum)


             
            
        // });

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