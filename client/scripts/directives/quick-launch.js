'use strict';
/*
 * searchRipple - quick launch panel directive
 */
function searchRipple($timeout) {
  return {
    restrict: 'EA',
    link: function(scope, element, attrs) {
      var ql = angular.element('.header');
      element.on('click', function(e) {
        e.preventDefault();
        ql.addClass('overflow-hidden');
        var $div = $('.search-effect');
        if (!ql.hasClass('search-open')) {
          var btnRadius = $div.width() / 2,
            left = $(this).offset().left + btnRadius,
            top = $(this).offset().top + btnRadius - $(window).scrollTop();
          var maxDistHor = (left > $(window).width() / 2) ? left : ($(window).width() - left),
            maxDistVert = (top > $(window).height() / 2) ? top : ($(window).height() - top);
          var scale = Math.ceil(Math.sqrt(Math.pow(maxDistHor, 2) + Math.pow(maxDistVert, 2)) / btnRadius);
          $div.css({
            'top': top + 'px',
            'left': left + 'px',
          });
          $div.velocity({
            scale: scale,
            backgroundColor: '#ffffff',
            backgroundColorAlpha: 1
          }, 150, function() {
            ql.removeClass('overflow-hidden').addClass('search-open');
          });
        } else if (ql.hasClass('search-open')) {
          $div.velocity({
            scale: 1,
            backgroundColor: '#ffffff',
            backgroundColorAlpha: 0,
          }, 150, function() {
            ql.removeClass('overflow-hidden').removeClass('search-open');
          });
        }
      });
    }
  };
}
angular.module('app').directive('searchRipple', searchRipple);