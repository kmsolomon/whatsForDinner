'use strict';

angular.module('whatsForDinnerApp')
  .controller('RecipeCtrl', ['$scope', '$routeParams', '$sce' , 'Recipe', function ($scope, $routeParams, $sce, Recipe) {
    
    $scope.recipeId = parseInt($routeParams.recipeId, 10);

    $scope.recipe = Recipe.getRecipe($scope.recipeId);
    if($scope.recipe === null){
      Recipe.lookupRecipe($scope.recipeId)
        .success(function(data){
          $scope.recipe = data[0];
        });
    }
    
    $scope.html = $sce.trustAsHtml('&deg;');

  }]);