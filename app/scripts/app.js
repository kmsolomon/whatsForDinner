'use strict';

/**
 * @ngdoc overview
 * @name whatsForDinnerApp
 * @description
 * # whatsForDinnerApp
 *
 * Main module of the application.
 */
angular
  .module('whatsForDinnerApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'ui.sortable',
    'recipeService',
    'ui.bootstrap'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MenuCtrl'
      })
      .when('/viewrecipe/:recipeId', {
        templateUrl: 'views/recipe.html',
        controller: 'RecipeCtrl'
      })
      .when('/shoppinglist', {
        templateUrl: 'views/shoppinglist.html',
        controller: 'ShoppingListCtrl'
      })
      .when('/newrecipe', {
        templateUrl: 'views/newrecipe.html',
        controller: 'NewRecipeCtrl'
      })
      .when('/viewmenu', {
        templateUrl: 'views/viewmenu.html',
        controller: 'ViewMenuCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
