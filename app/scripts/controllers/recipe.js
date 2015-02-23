'use strict';

angular.module('whatsForDinnerApp')
  .controller('RecipeCtrl', function ($scope, $routeParams) {
    
    $scope.recipeId = $routeParams.recipeId;
    
    
    // below here is mock data that we will eventually be fetching
    $scope.name = 'My Recipe';
    
    $scope.ingredients = [ {
        name: 'chicken noodle soup',
        amount: '1 can'
      },
      {
        name: 'can opener',
        amount: '1'
      }
    
    ];
    
    $scope.directions = [
        'Grab can opener.',
        'Open can of soup.',
        'Eat soup.'    
    ];
    
  });