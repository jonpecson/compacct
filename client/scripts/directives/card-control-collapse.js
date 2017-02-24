'use strict';
/*
 * card-control-collapse - card toolbar collapse directive
 */
function cardControlCollapse() {
  return {
    restrict: 'A',
    link: function(scope, element, attrs) {
      element.bind('click', function() {
        var parent = angular.element(element).closest('.card');
        parent.toggleClass('card-collapsed');
      });
    }
  };
}
angular.module('app').directive('cardControlCollapse', cardControlCollapse);