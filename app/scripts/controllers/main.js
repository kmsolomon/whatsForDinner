'use strict';

angular.module('whatsForDinnerApp')
  .controller('MainCtrl', ['$scope', '$location', '$rootScope', function ($scope, $location, $rootScope) {
        
    $scope.viewMenu = function(){
      var path = $location.path();
      
      if(path.indexOf('viewmenu') > -1 || path === '/'){
        // already on menu page
        
      } else {
        if($rootScope.params !== ''){
          var back = '/viewmenu' + $rootScope.params;
          $location.url(back);
        } else {
          $location.url('/');
        }
      }
      
    };
    
    $scope.viewShoppingList = function(){
      var path = $location.path();
      
      if(path.indexOf('shoppinglist') > -1 ){
        // already on shopping list page
                  
      } else {
        if($rootScope.params !== ''){ 
          $location.url('/shoppinglist' + $rootScope.params);
        } else {
          $location.url('/shoppinglist');
        }
      }
    };
    

  }]);
