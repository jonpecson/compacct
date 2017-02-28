/*
 * IIFE to encapsulate code and avoid global variables
 */
(function() {

    /*
     * attaching results controller function to the turtleFacts module 
     */
    angular
        .module("app")
        .controller("agingSummaryBillCtrl", AgingSummaryBillCtrl);

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
    AgingSummaryBillCtrl.$inject = ['$state'];

    /*
     * definition of the results controller function itself. Taking 
     * quizMetrics as an argument
     */
    function AgingSummaryBillCtrl($state) {
        var vm = this;
        
        vm.reportTitle = "Aging Summary Bill Due Date";
    }

})();