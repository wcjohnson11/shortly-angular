angular.module('shortly.shorten', [])

.controller('ShortenController', function ($scope, $location, Links) {
  // Your code here
  $scope.link = {};
  $scope.loading = false;
  $scope.addLink = function(){
    $scope.loading = true;
    Links.addLink()
    .then(function(link){
      $scope.loading = false;
      $scope.link = link;
    })
    .catch(function(error){
      throw error;
    });
  };
});
