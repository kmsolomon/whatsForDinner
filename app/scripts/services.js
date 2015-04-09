'use strict';

var recipeService = angular.module('recipeService', []);

recipeService.factory('Recipe', ['$http', function($http) {
  
  var recipes = [];
  var ingredientsList = [];
  var getNewRecipes = function() {
    // Fill recipes array full of 7 recipes.
    $http.get('recipeslist.php', {
      params: {
        newlist: true
      }
    })
    .success(function(data) {
        for(var i = 0; i < 7; i++){
          recipes[i] = data[i];
        }
    });
  };
  var replaceEmptyRecipes = function() {
    // Fill in any empty spots in the recipes list.

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
       // Then fill in the empty spots
       for(var i = 0; i < 7; i++){
         if(recipes[i].type === 'empty'){
           recipes[i] = data.pop();
         }
       }
    });
  };
  var getRecipesList = function() {    
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
  
  var replaceRecipe = function(recipe, index) {
    // get a different recipe to replace the passed in recipe

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
      // replace with the new recipe
      recipes[index] = data[0];
    });     
  };
  
  var getRecipe = function(recipeId) {
    // return the details for one specified recipe from the recipe list
    for(var i = 0; i < recipes.length; i++){
      if(recipeId === recipes[i].recipeId){
        return recipes[i];
      }
    }     
    return null;
  };
  
  var lookupRecipe = function(recipeId) {
    // lookup and return one specified recipe from the db
    return $http.get('recipeslist.php', {
      // pass along all the ids in use so we don't get duplicates
      params: {
        recipe: recipeId,
        fetchrecipes: true
        
      }
    });
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
  
  var getAllIngredientsInDB = function() {
    $http.get('fetchIngredients.php', {
      params: {
        }
      })
      .success(function(data) {
        for(var i = 0; i < data.length; i++){
          ingredientsList[i] = data[i];
        }
  
    });
  };
  
  
  var getIngredientsList = function() {
    return ingredientsList;
  };
  
  var addRecipe = function(recipe) {
    return $http.post('addrecipe.php', recipe);
  };
  
  var getRecipes = function(ids) {
    return $http.get('recipeslist.php', {
      // pass along all the ids in use so we don't get duplicates
      params: {
        mon: ids.mon,
        tues: ids.tues,
        wed: ids.wed,
        thurs: ids.thurs,
        fri: ids.fri,
        sat: ids.sat,
        sund: ids.sun,
        fetchrecipes: true 
      }
    });   
  };
  
  var searchAllIngredientsFor = function(ids) {
    return $http.get('recipeslist.php', {
     
      params: {
        mon: ids.mon,
        tues: ids.tues,
        wed: ids.wed,
        thurs: ids.thurs,
        fri: ids.fri,
        sat: ids.sat,
        sund: ids.sun,
        fetchingredients: true 
      }
    });  
    
  };
  
  
  getNewRecipes();
  getAllIngredientsInDB();
  
   return {
      getNewRecipes: getNewRecipes,
      replaceEmptyRecipes: replaceEmptyRecipes,
      getRecipesList: getRecipesList,
      modifyRecipe: modifyRecipe,
      replaceRecipe: replaceRecipe,
      getRecipe: getRecipe,
      lookupRecipe: lookupRecipe,
      getRecipes: getRecipes,
      getAllIngredients: getAllIngredients,
      getAllIngredientsInDB: getAllIngredientsInDB,
      getIngredientsList: getIngredientsList,
      addRecipe: addRecipe,
      searchAllIngredientsFor: searchAllIngredientsFor
    };
   }]);
