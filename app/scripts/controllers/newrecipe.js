'use strict';

angular.module('whatsForDinnerApp')
  .controller('NewRecipeCtrl', ['$scope', '$http', 'Recipe', function ($scope, $http, Recipe) {
    
  $scope.ingredients = Recipe.getIngredientsList();
    
  $scope.recipe = {
    name: '',
    steps: [],
    ingredients: []
  };
  
  $scope.newIngredient = {
    name: '',
    amount: ''
  };
  
  $scope.newStep ='';
  
  $scope.removeIngredient = function(index) {
     $scope.recipe.ingredients.splice(index, 1);
  };
  
  $scope.addIngredient = function() {
    if($scope.newIngredient.name !== ''){
      var ingredient ={
        name: $scope.newIngredient.name,
        amount: $scope.newIngredient.amount
        
      };
      $scope.recipe.ingredients.push(ingredient);
      $scope.newIngredient.name = '';
      $scope.newIngredient.amount = '';
    
    }
  };
  
  $scope.addStep = function() {
    if($scope.newStep !== ''){
      var step = $scope.newStep;
      $scope.recipe.steps.push(step);
    }
  };
  
  $scope.removeStep = function(index) {
    $scope.recipe.steps.splice(index, 1);
  };
  
  

  }]);