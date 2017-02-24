'use strict';

function FlotCtrl($scope, $interval, COLORS) {
  var visits = [
    [0, $scope.getRandomArbitrary()],
    [1, $scope.getRandomArbitrary()],
    [2, $scope.getRandomArbitrary()],
    [3, $scope.getRandomArbitrary()],
    [4, $scope.getRandomArbitrary()],
    [5, $scope.getRandomArbitrary()],
    [6, $scope.getRandomArbitrary()],
    [7, $scope.getRandomArbitrary()],
    [8, $scope.getRandomArbitrary()]
  ];
  var visitors = [
    [0, $scope.getRandomArbitrary()],
    [1, $scope.getRandomArbitrary()],
    [2, $scope.getRandomArbitrary()],
    [3, $scope.getRandomArbitrary()],
    [4, $scope.getRandomArbitrary()],
    [5, $scope.getRandomArbitrary()],
    [6, $scope.getRandomArbitrary()],
    [7, $scope.getRandomArbitrary()],
    [8, $scope.getRandomArbitrary()]
  ];
  var data = [],
    totalPoints = 300,
    updateInterval = 300;
  $scope.getRandomData = function() {
    if (data.length > 0) {
      data = data.slice(1);
    }
    // Do a random walk
    while (data.length < totalPoints) {
      var prev = data.length > 0 ? data[data.length - 1] : 50,
        y = prev + Math.random() * 10 - 5;
      if (y < 0) {
        y = 0;
      } else if (y > 100) {
        y = 100;
      }
      data.push(y);
    }
    // Zip the generated y values with the x values
    var res = [];
    for (var i = 0; i < data.length; ++i) {
      res.push([i, data[i]]);
    }
    return res;
  };
  $scope.options = [{
    colsize: 'col-sm-12',
    label: 'Line series',
    data: [{
      data: visits,
      color: COLORS.primary
    }, {
      data: visitors,
      color: COLORS.info
    }],
    options: {
      series: {
        lines: {
          show: true,
          lineWidth: 0,
        },
        splines: {
          show: true,
          tension: 0.5,
          lineWidth: 1,
          fill: 0.2,
        },
        shadowSize: 0
      },
      grid: {
        color: COLORS.border,
        borderWidth: 1,
        hoverable: true,
      }
    }
  }, {
    colsize: 'col-sm-6',
    label: 'Grouped bar series',
    data: [{
      data: [
        [1391761856000, 80],
        [1394181056000, 40],
        [1396859456000, 20],
        [1399451456000, 20],
        [1402129856000, 50]
      ],
      bars: {
        show: true,
        barWidth: 7 * 24 * 60 * 60 * 1000,
        fill: true,
        lineWidth: 0,
        order: 1,
        fillColor: COLORS.info
      }
    }, {
      data: [
        [1391761856000, 50],
        [1394181056000, 30],
        [1396859456000, 10],
        [1399451456000, 70],
        [1402129856000, 30]
      ],
      bars: {
        show: true,
        barWidth: 7 * 24 * 60 * 60 * 1000,
        fill: true,
        lineWidth: 0,
        order: 2,
        fillColor: COLORS.danger
      }
    }, {
      data: [
        [1391761856000, 30],
        [1394181056000, 60],
        [1396859456000, 40],
        [1399451456000, 40],
        [1402129856000, 40]
      ],
      bars: {
        show: true,
        barWidth: 7 * 24 * 60 * 60 * 1000,
        fill: true,
        lineWidth: 0,
        order: 3,
        fillColor: COLORS.success
      }
    }],
    options: {
      grid: {
        hoverable: false,
        clickable: false,
        labelMargin: 8,
        color: COLORS.border,
        borderWidth: 0,
      },
      xaxis: {
        mode: 'time',
        timeformat: '%b',
        tickSize: [1, 'month'],
        monthNames: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
        tickLength: 0,
        axisLabel: 'Month',
        axisLabelUseCanvas: true,
        axisLabelFontSizePixels: 12,
        axisLabelFontFamily: 'Roboto',
        axisLabelPadding: 5
      }
    }
  }, {
    colsize: 'col-sm-6',
    label: 'Pie series',
    data: [{
      label: 'IE',
      data: 15,
      color: COLORS.danger
    }, {
      label: 'Safari',
      data: 14,
      color: COLORS.info
    }, {
      label: 'Chrome',
      data: 34,
      color: COLORS.warning
    }, {
      label: 'Opera',
      data: 13,
      color: COLORS.bodyBg
    }, {
      label: 'Firefox',
      data: 24,
      color: COLORS.dark
    }],
    options: {
      series: {
        pie: {
          show: true,
          innerRadius: 0.5,
          stroke: {
            width: 0
          },
          label: {
            show: false,
          }
        }
      },
      legend: {
        show: true
      },
    }
  }, {
    colsize: 'col-sm-12',
    label: 'Realtime series',
    data: [$scope.getRandomData()],
    options: {
      colors: [COLORS.dark],
      lines: {
        lineWidth: 1,
      },
      grid: {
        color: COLORS.border,
        borderWidth: 0,
        hoverable: true
      },
      yaxis: {
        min: 0,
        max: 100
      }
    }
  }];
  $interval(function() {
    $scope.options[3].data = [$scope.getRandomData()];
  }.bind(this), updateInterval);
}
angular.module('app').controller('FlotCtrl', ['$scope', '$interval', 'COLORS', FlotCtrl]);