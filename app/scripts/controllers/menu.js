'use strict';

angular.module('whatsForDinnerApp')
  .controller('MenuCtrl', ['$scope', '$location', 'Recipe' ,function ($scope, $location, Recipe) {
    $scope.days = [
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
    'Sunday'
    ];
    
    // this will be retrieved from the DB later, using mock data for now
    $scope.menu = Recipe.getRecipesList();
    
    $scope.viewRecipe = function(recipe){
      if(recipe.type === 'recipe') {
        var path = '/viewrecipe/' + recipe.recipeId;
        $location.path(path);
      }
    };
    
    $scope.deleteItem = function(recipe){
      var changes = {
        name: '',
        recipeId: null,
        type: 'empty',
        ingredients: [],
        steps: []
      };
      Recipe.modifyRecipe(recipe, changes);
    };
    
    $scope.changeItem = function(recipe, changeTo){
      var changes = {
        name: changeTo,
        recipeId: (changeTo === 'Takeout') ? 'T' : 'L',
        type: (changeTo === 'Takeout') ? 'takeout' : 'leftovers',
        ingredients: [],
        steps: []
      };
      Recipe.modifyRecipe(recipe, changes);
    };
    
    $scope.replaceRecipe = function(recipe, index) {
      Recipe.replaceRecipe(recipe, index);
    };
    
    $scope.fillBlanks = function() {
      
    };
    
    $scope.newMenu = function() {
      Recipe.getNewRecipes();
    };
    
    $scope.sortableOptions = {
      helper: 'clone'
    };
  }]);