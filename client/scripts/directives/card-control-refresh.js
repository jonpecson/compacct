'use strict';
/*
 * card-control-refresh - card toolbar refresh directive
 */
function cardControlRefresh($timeout) {
  return {
    restrict: 'A',
    link: function(scope, element, attrs) {
      element.bind('click', function() {
        var parent = angular.element(element).closest('.card');
        parent.addClass('card-refreshing');
        $timeout(function() {
          parent.removeClass('card-refreshing');
        }, 3000);
      });
    }
  };
}
angular.module('app').directive('cardControlRefresh', cardControlRefresh);