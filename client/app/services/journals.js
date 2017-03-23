(function() {

    /*
     * attaching  controller function to the  module 
     */
    angular
        .module("app")
        .factory('Journals', function($http, $filter) {
            var factory = {};

            // function getPreviousMonth(yourDate) {
            //     return new Date(yourDate.getFullYear(), yourDate.getMonth() - 1, 1);
            // }

            factory.create = function(journal) {
                console.log('From service: ' + JSON.stringify(journal));
                var url = 'http://compacct.api.hybrain.co/api/v1/journals/create';
                var format = "'yyyy-MM-dd HH:mm:ss"
                var formattedDate = $filter('date')(journal.date, format)

                var data = $.param({
                    currency_id: 1,
                    journ_date: formattedDate,
                    journ_reference_number: journal.reference,
                    journ_notes: journal.notes
                })

                var config = {
                    transformRequest: angular.identity,
                    transformResponse: angular.identity,
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'
                    }
                }

                console.log("Serialized data: " + data);
                return $http.post(url, data, config)
            };

            factory.getAll = function() {
                return $http.get('http://compacct.api.hybrain.co/api/v1/journals/');
            }

            return factory;
        })
})();