'use strict';

function tableCtrl($scope) {
  $scope.dataTableOpt = {
    'ajax': 'data/datatables-arrays.json'
  };
}
angular.module('app').controller('tableCtrl', ['$scope', tableCtrl]);