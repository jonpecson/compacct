/*
 * IIFE to encapsulate code and avoid global variables
 */
(function () {

    /*
     * attaching results controller function to the turtleFacts module 
     */
    angular
        .module("app")
        .controller("journalsCtrl", JournalsCtrl);

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
    JournalsCtrl.$inject = ['$state'];

    /*
     * definition of the results controller function itself. Taking 
     * quizMetrics as an argument
     */
    function JournalsCtrl($state) {


        var vm = this;

        vm.myData = [{ age: 3, name: 'star' },
        { age: 2, name: 'sparky' }];

        vm.myGridConfig = {
            // should return your data (an array)        
            getData: function () { return vm.myData; },

            options: {
                showDelete: true,
                columns: [{ field: 'age', inputType: 'number' },
                { field: 'name' }]
            }
        }

        vm.addJournal = function () {
            $state.go('app.journals.add');
        }

        vm.editJournal = function (id) {

        }

        vm.removeJournal = function (id) {

        }
    }

})();