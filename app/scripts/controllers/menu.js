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
        recipeId: 1
      },
      {
        name: 'Item 2',
        recipeId: 2
      },
      {
        name: 'Item 3',
        recipeId: 3
      },
      {
        name: 'Item 4',
        recipeId: 4
      },
      {
        name: 'Item 5',
        recipeId: 5
      },
      {
        name: 'Item 6',
        recipeId: 6
      },
      {
        name: 'Item 7',
        recipeId: 7
      },
    ];
    
    $scope.viewRecipe = function(recipe){
      var path = '/viewrecipe/' + recipe.recipeId;
      $location.path(path);
    };
    
    $scope.sortableOptions = {
      helper: 'clone'
    };
  });