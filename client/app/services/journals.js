(function() {

    /*
     * attaching  controller function to the  module 
     */
    angular
        .module("app")
        .factory('Journals', function($http) {
            var factory = {};

            function getPreviousMonth(yourDate) {
                return new Date(yourDate.getFullYear(), yourDate.getMonth() - 1, 1);
            }

            factory.create = function() {


                return $http.post('/journals/' + filter, { type: 'getSource', ID: 'TP001' });
            };

            factory.getAll = function() {
                // var d = new Date();
                // var previousDate = getPreviousMonth(d);

                var filter = "filter-by-date";
                return $http.get('http://compacct.api.hybrain.co/api/v1/journals/' + filter);
            }

            return factory;
        })
})();