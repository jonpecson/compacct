'use strict';

function productsCtrl($scope, COLORS, ngCart) {
  ngCart.setTaxRate(7.5);
  ngCart.setShipping(2.99);
  var shops = $scope.shops = [];
  $scope.addShop = function(val) {
    var grid = 'tile-small',
      newWidth = 500,
      newHeight = 300,
      multiple = val % 5;
    if (multiple === 0) {
      grid = 'tile-big';
      newHeight = 500;
    }
    shops.push({
      gridClass: grid,
      price: Math.floor(Math.random() * 100) + 1,
      name: ['baseball', 'jacket', 'shirt', 'tank', 'crenweck'][shops.length % 5],
      text: ['B & W', 'Grey', 'Black', 'Green', 'Black'][shops.length % 5]
    });
  };
  for (var i = 0; i < 28; i++) {
    $scope.addShop(i);
  }
  var slides = $scope.slides = [];
  $scope.addSlide = function() {
    var ran = Math.floor(Math.random() * 5) + 1;
    slides.push({
      image: 'images/face' + ran + '.jpg',
      rating: ran,
      text: ['Catherine', 'Pamela', 'Sean', 'Jose', 'Brian'][slides.length % 5] + ' ' + ['loves this place', 'hates this place', 'is indifferent about this place', 'enjoys this place', 'dislikes this place'][slides.length % 5],
      place: ['The bridge', 'Millers cafe', 'Cafe Nash', 'Shangrila', 'China Gardens'][slides.length % 5]
    });
  };
  for (var v = 0; v < 15; v++) {
    $scope.addSlide();
  }
  var hotels = $scope.hotels = [];
  $scope.addHotel = function(val) {
    hotels.push({
      color: ['bg-primary', 'bg-danger', 'bg-info', 'bg-success', 'bg-warning'][hotels.length % 5],
      rating: Math.floor(Math.random() * 5) + 1,
      title: ['The bridge', 'Millers cafe', 'Cafe Nash', 'Shangrila', 'China Gardens'][hotels.length % 5]
    });
  };
  for (var j = 0; j < 15; j++) {
    $scope.addHotel(j);
  }
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
angular.module('app').controller('productsCtrl', ['$scope', 'COLORS', 'ngCart', productsCtrl]);