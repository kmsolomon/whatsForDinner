'use strict';

var recipeService = angular.module('recipeService', []);

recipeService.factory('Recipe', ['$http', function($http) {
  
  var recipes = [];
  var tmp = [];
  var getNewRecipes = function() {
    // Fill recipes array full of 7 recipes.
    $http.get('recipeslist.php', {
      params: {
        newlist: true
      }
    })
    .success(function(data) {
    //  recipes = data;
        data.forEach(function (recipe) {
            recipes.push(recipe);
        });
    });
  };
  var replaceEmptyRecipes = function() {
    // Fill in any empty spots in the recipes list.
    var returnedRecipes = [];
    $http.get('recipeslist.php', {
      // pass along all the ids in use so we don't get duplicates and know which days are empty (null ids)
      params: {
        mon: recipes[0].recipeId,
        tues: recipes[1].recipeId,
        wed: recipes[2].recipeId,
        thurs: recipes[3].recipeId,
        fri: recipes[4].recipeId,
        sat: recipes[5].recipeId,
        sund: recipes[6].recipeId
      }
    })
    .success(function(data) {
       returnedRecipes = data;
       console.log(returnedRecipes);
       // Then put returnedRecipes in the proper spots
    });
  };
  var getRecipesList = function() {
    // Return the current list of recipes 
    // if(recipes.length === 0){
      // $http.get('/app/recipeslist.php', {
        // params: {
          // newlist: true
        // }
      // })
      // .success(function(data) {
        // console.log(data);
        // data.forEach(function (recipe) {
            // recipes.push(recipe);
        // });
      // });
    // }
    
    return recipes;
  };
  
  var modifyRecipe = function(recipe, changes) {
    // change the values of the recipe to the changes, used for setting to empty, leftovers, or takeout
    recipe.name = changes.name;
    recipe.recipeId = changes.recipeId;
    recipe.type = changes.type;
    recipe.ingredients = changes.ingredients;
    recipe.steps = changes.steps;
  };
  
  var replaceRecipe = function(recipe) {
    // get a different recipe to replace the passed in recipe
    var newrecipe = null;
    $http.get('recipeslist.php', {
      // pass along all the ids in use so we don't get duplicates
      params: {
        mon: recipes[0].recipeId,
        tues: recipes[1].recipeId,
        wed: recipes[2].recipeId,
        thurs: recipes[3].recipeId,
        fri: recipes[4].recipeId,
        sat: recipes[5].recipeId,
        sund: recipes[6].recipeId,
        replacethis: recipe.recipeId // only need want one new recipe sent back, ignore blank spaces if they are there
      }
    })
    .success(function(data) {
      // BROKEN
      data.forEach(function (recipe) {
        tmp.push(recipe);
      });
      return data;
    });     
  };
  
  var getRecipe = function(recipeId) {
    // return the details for one specified recipe 
    for(var i = 0; i < recipes.length; i++){
      if(recipeId === recipes[i].recipeId){
        return recipes[i];
      }
    }      
  };
  
  var getAllIngredients = function() {
    // return all ingredients for recipes in the list. should not have duplicates.
    var ingredients = [];
    for(var i = 0; i < recipes.length; i++){
      var recipeIngredients = recipes[i].ingredients;
      for(var j = 0; j < recipeIngredients.length; j++){
        if(ingredients.indexOf(recipeIngredients[j].name) < 0 ){
          ingredients.push(recipeIngredients[j].name);
        }
      }
      
    }
    
    return ingredients;
      
  };
  
  getNewRecipes();
  
   return {
      getNewRecipes: getNewRecipes,
      replaceEmptyRecipes: replaceEmptyRecipes,
      getRecipesList: getRecipesList,
      modifyRecipe: modifyRecipe,
      replaceRecipe: replaceRecipe,
      getRecipe: getRecipe,
      getAllIngredients: getAllIngredients,
      tmp: tmp
    };
   }]);
