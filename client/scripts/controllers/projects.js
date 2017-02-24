'use strict';

function galleryCtrl($scope) {
  var projects = $scope.projects = [];
  $scope.addProject = function() {
    var newWidth = 400 + projects.length + 1;
    var newHeight = Math.floor(Math.random() * (550 - 200 + 1)) + 200;
    projects.push({
      image: 'http://lorempixel.com/' + newWidth + '/' + newHeight,
      text: ['Spartan', 'Morpheus', 'Vista', 'Terran', 'Utopia'][projects.length % 5]
    });
  };
  for (var i = 0; i < 28; i++) {
    $scope.addProject();
  }
}
angular.module('app').controller('galleryCtrl', ['$scope', galleryCtrl]);