'use strict';

function contactsCtrl($scope, contacts) {
  $scope.alphabet = 'abcdefghijklmnopqrstuvwxyz'.split('');
  $scope.activeLetter = '';
  $scope.activateLetter = function(letter) {
    $scope.activeLetter = letter;
  };
  $scope.users = [{
    name: 'Andrew'
  }, {
    name: 'Mike'
  }, {
    name: 'Tony'
  }, {
    name: 'Jim'
  }, {
    name: 'Leo'
  }];
  $scope.tags = [{
    name: 'Personal',
    color: 'primary',
  }, {
    name: 'Clients',
    color: 'success'
  }, {
    name: 'Family',
    color: 'warning'
  }, {
    name: 'Friends',
    color: 'danger'
  }, {
    name: 'Archives',
    color: 'default'
  }];
  $scope.currentTag = null;
  $scope.setCurrentTag = function(tag) {
    $scope.currentTag = tag;
  };
  $scope.isCurrentTag = function(tag) {
    return $scope.currentTag !== null && tag.name === $scope.currentTag.name;
  };
  $scope.currentIndex = null;
  $scope.setCurrentIndex = function(id) {
    $scope.currentIndex = id;
  };
  $scope.isCurrentIndex = function(id) {
    return $scope.currentIndex !== null && id === $scope.currentIndex;
  };
  /* jshint validthis: true */
  this.contacts = [];
  contacts.getAll().then(angular.bind(this, function then() {
    $scope.contacts = contacts.contacts;
  }));
  $scope.currentContact = null;
  $scope.setCurrentContact = function(id) {
    $scope.currentContact = $scope.contacts[id];
  };
  //  $scope.setCurrentContact(1);
}
angular.module('app').filter('startsWithLetter', function() {
  return function(items, letter) {
    var filtered = [];
    var letterMatch = new RegExp(letter, 'i');
    if (items) {
      for (var i = 0; i < items.length; i++) {
        var item = items[i];
        if (letterMatch.test(item.name.substring(0, 1))) {
          filtered.push(item);
        }
      }
    }
    return filtered;
  };
});

angular.module('app').controller('contactsCtrl', ['$scope', 'contacts', contactsCtrl]);