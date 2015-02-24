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
    'ui.sortable'
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
      .otherwise({
        redirectTo: '/'
      });
  });
