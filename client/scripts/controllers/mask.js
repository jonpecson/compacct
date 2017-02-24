'use strict';

function maskCtrl($scope) {
  $scope.maskOpt = {
    autoclear: false
  };
}
angular.module('app').controller('maskCtrl', ['$scope', maskCtrl]);