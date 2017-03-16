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
    JournalsAddCtrl.$inject = ['$state', '$scope', '$filter', '$http', 'Accounts'];

    function JournalsAddCtrl($state, $scope, $filter, $http, Accounts) {
        var vm = this;
        vm.contacts;
        vm.accounts;

        init();

        function init() {
            Accounts.getAll().success(function(data, status) {
                vm.contacts = data;
                console.log("Contacts: " + vm.contacts);
            });


            Accounts.getAll().success(function(data, status) {
                vm.accounts = data;
                console.log("Accounts: " + vm.accounts);
            });
        }




        vm.journal = {};

        $scope.journal = {};

        $scope.accounts = [{
                code: 1,
                name: "Petty Cash",
                type: "Cash"
            },
            {
                code: 2,
                name: 'Sales',
                type: 'Income'
            },
            {
                code: 3,
                name: 'Expense',
                type: 'Rent Expense'
            }
        ];

        $scope.showAccount = function(user) {
            var selected = [];
            if (user.account) {
                selected = $filter('filter')($scope.accounts, { code: user.account });
            }
            // console.log(selected);
            return selected.length ? selected[0].name : 'Not set';
        };



        $scope.countries = [{
                "code": "AD",
                "name": "Andorra",
                "continent": "Europe"
            },
            {
                "code": "AE",
                "name": "United Arab Emirates",
                "continent": "Asia"
            },
            {
                "code": "AF",
                "name": "Afghanistan",
                "continent": "Asia"
            }
        ];


        $scope.users = [
            { id: 1, account: 1, name: 'awesome user1', status: 2, group: 4, groupName: 'admin' },
            { id: 2, account: 2, name: 'awesome user2', status: undefined, group: 3, groupName: 'vip' },
            { id: 3, account: 3, name: 'awesome user3', status: 2, group: null }
        ];

        $scope.statuses = [
            { value: 1, text: 'status1' },
            { value: 2, text: 'status2' },
            { value: 3, text: 'status3' },
            { value: 4, text: 'status4' }
        ];

        $scope.groups = [];
        $scope.loadGroups = function() {
            // return $scope.groups.length ? null : $http.get('/groups').success(function(data) {
            $scope.groups = [{ id: 1, text: 'admin', level: 'A' }, { id: 2, text: 'vip', level: 'A' }, { id: 3, text: 'customer', level: 'B' }, { id: 4, text: 'user', level: 'B' }];
            // });
        };

        $scope.showGroup = function(user) {
            if (user.group && $scope.groups.length) {
                var selected = $filter('filter')($scope.groups, { id: user.group });
                return selected.length ? selected[0].text : 'Not set';
            } else {
                return user.groupName || 'Not set';
            }
        };

        $scope.showStatus = function(user) {
            var selected = [];
            if (user.status) {
                selected = $filter('filter')($scope.statuses, { value: user.status });
            }
            return selected.length ? selected[0].text : 'Not set';
        };



        $scope.checkName = function(data, id) {
            if (id === 2 && data !== 'awesome') {
                return "Username 2 should be `awesome`";
            }
        };

        $scope.saveUser = function(data, id) {
            //$scope.user not updated yet
            console.log("data before: " + JSON.stringify(data));

            angular.extend(data, { id: id });
            console.log("data after: " + JSON.stringify(data));

            // return $http.post('/saveUser', data);
        };

        // remove user
        $scope.removeUser = function(index) {
            $scope.users.splice(index, 1);
        };

        // add user
        $scope.addUser = function() {
            $scope.inserted = {
                id: $scope.users.length + 1,
                name: '',
                status: null,
                group: null
            };
            $scope.users.push($scope.inserted);
        };

    }

})();