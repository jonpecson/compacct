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
    GeneralLedgerCtrl.$inject = ['$state', '$scope', '$http'];

    /*
     * definition of the results controller function itself. Taking 
     * quizMetrics as an argument
     */
    function GeneralLedgerCtrl($state, $scope, $http) {
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
                console.log($scope.currencies);
            });


        $http.get(API_URL + "accounts")
            .success(function(response) {
                $scope.accounts = response;
                // for (var j=0; j < data.length; j++) {
                //     $scope.featureName=data[j]; 
                // }
                console.log($scope.accounts);
            });




    }



})();