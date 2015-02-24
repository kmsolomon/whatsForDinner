'use strict';

angular.module('whatsForDinnerApp')
  .controller('MenuCtrl', function ($scope, $location) {
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
    $scope.menu = [
      {
        name: 'Item 1',
        recipeId: 1,
        type: 'recipe'
      },
      {
        name: 'Item 2',
        recipeId: 2,
        type: 'recipe'
      },
      {
        name: 'Item 3',
        recipeId: 3,
        type: 'recipe'
      },
      {
        name: 'Item 4',
        recipeId: 4,
        type: 'recipe'
      },
      {
        name: 'Item 5',
        recipeId: 5,
        type: 'recipe'
      },
      {
        name: 'Item 6',
        recipeId: 6,
        type: 'recipe'
      },
      {
        name: 'Item 7',
        recipeId: 7,
        type: 'recipe'
      },
    ];
    
    $scope.viewRecipe = function(recipe){
      if(recipe.recipeId !== null) {
        var path = '/viewrecipe/' + recipe.recipeId;
        $location.path(path);
      }
    };
    
    $scope.deleteItem = function(recipe){
      console.log('should remove ' + recipe.name);
      for (var i = 0; i < $scope.menu.length; i++) {
        if(recipe.recipeId === $scope.menu[i].recipeId){
          $scope.menu[i].name = '';
          $scope.menu[i].recipeId = null;
          $scope.menu[i].type = 'empty';
        }
      }
    };
    
    $scope.changeItem = function(recipe, changeTo){
      for (var i = 0; i < $scope.menu.length; i++) {
        if(recipe.recipeId === $scope.menu[i].recipeId){
          $scope.menu[i].name = changeTo;
          $scope.menu[i].recipeId = null;
          $scope.menu[i].type = (changeTo === 'Takeout') ? 'takeout' : 'leftovers';
        }
      }
    };
    
    $scope.sortableOptions = {
      helper: 'clone'
    };
  });