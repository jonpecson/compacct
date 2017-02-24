'use strict';
/*
 * ripple - ripple effect directive
 */
function ripple() {
  return {
    restrict: 'EAC',
    link: function(scope, element, attrs) {
      element.on('click', function(e) {
        e.preventDefault();
        var $div = $('<div/>'),
          btnOffset = $(this).offset(),
          xPos = e.pageX - btnOffset.left,
          yPos = e.pageY - btnOffset.top;
        $div.addClass('ripple-effect');
        var $ripple = $('.ripple-effect');
        $ripple.css('height', $(this).height());
        $ripple.css('width', $(this).height());
        $div.css({
          top: yPos - $ripple.height() / 2,
          left: xPos - $ripple.width() / 2,
          background: $(this).data('ripple-color') //? $(this).data('ripple-color') : '#222'
        }).appendTo($(this));
        window.setTimeout(function() {
          $div.remove();
        }, 1500);
      });
    }
  };
}
angular.module('app').directive('ripple', ripple);