'use strict';

angular.module('whatsForDinnerApp')
  .controller('ShoppingListCtrl', function ($scope) {

    // below here is mock data that we will eventually be fetching
    
    $scope.ingredients = [ {
        name: 'chicken noodle soup',
        amount: '1 can'
      },
      {
        name: 'can opener',
        amount: '1'
      }
    
    ];
    
  });