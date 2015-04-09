'use strict';

angular.module('whatsForDinnerApp')
  .controller('ShoppingListCtrl', ['$scope', '$routeParams', 'Recipe', function ($scope, $routeParams, Recipe) {
    
    $scope.ingredients = {};
    
    if($routeParams.mon){
      var ids = {
        mon: $routeParams.mon,
        tues: $routeParams.tues,
        wed: $routeParams.wed,
        thurs: $routeParams.thurs,
        fri: $routeParams.fri,
        sat: $routeParams.sat,
        sun: $routeParams.sun
        
      };
      Recipe.searchAllIngredientsFor(ids)
      .success(function(data){
        $scope.ingredients = data;
      })
      .error(function(data, status){
        console.log(status);
      });
    } else {
      $scope.ingredients = Recipe.getAllIngredients();
    }
    
    
    
  }]);