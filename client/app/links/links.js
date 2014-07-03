angular.module('shortly.links', [])

.controller('LinksController', function ($scope, Links) {
  // Your code here
  // console.log(Links);
  $scope.data = {};
  $scope.getLinks = function() {
    Links.getLinks()
    .then(function(links){
      $scope.data.links = links;
    })
    .catch(function(error){
      throw error;
    });
  };
  $scope.getLinks();
});
