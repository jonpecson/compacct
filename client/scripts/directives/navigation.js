'use strict';
/*
 * side-navigation - Main sidebar navigation directive
 */
function sideNavigation($rootScope, $window, $timeout) {
  return {
    //scope: {},
    link: function(scope, element) {
      element.find('a').on('click', function(e) {
        var $this = angular.element(this),
          links = $this.parents('li'),
          parentLink = $this.closest('li'),
          otherLinks = angular.element('.sidebar-panel nav li').not(links),
          subMenu = $this.next();
        if (!subMenu.hasClass('sub-menu')) {
          scope.$apply('checkOffscreen()');
          return;
        }
        if (angular.element('.app').hasClass('layout-small-menu') && parentLink.parent().hasClass('nav') && $window.outerWidth > 768) {
          return;
        }
        otherLinks.removeClass('open');
        if (subMenu.is('ul') && (subMenu.height() === 0)) {
          parentLink.addClass('open');
        } else if (subMenu.is('ul') && (subMenu.height() !== 0)) {
          parentLink.removeClass('open');
        }
        if (subMenu.is('ul')) {
          return false;
        }
        e.stopPropagation();
        return true;
      });
      element.find('> li > .sub-menu').each(function() {
        if (angular.element(this).find('ul.sub-menu').length > 0) {
          angular.element(this).addClass('multi-level');
        }
      });
      element.find('.sub-menu').each(function() {
        angular.element(this).parent('li').addClass('menu-accordion');
      });
    },
    controller: function($scope) {
      $scope.checkOffscreen = function() {
        if ($scope.app.layout.isOffscreenOpen) {
          angular.element('.app').removeClass('offscreen move-left move-right');
          $scope.app.layout.isOffscreenOpen = false;
        }
      };

      $scope.winWidth = function() {
        return window.innerWidth;
      };

      var psTarg = angular.element('.no-touch .sidebar-panel');

      $scope.initScrollbars = function() {
        psTarg.perfectScrollbar({
          wheelPropagation: true,
          suppressScrollX: true
        });
      };

      $scope.destroyScrollbars = function() {
        if (psTarg.hasClass('ps-container')) {
          psTarg.perfectScrollbar('destroy').removeClass('ps-active-y');
        }
      };

      $scope.updateScrollbars = function() {
        if (psTarg.hasClass('ps-container') && !angular.element('.app').hasClass('layout-small-menu')) {
          psTarg.perfectScrollbar('update');
        }
      };

      $scope.$watch($scope.winWidth, function (newValue, oldValue) {
        if (psTarg.hasClass('ps-container') && angular.element('.app').hasClass('layout-small-menu')) {
          $scope.destroyScrollbars();
        }
        else if (!psTarg.hasClass('ps-container') && !angular.element('.app').hasClass('layout-small-menu')) {
          $scope.initScrollbars();
        }
        else {
           $scope.updateScrollbars();
        }
        return;
      }, true);

      $scope.$watch('app.layout', function () {
        if ($scope.app.layout.isSmallSidebar || $scope.app.layout.isStaticSidebar || $scope.app.layout.isBoxed && psTarg.hasClass('ps-container')) {
          $scope.destroyScrollbars();
        }
        else {
          if (psTarg.hasClass('ps-container')) {
            $scope.updateScrollbars();
          }
          else if (!$scope.app.layout.isSmallSidebar && !angular.element('.app').hasClass('layout-small-menu')) {
            $scope.initScrollbars();
          }
        }
      }, true);

      $rootScope.$on('$viewContentLoaded', function(event){
        $timeout(function() { 
          if (angular.element('.sidebar-panel').hasClass('ps-container') && angular.element('.app').hasClass('layout-small-menu')) {
            $scope.destroyScrollbars();
          }
          else if (!angular.element('.sidebar-panel').hasClass('ps-container') && !angular.element('.app').hasClass('layout-small-menu')) {
            $scope.initScrollbars();
          }
        },0);
      });

      window.onresize = function() {
        $scope.$apply();
      };
    }
  };
}
angular.module('app').directive('sideNavigation', sideNavigation);