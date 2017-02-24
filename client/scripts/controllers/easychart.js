'use strict';

function easypiesize() {
  return {
    restrict: 'A',
    link: function(scope, element, attrs) {
      if (scope.$last) {
        angular.element('.piechart').each(function() {
          var size = angular.element(this).find('canvas').width();
          angular.element(this).css({
            'width': size,
            'height': size
          });
        });
      }
    }
  };
}

function easyChartCtrl($scope) {
  $scope.options = [{
    label: 'Bounce rate',
    percent: 86,
    data: {
      size: 180,
      lineWidth: 8,
      barColor: 'rgba(0,0,0,.1)',
      trackColor: 'rgba(0,0,0,.1)',
      lineCap: 'butt',
      easing: 'easeOutBounce',
      onStep: function(from, to, percent) {
        angular.element(this.el).find('.percent').text(Math.round(percent));
      }
    }
  }, {
    label: 'Signup rate',
    percent: 52,
    data: {
      size: 180,
      lineWidth: 8,
      barColor: 'rgba(0,0,0,.1)',
      trackColor: 'rgba(0,0,0,.1)',
      lineCap: 'butt',
      easing: 'easeOutBounce',
      onStep: function(from, to, percent) {
        angular.element(this.el).find('.percent').text(Math.round(percent));
      }
    }
  }, {
    label: 'Visitors',
    percent: 76,
    data: {
      size: 180,
      lineWidth: 15,
      barColor: 'rgba(0,0,0,.1)',
      trackColor: false,
      lineCap: 'round',
      easing: 'easeOutBounce',
      onStep: function(from, to, percent) {
        angular.element(this.el).find('.percent').text(Math.round(percent));
      }
    }
  }, {
    label: 'New visitors',
    percent: 82,
    data: {
      size: 180,
      lineWidth: 15,
      barColor: 'rgba(0,0,0,.1)',
      trackColor: 'rgba(0,0,0,.1)',
      lineCap: 'butt',
      easing: 'easeOutBounce',
      onStep: function(from, to, percent) {
        angular.element(this.el).find('.percent').text(Math.round(percent));
      }
    }
  }, {
    label: 'Server downtime rate',
    percent: 54,
    data: {
      size: 180,
      lineWidth: 8,
      barColor: 'rgba(0,0,0,.1)',
      trackColor: 'rgba(0,0,0,.1)',
      lineCap: 'round',
      easing: 'easeOutBounce',
      scaleColor: false,
      onStep: function(from, to, percent) {
        angular.element(this.el).find('.percent').text(Math.round(percent));
      }
    }
  }, {
    label: 'File purge rate',
    percent: 43,
    data: {
      size: 180,
      lineWidth: 2,
      barColor: 'rgba(0,0,0,.1)',
      trackColor: 'rgba(0,0,0,.1)',
      lineCap: 'round',
      easing: 'easeOutBounce',
      scaleColor: false,
      onStep: function(from, to, percent) {
        angular.element(this.el).find('.percent').text(Math.round(percent));
      }
    }
  }];
}
angular.module('app').directive('easypiesize', easypiesize).controller('easyChartCtrl', ['$scope', easyChartCtrl]);