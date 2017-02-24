'use strict';

function widgetsController($scope, COLORS) {
  $scope.todos = [{
    text: 'Learn AngularJS'
  }, {
    text: 'Buy groceries'
  }, {
    text: 'Update server files'
  }];
  $scope.pieDataset = [{
    label: 'IE',
    data: 34,
    color: COLORS.primary
  }, {
    label: 'Safari',
    data: 14,
    color: COLORS.info
  }, {
    label: 'Chrome',
    data: 15,
    color: COLORS.warning
  }];
  $scope.pieOptions = {
    series: {
      pie: {
        show: true,
        //innerRadius: 0.6,
        stroke: {
          width: 0
        },
        label: {
          show: false,
        }
      }
    },
    legend: {
      show: false
    }
  };
}
angular.module('app').controller('widgetsController', ['$scope', 'COLORS', widgetsController]);