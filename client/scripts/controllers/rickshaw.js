'use strict';

function rickshawCtrl($scope, COLORS) {
  $scope.options = [{
    label: 'Time on the X-Axis',
    options: {
      renderer: 'area'
    },
    features: {
      xAxis: true,
      hover: {
        xFormatter: function(x) {
          return new Date(x * 1000).toString();
        },
        yFormatter: function(y) {
          return Math.round(y);
        }
      }
    },
    series: [{
      color: COLORS.primary,
      name: 'Series1',
      data: [{
        x: -1893456000,
        y: 92228531
      }, {
        x: -1577923200,
        y: 106021568
      }, {
        x: -1262304000,
        y: 123202660
      }, {
        x: -946771200,
        y: 132165129
      }, {
        x: -631152000,
        y: 151325798
      }, {
        x: -315619200,
        y: 179323175
      }, {
        x: 0,
        y: 203211926
      }, {
        x: 315532800,
        y: 226545805
      }, {
        x: 631152000,
        y: 248709873
      }, {
        x: 946684800,
        y: 281421906
      }, {
        x: 1262304000,
        y: 308745538
      }]
    }]
  }, {
    label: 'X-Axis and Y-Axis',
    options: {
      renderer: 'area'
    },
    features: {
      xAxis: true,
      yAxis: {
        tickFormat: 'formatKMBT'
      },
      hover: {
        xFormatter: function(x) {
          return new Date(x * 1000).toString();
        },
        yFormatter: function(y) {
          return Math.round(y);
        }
      }
    },
    series: [{
      color: COLORS.danger,
      name: 'Series2',
      data: [{
        x: -1893456000,
        y: 92228531
      }, {
        x: -1577923200,
        y: 106021568
      }, {
        x: -1262304000,
        y: 123202660
      }, {
        x: -946771200,
        y: 132165129
      }, {
        x: -631152000,
        y: 151325798
      }, {
        x: -315619200,
        y: 179323175
      }, {
        x: 0,
        y: 203211926
      }, {
        x: 315532800,
        y: 226545805
      }, {
        x: 631152000,
        y: 248709873
      }, {
        x: 946684800,
        y: 281421906
      }, {
        x: 1262304000,
        y: 308745538
      }]
    }]
  }];
  $scope.$watch($scope.getWidth, function() {
    $scope.options.forEach(function(e) {
      e.options = {
        renderer: 'area'
      };
    });
  });
}
angular.module('app').controller('rickshawCtrl', ['$scope', 'COLORS', rickshawCtrl]);