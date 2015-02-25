'use strict';

var recipeService = angular.module('recipeService', ['ngResource']);

recipeService.factory('Recipe', ['$resource', function($resource) {
  
  // mock data for now
   var recipes = [
      {
        name: 'Item 1',
        recipeId: 1,
        type: 'recipe',
        ingredients: [
          {
            name: 'chicken noodle soup',
            amount: '1 can'
          },
          {
            name: 'can opener',
            amount: '1'
          }
        ],
        steps: [
          'Grab can opener.',
          'Open can of soup.',
          'Eat soup.'    
        ]
      },
      {
        name: 'Item 2',
        recipeId: 2,
        type: 'recipe',
        ingredients: [
          {
            name: 'tomato soup',
            amount: '1 can'
          },
          {
            name: 'can opener',
            amount: '1'
          }
        ]
      },
      {
        name: 'Item 3',
        recipeId: 3,
        type: 'recipe',
        ingredients: [
          {
            name: 'vegetable soup',
            amount: '1 can'
          },
          {
            name: 'can opener',
            amount: '1'
          }
        ]
      },
      {
        name: 'Item 4',
        recipeId: 4,
        type: 'recipe',
        ingredients: [
          {
            name: 'chicken noodle soup',
            amount: '1 can'
          },
          {
            name: 'can opener',
            amount: '1'
          }
        ]
      },
      {
        name: 'Item 5',
        recipeId: 5,
        type: 'recipe',
        ingredients: [
          {
            name: 'tomato soup',
            amount: '1 can'
          },
          {
            name: 'can opener',
            amount: '1'
          }
        ]
      },
      {
        name: 'Item 6',
        recipeId: 6,
        type: 'recipe',
        ingredients: [
          {
            name: 'chicken noodle soup',
            amount: '1 can'
          },
          {
            name: 'can opener',
            amount: '1'
          }
        ]
      },
      {
        name: 'Item 7',
        recipeId: 7,
        type: 'recipe',
        ingredients: [
          {
            name: 'chicken noodle soup',
            amount: '1 can'
          },
          {
            name: 'can opener',
            amount: '1'
          }
        ]
      }
   
   ];
  
   return {
      getNewRecipes: function() {
         // Fill recipes array full of 7 recipes.
      },
      replaceEmptyRecipes: function() {
        // Fill in any empty spots in the recipes list.
      },
      getRecipesList: function() {
        // Return the current list of recipes 
        
        // if null, need to get a set of recipes
        
        return recipes;
      },
      modifyRecipe: function(recipe, changes) {
        // change the values of the recipe to the changes, used for setting to empty, leftovers, or takeout
        recipe.name = changes.name;
        recipe.recipeId = changes.recipeId;
        recipe.type = changes.type;
        recipe.ingredients = changes.ingredients;
        recipe.steps = changes.steps;
      },
      replaceRecipe: function(recipe) {
        // get a different recipe to replace the passed in recipe
        
      },
      getRecipe: function(recipeId) {
        // return the details for one specified recipe 
        for(var i = 0; i < recipes.length; i++){
          if(recipeId === recipes[i].recipeId){
            return recipes[i];
          }
        }
        
      },
      getAllIngredients: function() {
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
      
      }
    };
   }]);
