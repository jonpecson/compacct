'use strict';

function c3Ctrl($scope) {
  $scope.options = [{
    label: 'Line series',
    id: 'line',
    options: {
      type: 'line',
      selection: {
        enabled: true
      },
    },
    series: [{
      name: 'Data 1',
      data: [
        [1, 30],
        [2, 200],
        [3, 100],
        [4, 400],
        [5, 150],
        [6, 250],
        [7, 50],
        [8, 100],
        [9, 250]
      ]
    }, {
      name: 'Data 2',
      data: [
        [1, 100],
        [2, 30],
        [3, 200],
        [4, 320],
        [5, 50],
        [6, 150],
        [7, 230],
        [8, 80],
        [9, 150]
      ]
    }]
  }, {
    label: 'Bar series',
    id: 'bar',
    options: {
      type: 'bar',
      selection: {
        enabled: true
      },
    },
    series: [{
      name: 'Data 1',
      data: [
        [1, 30],
        [2, 200],
        [3, 100],
        [4, 400],
        [5, 150],
        [6, 250],
        [7, 50],
        [8, 100],
        [9, 250]
      ]
    }, {
      name: 'Data 2',
      data: [
        [1, 100],
        [2, 30],
        [3, 200],
        [4, 320],
        [5, 50],
        [6, 150],
        [7, 230],
        [8, 80],
        [9, 150]
      ]
    }]
  }];
}
angular.module('app').controller('c3Ctrl', ['$scope', c3Ctrl]);