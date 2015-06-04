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
  
  $scope.newStep = '';
  
  $scope.status = '';
  
  $scope.checkId = function(name){
    for(var i = 0; i < $scope.ingredients.length; i++){
      if($scope.ingredients[i].name === name){
        return $scope.ingredients[i].id;
      }
    }
    return '';
  };
  
  $scope.removeIngredient = function(index) {
     $scope.recipe.ingredients.splice(index, 1);
  };
  
  $scope.addIngredient = function() {
    if($scope.newIngredient.name !== ''){
      var ingredient ={
        name: $scope.newIngredient.name,
        amount: $scope.newIngredient.amount,
        id: $scope.checkId($scope.newIngredient.name)
        
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
  
  $scope.submit = function() {
    Recipe.addRecipe($scope.recipe)
    .success(function(){
      $scope.status = 'Recipe added';
      $scope.addRecipe.$setPristine();
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
      
      
    })
    .error(function(data, status){
      $scope.status = 'There was an error adding the recipe';
      console.log(status);
    });
    
  };
  

  }]);