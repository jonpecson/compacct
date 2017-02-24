'use strict';

function dashboardCtrl($scope, $interval, COLORS) {
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
  $scope.lineDataset = [{
    data: visits,
    color: COLORS.success
  }];
  $scope.lineOptions = {
    series: {
      lines: {
        show: true,
        lineWidth: 0,
        fill: false
      },
      points: {
        show: true,
        radius: 3,
        lineWidth: 1,
        fillColor: COLORS.success
      },
      splines: {
        show: true,
        //tension: 0.5,
        lineWidth: 1,
        //fill: 0.2,
      },
      shadowSize: 0
    },
    grid: {
      borderWidth: 0,
      hoverable: true,
    },
    xaxis: {
      show: false
    },
    yaxis: {
      show: false
    }
  };
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
    },
  };
  $scope.barDataset = [{
    data: visits,
    bars: {
      show: true,
      barWidth: 0.05,
      align: 'center',
      fill: true,
      lineWidth: 0,
      fillColor: '#fff'
    }
  }];
  $scope.barOptions = {
    grid: {
      borderWidth: 0,
      aboveData: true,
    },
    yaxis: {
      color: 'rgba(255,255,255,0.1)',
    },
    xaxis: {
      mode: 'categories',
      tickLength: 0,
      axisLabelUseCanvas: true,
      axisLabelFontSizePixels: 12,
      axisLabelFontFamily: 'Roboto',
      axisLabelPadding: 5,
      reserveSpace: true
    }
  };
  var seriesData = [
    [],
    [],
    []
  ];
  var visits2 = [
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
  $scope.dashboardDataset = [{
      data: visits2,
      color: '#fff'
    }
  ];
  $scope.dashboardOptions = {
    series: {
      lines: {
        show: true,
        lineWidth: 0,
      },
      splines: {
        show: true,
        lineWidth: 1,
      }
    },
    grid: {
      borderWidth: 1,
      color: 'rgba(255,255,255,0.2)',
    },
    yaxis: {
      color: 'rgba(255,255,255,0.1)',
    },
    xaxis: {
      mode: 'categories'
    }
  };
  $scope.barODataset = [{
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
      fillColor: COLORS.primary
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
      fillColor: COLORS.success
    }
  }];
  $scope.barOOptions = {
    grid: {
      hoverable: false,
      clickable: false,
      labelMargin: 8,
      color: COLORS.border,
      borderWidth: 0,
    },
    xaxis: {
      show: false
    },
    stack: true
  };

  $scope.myInterval = 5000;
  $scope.active = 0;
  var slides = $scope.slides = [];
  var currIndex = 0;

  $scope.addSlide = function() {
    var newWidth = 600 + slides.length + 1;
    slides.push({
      image: 'http://lorempixel.com/' + newWidth + '/400',
      id: currIndex++
    });
  };
  for (var b = 0; b < 4; b++) {
    $scope.addSlide();
  }
}
angular.module('app').controller('dashboardCtrl', ['$scope', '$interval', 'COLORS', dashboardCtrl]);