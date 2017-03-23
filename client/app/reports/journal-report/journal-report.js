/*
 * IIFE to encapsulate code and avoid global variables
 */
(function() {

    /*
     * attaching results controller function to the turtleFacts module 
     */
    angular
        .module("app")
        .controller("journalReportCtrl", JournalReportCtrl);

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
    JournalReportCtrl.$inject = ['$state', '$scope', '$http', '$filter'];

    /*
     * definition of the results controller function itself. Taking 
     * quizMetrics as an argument
     */
    function JournalReportCtrl($state, $scope, $http, $filter) {
        var vm = this;

        var API_URL = "http://compacct.api.hybrain.co/api/v1/";
        
        $http.get(API_URL + "journals/filter-by-date")
            .success(function(response) {
                $scope.journalentries = response;
                console.log($scope.journalentries);
                

                });

                // 2017-03-01 00:00:00' && $.journ_date <= '2017-03-31 23:59:59



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