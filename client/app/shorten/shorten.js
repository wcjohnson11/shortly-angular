angular.module('shortly.shorten', [])

.controller('ShortenController', function ($scope, $location, Links) {
  // Your code here
  $scope.link = {};
  $scope.loading = false;
  $scope.addLink = function(){
    $scope.loading = true;
    Links.addLink($scope.link)
    .then(function(data){
      console.log("sh: ", data);
      $scope.loading = false;
      // $scope.link = data.url;
      //$location.path('/links');
    })
    .catch(function(error){
      throw error;
    });
  };
});
