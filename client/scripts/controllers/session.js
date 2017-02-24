'use strict';

function sessionCtrl($scope, $state) {
  $scope.signin = function() {
    $state.go('user.signin');
  };
  $scope.submit = function() {
    $state.go('app.dashboard');
  };
  
  $scope.myInterval = 5000;
  $scope.active = 0;
  var slides = $scope.slides = [];
  var currIndex = 0;

  $scope.addSlide = function() {
    var newWidth = 1200 + slides.length + 1;
    slides.push({
      image: 'http://lorempixel.com/' + newWidth + '/800',
      id: currIndex++
    });
  };
  for (var i = 0; i < 4; i++) {
    $scope.addSlide();
  }
}
angular.module('app').controller('sessionCtrl', ['$scope', '$state', sessionCtrl]);