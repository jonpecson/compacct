'use strict';

function contacts($q, $http) {
  var output = {};
  var contactUrl = 'data/contacts.json';
  output.getAll = function() {
    output.contacts = [];
    var deferred = $q.defer();
    return $http.get(contactUrl).success(function(data) {
      output.contacts = data;
      deferred.resolve(data);
    }).error(function(data) {
      deferred.reject(data);
    });
    //return deferred.promise;
  };
  output.getById = function(contactId) {
    if (contactId) {
      output.contact = [];
      var deferred = $q.defer();
      return $http.get('data/contact/' + contactId + '.json').success(function(data) {
        output.contact = data;
        deferred.resolve(data);
      }).error(function(data) {
        deferred.reject(data);
      });
      //return deferred.promise;
    }
  };
  return output;
}
angular.module('app').factory('contacts', ['$q', '$http', contacts]);