'use strict';

function chartjsCtrl($scope, COLORS) {
  //Chartjs Globals
  $scope.globalOptions = {
    // String - Scale label font declaration for the scale label
    scaleFontFamily: 'Arial, "Helvetica Neue", Helvetica, sans-serif',
    // Number - Scale label font size in pixels
    scaleFontSize: 10,
    // Boolean - whether or not the chart should be responsive and resize when the browser does.
    responsive: true,
    // String - Tooltip label font declaration for the scale label
    tooltipFontFamily: 'Arial, "Helvetica Neue", Helvetica, sans-serif',
    // Number - Tooltip label font size in pixels
    tooltipFontSize: 12,
    // String - Tooltip title font declaration for the scale label
    tooltipTitleFontFamily: 'Arial, "Helvetica Neue", Helvetica, sans-serif',
    // Number - Tooltip title font size in pixels
    tooltipTitleFontSize: 13,
    // String - Tooltip title font weight style
    tooltipTitleFontStyle: '700',
    // Number - Pixel radius of the tooltip border
    tooltipCornerRadius: 0,
    tooltipFillColor: COLORS.primary
  };
  $scope.options = [{
    label: 'Bar series',
    colsize: 'col-md-12',
    type: 'Bar',
    options: {
      scaleShowGridLines: false,
      barShowStroke: false,
    },
    data: {
      labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
      datasets: [{
        fillColor: 'rgba(220,220,220,1)',
        highlightFill: 'rgba(220,220,220,1)',
        data: [$scope.getRandomArbitrary(), $scope.getRandomArbitrary(), $scope.getRandomArbitrary(), $scope.getRandomArbitrary(), $scope.getRandomArbitrary(), $scope.getRandomArbitrary(), $scope.getRandomArbitrary()]
      }, {
        fillColor: 'rgba(151,187,205,1)',
        highlightFill: 'rgba(151,187,205,1)',
        data: [$scope.getRandomArbitrary(), $scope.getRandomArbitrary(), $scope.getRandomArbitrary(), $scope.getRandomArbitrary(), $scope.getRandomArbitrary(), $scope.getRandomArbitrary(), $scope.getRandomArbitrary()]
      }]
    }
  }, {
    label: 'Line series',
    colsize: 'col-md-12',
    type: 'Line',
    options: {
      scaleShowGridLines: false,
      bezierCurve: false,
      pointDotRadius: 2,
      datasetStrokeWidth: 1,
    },
    data: {
      labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
      datasets: [{
        label: 'My First dataset',
        fillColor: 'rgba(220,220,220,0.2)',
        strokeColor: 'rgba(220,220,220,1)',
        pointColor: 'rgba(220,220,220,1)',
        pointStrokeColor: '#fff',
        pointHighlightFill: '#fff',
        pointHighlightStroke: 'rgba(220,220,220,1)',
        data: [$scope.getRandomArbitrary(), $scope.getRandomArbitrary(), $scope.getRandomArbitrary(), $scope.getRandomArbitrary(), $scope.getRandomArbitrary(), $scope.getRandomArbitrary(), $scope.getRandomArbitrary()]
      }, {
        label: 'My Second dataset',
        fillColor: 'rgba(151,187,205,0.2)',
        strokeColor: 'rgba(151,187,205,1)',
        pointColor: 'rgba(151,187,205,1)',
        pointStrokeColor: '#fff',
        pointHighlightFill: '#fff',
        pointHighlightStroke: 'rgba(151,187,205,1)',
        data: [$scope.getRandomArbitrary(), $scope.getRandomArbitrary(), $scope.getRandomArbitrary(), $scope.getRandomArbitrary(), $scope.getRandomArbitrary(), $scope.getRandomArbitrary(), $scope.getRandomArbitrary()]
      }]
    }
  }, {
    label: 'Polar series',
    colsize: 'col-sm-6',
    type: 'PolarArea',
    options: {
      segmentShowStroke: false,
      scaleBackdropColor: 'rgba(255,255,255,1)',
      scaleShowLine: false,
    },
    data: [{
      value: 80,
      color: COLORS.danger
    }, {
      value: 70,
      color: COLORS.info
    }, {
      value: 100,
      color: COLORS.warning
    }, {
      value: 40,
      color: COLORS.bodyBg
    }, {
      value: 120,
      color: COLORS.dark
    }, {
      value: 90,
      color: COLORS.primary
    }]
  }, {
    label: 'Radar series',
    colsize: 'col-sm-6',
    type: 'Radar',
    options: {
      pointDotRadius: 0,
      pointLabelFontFamily: '"Roboto"',
      pointLabelFontSize: 10
    },
    data: {
      labels: ['Eating', 'Drinking', 'Sleeping', 'Designing', 'Coding', 'Partying', 'Running'],
      datasets: [{
        fillColor: 'rgba(220,220,220,1)',
        strokeColor: 'rgba(220,220,220,1)',
        pointColor: 'rgba(220,220,220,1)',
        pointStrokeColor: '#fff',
        data: [65, 59, 90, 81, 56, 55, 40]
      }, {
        fillColor: 'rgba(151,187,205,1)',
        strokeColor: 'rgba(151,187,205,1)',
        pointColor: 'rgba(151,187,205,1)',
        pointStrokeColor: '#fff',
        data: [28, 48, 40, 19, 96, 27, 100]
      }]
    }
  }, {
    label: 'Doughnut series',
    colsize: 'col-sm-6',
    type: 'Doughnut',
    options: {
      percentageInnerCutout: 60,
    },
    data: [{
      value: 280,
      color: COLORS.danger,
      highlight: LightenDarkenColor(COLORS.danger, 20),
      label: 'Danger'
    }, {
      value: 70,
      color: COLORS.success,
      highlight: LightenDarkenColor(COLORS.success, 20),
      label: 'Success'
    }, {
      value: 100,
      color: COLORS.warning,
      highlight: LightenDarkenColor(COLORS.warning, 20),
      label: 'Warning'
    }, {
      value: 40,
      color: COLORS.bodyBg,
      highlight: LightenDarkenColor(COLORS.bodyBg, 20),
      label: 'Body'
    }, {
      value: 120,
      color: COLORS.dark,
      highlight: LightenDarkenColor(COLORS.dark, 20),
      label: 'Dark'
    }]
  }, {
    label: 'Pie series',
    colsize: 'col-sm-6',
    type: 'Pie',
    options: {
      segmentShowStroke: false
    },
    data: [{
      value: 300,
      color: COLORS.danger,
      highlight: LightenDarkenColor(COLORS.danger, 20),
      label: 'Danger'
    }, {
      value: 50,
      color: COLORS.success,
      highlight: LightenDarkenColor(COLORS.success, 20),
      label: 'Success'
    }, {
      value: 100,
      color: COLORS.warning,
      highlight: LightenDarkenColor(COLORS.warning, 20),
      label: 'Warning'
    }, {
      value: 40,
      color: COLORS.bodyBg,
      highlight: LightenDarkenColor(COLORS.bodyBg, 20),
      label: 'Body'
    }, {
      value: 120,
      color: COLORS.dark,
      highlight: LightenDarkenColor(COLORS.dark, 20),
      label: 'Dark'
    }]
  }];
  $scope.options.forEach(function(e) {
    angular.extend(e.options, $scope.globalOptions);
  });
}
angular.module('app').controller('chartjsCtrl', ['$scope', 'COLORS', chartjsCtrl]);