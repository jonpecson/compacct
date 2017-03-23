(function() {

    /*
     * attaching  controller function to the  module 
     */
    angular
        .module("app")
        .factory('JournalEntries', function($http, $httpParamSerializer) {
            var factory = {};
            var url = 'http://compacct.api.hybrain.co/api/v1/journal-entries/';

            factory.create = function(payload) {
                console.log('From journal entries service: ' + JSON.stringify(payload));

                var data = $.param({
                    journal_id: payload.journal_id,
                    journal_entries: payload.journal_entries
                })

                var config = {
                    transformRequest: angular.identity,
                    transformResponse: angular.identity,
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'
                    }
                }
                return $http.post(url + 'create', data, config)
            };

            factory.getAll = function() {
                return $http.get(url);
            }

            return factory;
        })
})();