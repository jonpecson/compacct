'use strict';

function NotificationsCtrl($scope) {
  var i = -1;
  var msgs = ['Your request has succeded!', 'Are you the six fingered man?', 'Inconceivable!', 'I do not think that means what you think it means.', 'Have fun storming the castle!'];
  $scope.getMessage = function() {
    i++;
    if (i === msgs.length) {
      i = 0;
    }
    return msgs[i];
  };
  $scope.showNoty = function() {
    var msg = angular.element('#message').val(),
      type = angular.element('#messenger-type').val().toLowerCase(),
      position = angular.element('#position').val();
    if (!msg) {
      msg = $scope.getMessage();
    }
    if (!type) {
      type = 'error';
    }
    noty({
      theme: 'app-noty',
      text: msg,
      type: type,
      timeout: 3000,
      layout: position,
      closeWith: ['button', 'click'],
      animation: {
        open: 'in',
        close: 'out'
      },
    });
  };
}
angular.module('app').controller('NotificationsCtrl', ['$scope', NotificationsCtrl]);