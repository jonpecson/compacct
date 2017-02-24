'use strict';
/*
 * card-control-remove - card toolbar remove directive
 */
function cardControlRemove() {
  return {
    restrict: 'A',
    link: function(scope, element, attrs) {
      element.bind('click', function() {
        var parent = angular.element(element).closest('.card');
        parent.addClass('animated fadeOut');
        parent.bind('animationend webkitAnimationEnd oAnimationEnd MSAnimationEnd', function() {
          parent.remove();
        });
      });
    }
  };
}
angular.module('app').directive('cardControlRemove', cardControlRemove);