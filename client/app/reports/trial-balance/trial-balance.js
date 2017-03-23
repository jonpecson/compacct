/*
 * IIFE to encapsulate code and avoid global variables
 */
(function() {

    /*
     * attaching results controller function to the turtleFacts module 
     */
    angular
        .module("app")
        .controller("trialBalanceCtrl", TrialBalanceCtrl);

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
    TrialBalanceCtrl.$inject = ['$state', '$scope', '$http', '$filter'];

    /*
     * definition of the results controller function itself. Taking 
     * quizMetrics as an argument
     */
    function TrialBalanceCtrl($state, $scope, $http, $filter) {
        var vm = this;

        vm.reportTitle = "Trial Balance";
        vm.companyName = "Hybrain";

        var API_URL = "http://compacct.api.hybrain.co/api/v1/";

        $http.get(API_URL + "journals/filter-by-date")
            .success(function(response) {
                $scope.journalentries = response;
                // console.log($scope.journalentries);
            });


        var init = function() {
            $http.get(API_URL + "journals/filter-by-date")
                .success(function(response) {
                    var trialBalance = response;
                    // Assets
                    $scope.trialBalanceAssets = Enumerable.From(trialBalance)
                        .Where("$.acc_type_cla_id == 1") //Account Type Classification - Assets
                        .GroupBy("$.acct_name", null,
                            function(key, g) {
                                return {
                                    acct_name: key,
                                    entry_credit: g.Sum("$.entry_credit"),
                                    entry_debit: g.Sum("$.entry_debit")
                                }
                            })
                        .ToArray();

                    // Liabilities
                    $scope.trialBalanceLiabilities = Enumerable.From(trialBalance)
                        .Where("$.acc_type_cla_id == 2") //Account Type Classification - Liabilities
                        .GroupBy("$.acct_name", null,
                            function(key, g) {
                                return {
                                    acct_name: key,
                                    entry_credit: g.Sum("$.entry_credit"),
                                    entry_debit: g.Sum("$.entry_debit")
                                }
                            })
                        .ToArray();


                    // Equity
                    $scope.trialBalanceCapital = Enumerable.From(trialBalance)
                        .Where("$.acc_type_cla_id == 3") //Account Type Classification - Capital
                        .GroupBy("$.acct_name", null,
                            function(key, g) {
                                return {
                                    acct_name: key,
                                    entry_credit: g.Sum("$.entry_credit"),
                                    entry_debit: g.Sum("$.entry_debit")
                                }
                            })
                        .ToArray();

                    // Income
                    $scope.trialBalanceIncome = Enumerable.From(trialBalance)
                        .Where("$.acc_type_cla_id == 4") //Account Type Classification - Income
                        .GroupBy("$.acct_name", null,
                            function(key, g) {
                                return {
                                    acct_name: key,
                                    entry_credit: g.Sum("$.entry_credit"),
                                    entry_debit: g.Sum("$.entry_debit")
                                }
                            })
                        .ToArray();

                    // Expense
                    $scope.trialBalanceExpense = Enumerable.From(trialBalance)
                        .Where("$.acc_type_cla_id == 5") //Account Type Classification - Expense
                        .GroupBy("$.acct_name", null,
                            function(key, g) {
                                return {
                                    acct_name: key,
                                    entry_credit: g.Sum("$.entry_credit"),
                                    entry_debit: g.Sum("$.entry_debit")
                                }
                            })
                        .ToArray();







                    $scope.$broadcast('dataLoaded')
                });

        }
        init();

        $scope.$on('dataLoaded', function(event) {
            console.log('dataLoaded');
            $scope.debitSum = 0;
            $scope.creditSum = 0; // Todo

            // 1. Sum of Debits (Assets, Expense)
            var getDebitTotal = function(account) {
                for (var i = 0; i < account.length; i++) {
                    var item = account[i];
                    var balance = item.entry_debit - item.entry_credit;
                    $scope.debitSum = $scope.debitSum + balance;
                }
            }
            getDebitTotal($scope.trialBalanceAssets);
            getDebitTotal($scope.trialBalanceExpense);
            console.log("Debit Sum: " + $scope.debitSum)




            // 2. Sum of Credits (Liabilities, Capital, Income) Todo
            var getCreditTotal = function(account) {
                for (var i = 0; i < account.length; i++) {
                    var item = account[i];
                    var balance = item.entry_debit - item.entry_credit;
                    $scope.creditSum = $scope.creditSum + balance;
                }
            }
            getCreditTotal($scope.trialBalanceLiabilities);
            getCreditTotal($scope.trialBalanceCapital);

            getCreditTotal($scope.trialBalanceIncome);
            $scope.creditSum = $scope.creditSum * -1;

            console.log("Credit Sum: " + $scope.creditSum);




        });







        // console.log($scope.trialBalance);

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