'use strict';

angular.module('whatsForDinnerApp')
  .controller('NewRecipeCtrl', ['$scope', '$http', '$modal', 'Recipe', function ($scope, $http, $modal, Recipe) {
    
  $scope.ingredients = Recipe.getIngredientsList();
    
  $scope.recipe = {
    name: '',
    steps: [],
    ingredients: []
  };
  
  $scope.newIngredient = {
    name: '',
    amount: ''
  };
  
  $scope.newStep = '';
  
  $scope.status = '';
  
  $scope.checkId = function(name){
    for(var i = 0; i < $scope.ingredients.length; i++){
      if($scope.ingredients[i].name === name){
        return $scope.ingredients[i].id;
      }
    }
    return '';
  };
  
  $scope.removeIngredient = function(index) {
     $scope.recipe.ingredients.splice(index, 1);
  };
  
  $scope.addIngredient = function() {
    if($scope.newIngredient.name !== ''){
      var ingredient ={
        name: $scope.newIngredient.name,
        amount: $scope.newIngredient.amount,
        id: $scope.checkId($scope.newIngredient.name)
        
      };
      $scope.recipe.ingredients.push(ingredient);
      $scope.newIngredient.name = '';
      $scope.newIngredient.amount = '';
    
    }
  };
  
  $scope.addStep = function() {
    if($scope.newStep !== ''){
      var step = $scope.newStep;
      $scope.recipe.steps.push(step);
      $scope.newStep = '';
    }
  };
  
  $scope.removeStep = function(index) {
    $scope.recipe.steps.splice(index, 1);
  };
  
  $scope.submit = function() {
    
    if($scope.recipe.name){
        Recipe.addRecipe($scope.recipe)
      .success(function(){
        $scope.status = 'Recipe added';
        $scope.addRecipe.$setPristine();
        $scope.ingredients = Recipe.getIngredientsList();
      
        $scope.recipe = {
          name: '',
          steps: [],
          ingredients: []
        };
        
        $scope.newIngredient = {
          name: '',
          amount: ''
        };
        
        $scope.newStep ='';
        
        
      })
      .error(function(data, status){
        $scope.status = 'There was an error adding the recipe';
        console.log(status);
      });
      
    } else {
      $scope.status = 'Please give your recipe a name.';
    }
    
  };
  
  $scope.animationsEnabled = true;

  $scope.open = function () {

    var modalInstance = $modal.open({
      animation: $scope.animationsEnabled,
      templateUrl: 'confirmSubmitModal.html',
      controller: 'ModalInstanceCtrl'
    });
    
    modalInstance.result.then(function() {
      $scope.submit(); 
    });
  };

  $scope.toggleAnimation = function () {
    $scope.animationsEnabled = !$scope.animationsEnabled;
  };
  

  }]);
  
angular.module('whatsForDinnerApp').controller('ModalInstanceCtrl', function ($scope, $modalInstance) {
  $scope.ok = function () {
    $modalInstance.close();
  };

  $scope.cancel = function () {
    $modalInstance.dismiss('cancel');
  };
});