'use strict';

function uploadCtrl($scope, $http, $timeout, $compile, Upload) {
  $scope.uploadPic = function(file) {
    file.upload = Upload.upload({
      url: '#',
      data: {
        file: file,
        username: $scope.username
      },
    });
    file.upload.then(function(response) {
      $timeout(function() {
        file.result = response.data;
      });
    }, function(response) {
      if (response.status > 0) {
        $scope.errorMsg = response.status + ': ' + response.data;
      }
    }, function(evt) {
      // Math.min is to fix IE which reports 200% sometimes
      file.progress = Math.min(100, parseInt(100.0 * evt.loaded / evt.total));
    });
  };
  $scope.$watch('files', function() {
    $scope.upload($scope.files);
  });
  $scope.$watch('file', function() {
    if ($scope.file !== null) {
      $scope.files = [$scope.file];
    }
  });
  $scope.log = '';
  /*jshint -W083 */
  $scope.upload = function(files) {
    if (files && files.length) {
      for (var i = 0; i < files.length; i++) {
        var file = files[i];
        if (!file.$error) {
          Upload.upload({
            url: 'https://angular-file-upload-cors-srv.appspot.com/upload',
            data: {
              username: $scope.username,
              file: file
            }
          }).progress(function(evt) {
            var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
            $scope.log = 'progress: ' + progressPercentage + '% ' + evt.config.data.file.name + '\n' + $scope.log;
          }).success(function(data, status, headers, config) {
            $timeout(function() {
              $scope.log = 'file: ' + config.data.file.name + ', Response: ' + JSON.stringify(data) + '\n' + $scope.log;
            });
          });
        }
      }
    }
  };
}
angular.module('app').controller('uploadCtrl', ['$scope', '$http', '$timeout', '$compile', 'Upload', uploadCtrl]);