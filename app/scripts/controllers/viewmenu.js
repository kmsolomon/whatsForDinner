'use strict';

angular.module('whatsForDinnerApp')
  .controller('ViewMenuCtrl', ['$scope', '$window', '$location', '$routeParams', 'Recipe' ,function ($scope, $window, $location, $routeParams, Recipe) {
    $scope.days = [
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
    'Sunday'
    ];
    
    var ids = {
      mon: $routeParams.mon,
      tues: $routeParams.tues,
      wed: $routeParams.wed,
      thurs: $routeParams.thurs,
      fri: $routeParams.fri,
      sat: $routeParams.sat,
      sun: $routeParams.sun
      
    };
    
    $scope.menu = [];
    
    $scope.fetchRecipes = function(){
      Recipe.getRecipes(ids)
      .success(function(data){
        for(var i = 0; i < data.length; i++){
          if(data[i].type !== 'recipe'){
            var tmp = {
              name: '',
              recipeId: data[i].recipeId,
              type: data[i].type,
              ingredients: [],
              steps: []
            };
            
            if(tmp.type === 'leftovers'){
              tmp.name = 'Leftovers';
            } else if (tmp.type === 'takeout'){
              tmp.name = 'Takeout';
            } else {
              tmp.name = '';
            }
            $scope.menu.push(tmp);
          } else {
            $scope.menu.push(data[i]); 
          }
        }
        
      })
      .error(function(data, status){
        console.log(status);
      });
    };
   
   $scope.fetchRecipes();
    
    $scope.viewRecipe = function(recipe){
      if(recipe.type === 'recipe') {
        $location.url('/viewrecipe/' + recipe.recipeId);
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
        if(day.type === 'recipe'){
          url += day.recipeId;
        } else {
          url += day.type;
        }
      }
      $scope.url = url;
    };
    
    $scope.openStaticMenuTab = function() {
      $window.open($scope.url, '_blank');
    };
  }]);