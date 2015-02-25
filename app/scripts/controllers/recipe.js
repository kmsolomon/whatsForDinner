'use strict';

angular.module('whatsForDinnerApp')
  .controller('RecipeCtrl', ['$scope', '$routeParams', 'Recipe', function ($scope, $routeParams, Recipe) {
    
    $scope.recipeId = parseInt($routeParams.recipeId, 10);

    $scope.recipe = Recipe.getRecipe($scope.recipeId);

  }]);