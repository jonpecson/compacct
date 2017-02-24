'use strict';

function n3Ctrl($scope, COLORS, n3cutils) {
  $scope.max = 30;
  var linData = n3cutils.linearData($scope.max, 4);
  var timData = n3cutils.timedData($scope.max, 4);
  var logData = n3cutils.logarithmicData($scope.max, 4);
  var posData = n3cutils.positiveData($scope.max, 4);
  $scope.examples = [{
    label: 'Linear series',
    dataType: 'linear',
    data: linData,
    options: {
      series: [{
        y: 'val_0',
        label: 'A line sinusoid',
        color: COLORS.primary
      }, {
        y: 'val_0',
        label: 'A column sinusoid',
        color: COLORS.info,
        type: 'column'
      }, {
        y: 'val_0',
        label: 'An area sinusoid',
        color: COLORS.warning,
        type: 'area'
      }]
    }
  }, {
    label: 'Log series',
    dataType: 'logarithmic',
    data: logData,
    options: {
      axes: {
        x: {
          key: 'x',
          labelFunction: function(v) {
            return 'Na';
          }
        },
        y: {
          type: 'log'
        }
      },
      series: [{
        y: 'val_0',
        label: 'Batmaaan',
        color: COLORS.info
      }]
    }
  }, {
    label: 'Time series',
    dataType: 'timed',
    data: timData,
    options: {
      axes: {
        x: {
          type: 'date'
        }
      },
      series: [{
        y: 'val_0',
        label: 'A time series',
        color: COLORS.warning
      }],
      tooltip: {
        mode: 'scrubber',
        formatter: function(x, y, series) {
          return moment(x).fromNow() + ' : ' + y;
        }
      }
    }
  }, {
    label: 'Area series',
    dataType: 'linear',
    data: linData,
    options: {
      series: [{
        y: 'val_0',
        label: 'A colorful area series',
        color: COLORS.info,
        type: 'area'
      }]
    }
  }, {
    label: 'Column series',
    dataType: 'linear',
    data: linData,
    options: {
      series: [{
        y: 'val_0',
        label: 'The best column series ever',
        color: COLORS.warning,
        type: 'column'
      }]
    }
  }, {
    label: 'Two axes',
    dataType: 'linear',
    data: linData,
    options: {
      series: [{
        y: 'val_0',
        label: 'On the left !',
        color: COLORS.primary
      }, {
        y: 'val_1',
        axis: 'y2',
        label: 'On the right !',
        color: COLORS.info
      }]
    }
  }, {
    label: 'Interpolation',
    dataType: 'linear',
    data: linData,
    options: {
      lineMode: 'bundle',
      series: [{
        y: 'val_0',
        label: 'Ping',
        color: COLORS.warning
      }, {
        y: 'val_2',
        label: 'Pong',
        axis: 'y2',
        color: COLORS.success
      }]
    }
  }, {
    label: 'Several series',
    dataType: 'linear',
    data: linData,
    options: {
      lineMode: 'cardinal',
      series: [{
        y: 'val_0',
        label: 'This',
        type: 'area',
        color: COLORS.danger
      }, {
        y: 'val_1',
        label: 'Is',
        type: 'column',
        color: COLORS.primary
      }, {
        y: 'val_2',
        label: 'Awesome',
        color: COLORS.warning
      }]
    }
  }, {
    label: 'Striped areas',
    dataType: 'linear',
    data: linData,
    options: {
      lineMode: 'cardinal',
      series: [{
        y: 'val_0',
        label: 'Stripes',
        type: 'area',
        striped: true,
        color: COLORS.danger
      }, {
        y: 'val_1',
        label: 'Are',
        type: 'area',
        striped: true,
        color: COLORS.primary
      }, {
        y: 'val_2',
        label: 'Sweet',
        type: 'area',
        striped: true,
        color: COLORS.dark
      }]
    }
  }, {
    label: 'Stacked column series',
    dataType: 'positive',
    data: posData,
    options: {
      stacks: [{
        axis: 'y',
        series: ['id_0', 'id_1', 'id_2']
      }],
      lineMode: 'cardinal',
      series: [{
        id: 'id_0',
        y: 'val_0',
        label: 'Foo',
        type: 'column',
        color: COLORS.danger
      }, {
        id: 'id_1',
        y: 'val_1',
        label: 'Bar',
        type: 'column',
        color: COLORS.primary
      }, {
        id: 'id_2',
        y: 'val_2',
        label: 'Baz',
        type: 'column',
        color: COLORS.info
      }, ]
    }
  }, {
    label: 'Stacked areas series',
    dataType: 'positive',
    data: posData,
    options: {
      stacks: [{
        axis: 'y',
        series: ['id_0', 'id_1', 'id_2']
      }],
      lineMode: 'cardinal',
      series: [{
        id: 'id_0',
        y: 'val_0',
        label: 'Foo',
        type: 'area',
        color: COLORS.danger
      }, {
        id: 'id_1',
        y: 'val_1',
        label: 'Bar',
        type: 'area',
        color: COLORS.primary
      }, {
        id: 'id_2',
        y: 'val_2',
        label: 'Baz',
        type: 'area',
        color: COLORS.info
      }, ]
    }
  }];
  $scope.examples.forEach(function(e) {
    e.pristineOptions = angular.copy(e.options);
  });
}
angular.module('app').controller('n3Ctrl', ['$scope', 'COLORS', 'n3cutils', n3Ctrl]);