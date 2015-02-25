'use strict';

angular.module('whatsForDinnerApp')
  .controller('ShoppingListCtrl', ['$scope', 'Recipe', function ($scope, Recipe) {
    
    $scope.ingredients = Recipe.getAllIngredients();
    
  }]);