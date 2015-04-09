'use strict';

angular.module('whatsForDinnerApp')
  .controller('MenuCtrl', ['$scope', '$rootScope', '$window', '$location', 'Recipe' ,function ($scope, $rootScope, $window, $location, Recipe) {
    $scope.days = [
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
    'Sunday'
    ];
    
    $rootScope.params = '';
    $scope.menu = Recipe.getRecipesList();
    
    $scope.viewRecipe = function(recipe){
      if(recipe.type === 'recipe') {
        var path = '/viewrecipe/' + recipe.recipeId;
        $location.path(path);
      }
    };
    
    $scope.url = '';
    
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
      Recipe.replaceEmptyRecipes();
    };
    
    $scope.newMenu = function() {
      Recipe.getNewRecipes();
    };
    
    $scope.sortableOptions = {
      helper: 'clone'
    };
    
    $scope.generateShareUrl = function() {
      var dayAbrev = ['mon', 'tues', 'wed', 'thurs', 'fri', 'sat', 'sun'];
      var url = document.URL + 'viewmenu?';
      for(var i=0; i < 7; i++){
        if(i > 0){
          url += '&';
        }
        url += dayAbrev[i] + '=';
        var day = $scope.menu[i];
        url += day.recipeId;
      }
      $scope.url = url;
    };
    
    $scope.openStaticMenuTab = function() {
      $window.open($scope.url, '_blank');
    };
  }]);