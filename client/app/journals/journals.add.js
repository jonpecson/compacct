/*
 * IIFE to encapsulate code and avoid global variables
 */
(function() {

    /*
     * attaching  controller function to the  module 
     */
    angular
        .module("app")

    .controller("journalsAddCtrl", JournalsAddCtrl);
    JournalsAddCtrl.$inject = ['$state', '$scope', '$filter', '$http', 'Contacts', 'Accounts', 'Journals'];

    function JournalsAddCtrl($state, $scope, $filter, $http, Contacts, Accounts, Journals) {
        var vm = this;
        vm.contacts = [];
        vm.accounts = [];
        vm.journals = [];
        vm.journal = {};
        vm.journalEntries = [];

        init();

        function init() {
            Contacts.getAll().success(function(data, status) {
                vm.contacts = data;
                console.log("Contacts: " + vm.contacts);

            });


            Accounts.getAll().success(function(data, status) {
                vm.accounts = data;
                console.log("Accounts: " + vm.accounts);
            });

            Journals.getAll().success(function(data, status) {
                vm.journals = data;
                console.log("Journals: " + JSON.stringify(vm.journals));
            })

            selected = $filter('filter')(vm.accounts, { acct_name: '' });

            vm.journalEntries = [
                { id: 1, acct_id: 1, desc: 'sample' },
                { id: 2, acct_id: 2, desc: 'sample' },
                { id: 3, acct_id: 3, desc: 'sample' }
            ];
        }


        // Helper function for displaying Account

        vm.showAccount = function(journal) {
            // console.log(journal);
            var selected = [];
            // if (journal.acct_id) {
            selected = $filter('filter')(vm.accounts, { acct_id: journal.acct_id });
            // }
            // console.log(selected);
            return selected.length ? selected[0].acct_name : 'Not set';
        };


        // Helper function for displaying Contacts
        // vm.showContacts = function(journal) {
        //     // console.log(journal);
        //     var selected = [];
        //     // if (journal.acct_id) {
        //     selected = $filter('filter')(vm.contacts, { contact_id: journal.acct_id });
        //     // }
        //     // console.log(selected);
        //     return selected.length ? selected[0].acct_name : 'Not set';
        // };








        vm.addJournalEntry = function() {
            vm.journalEntries.push({ id: vm.journalEntries.length + 1, acct_id: null });
        };

        vm.saveJournalEntry = function(data, index) {
            //$scope.user not updated yet
            console.log("Account id: " + data.journal.acct_id);

            // angular.extend(data, { id: id });
            console.log("data after: " + JSON.stringify(data));
            console.log("Journal #:" + index);

            vm.journalEntries[index].acct_id = data.journal.acct_id;

            // return $http.post('/saveUser', data);
        };

        vm.removeJournalEntry = function(index) {
            vm.journalEntries.splice(index, 1)
        };



    }

})();