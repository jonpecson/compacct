/*
 * IIFE to encapsulate code and avoid global variables
 */
(function() {

    /*
     * attaching results controller function to the turtleFacts module 
     */
    angular
        .module("app")
        .controller("profitLossCtrl", ProfitLossCtrl);

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
    ProfitLossCtrl.$inject = ['$state', '$scope', '$http', '$filter'];

    /*
     * definition of the results controller function itself. Taking 
     * quizMetrics as an argument
     */
    function ProfitLossCtrl($state, $scope, $http, $filter) {
        var vm = this;
        
        var API_URL = "http://compacct.api.hybrain.co/api/v1/";

        $http.get(API_URL + "journals/filter-by-date")
            .success(function(response) {
                $scope.journalentries = response;
                // console.log($scope.journalentries);
            });


        var init = function() {
            $http.get(API_URL + "journals/filter-by-date")
                .success(function(response) {
                    var profitLoss = response;
                    /*Account Type Classification
                    Income = 4
                    */
                    $scope.profitLossIncome = Enumerable.From(profitLoss)
                        .Where("$.acc_type_cla_id == 4") 
                        .OrderBy("$.acct_name")
                        .GroupBy("$.acct_name", null,
                            function(key, g) {
                                return {
                                    acct_name: key,
                                    entry_credit: g.Sum("$.entry_credit"),
                                    entry_debit: g.Sum("$.entry_debit")
                                }
                            })
                        .ToArray();

                    $scope.profitLossExpense = Enumerable.From(profitLoss)
                        /*Account Type
                        Expense
                        */
                        .Where("$.acct_type_id == 13")
                        .OrderBy("$.acct_name")
                        .GroupBy("$.acct_name", null,
                            function(key, g) {
                                return {
                                    acct_name: key,
                                    entry_credit: g.Sum("$.entry_credit"),
                                    entry_debit: g.Sum("$.entry_debit")
                                }
                            })
                        .ToArray();

                    $scope.profitLossOtherExpense = Enumerable.From(profitLoss)
                    /*Account Type
                    Other Expense = 15
                    Other Income = 12
                    */
                    .Where("$.acct_type_id == 15 || $.acc_type_id == 12")
                    .OrderBy("$.acct_name")
                    .GroupBy("$.acct_name", null,
                        function(key, g) {
                            return {
                                acct_name: key,
                                entry_credit: g.Sum("$.entry_credit"),
                                entry_debit: g.Sum("$.entry_debit")
                            }
                        })
                    .ToArray();
                    

                    $scope.profitLossCostOfGoodsSold = Enumerable.From(profitLoss)
                    /*Account Type
                    Cost of Goods Sold
                    */
                    .Where("$.acct_type_id == 14")
                    .OrderBy("$.acct_name")
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
            $scope.incomeSum = 0;
            $scope.expenseSum = 0;
            $scope.costofgoodssoldSum = 0;
            $scope.otherExpenseSum = 0;

            // 1. Sum of Income
            var getTotal = function(account) {
                for (var i = 0; i < account.length; i++) {
                    var item = account[i];
                    var balance = item.entry_debit - item.entry_credit;
                    $scope.incomeSum = $scope.incomeSum + balance;
                }
            }
            getTotal($scope.profitLossIncome);
            console.log("Income Sum: " + $scope.incomeSum)

             // 2. Sum of Expense
            var getTotal = function(account) {
                for (var i = 0; i < account.length; i++) {
                    var item = account[i];
                    var balance = item.entry_debit - item.entry_credit;
                    $scope.expenseSum = $scope.expenseSum + balance;
                }
            }
            getTotal($scope.profitLossExpense);
            console.log("Expense Sum: " + $scope.expenseSum)

             // 3. Sum of Other Expense
            var getTotal = function(account) {
                for (var i = 0; i < account.length; i++) {
                    var item = account[i];
                    var balance = item.entry_debit - item.entry_credit;
                    $scope.otherExpenseSum = $scope.otherExpenseSum + balance;
                }
            }
            getTotal($scope.profitLossOtherExpense);
            console.log("Expense Sum: " + $scope.otherExpenseSum)

            // 4. Sum of Cost of Goods Sold
            var getTotal = function(account) {
                for (var i = 0; i < account.length; i++) {
                    var item = account[i];
                    var balance = item.entry_debit - item.entry_credit;
                    $scope.costofgoodssoldSum = $scope.costofgoodssoldSum + balance;
                }
            }
            getTotal($scope.profitLossCostOfGoodsSold);
            console.log("Cost of Goods Sold Sum: " + $scope.costofgoodssoldSum)
            
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