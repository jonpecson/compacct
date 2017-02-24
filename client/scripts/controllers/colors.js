'use strict';

function colorsCtrl($scope) {
  $scope.brands = ['primary', 'default', 'warning', 'success', 'info', 'danger', 'dark'];
  $scope.material = ['red', 'pink', 'purple', 'deeppurple', 'indigo', 'blue', 'lightblue', 'cyan', 'teal', 'green', 'lightgreen', 'lime', 'yellow', 'amber', 'orange', 'deeporange', 'brown', 'grey', 'bluegrey'];
}
angular.module('app').controller('colorsCtrl', ['$scope', colorsCtrl]);