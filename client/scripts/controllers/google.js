'use strict';

function mapCtrl($scope, COLORS) {
  var isInternetExplorer11 = navigator.userAgent.toLowerCase().indexOf('trident') > -1;
  var markerUrl = (isInternetExplorer11) ? 'images/cd-icon-location.png' : 'images/cd-icon-location.svg';
  $scope.myMarkers = [];
  $scope.mapOptions = {
    scrollwheel: false,
    center: new google.maps.LatLng(35.784, -78.670),
    zoom: 6,
    mapTypeId: google.maps.MapTypeId.ROADMAP
  };
  $scope.addMarker = function($event, $params) {
    $scope.myMarkers.push(new google.maps.Marker({
      map: $scope.myMap,
      position: $params[0].latLng,
      icon: markerUrl
    }));
  };
  $scope.setZoomMessage = function(zoom) {
    $scope.zoomMessage = 'You just zoomed to ' + zoom + '!';
    console.log(zoom, 'zoomed');
  };
  $scope.openMarkerInfo = function(marker) {
    $scope.currentMarker = marker;
    $scope.currentMarkerLat = marker.getPosition().lat();
    $scope.currentMarkerLng = marker.getPosition().lng();
    $scope.myInfoWindow.open($scope.myMap, marker);
  };
  $scope.setMarkerPosition = function(marker, lat, lng) {
    marker.setPosition(new google.maps.LatLng(lat, lng));
  };
}
angular.module('app').controller('mapCtrl', ['$scope', 'COLORS', mapCtrl]);