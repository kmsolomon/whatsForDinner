<?php
  require_once('connect.php');
  session_start();
  
  
  $getNewList = false;
  $allIds = array();
  $amount = 0;
  // Get params from url
  
  function getIngredients($id, $mysqli) {
    
    $stmt = $mysqli->prepare("SELECT I.name, RI.amount FROM ingredient I, recipe_ingredient RI WHERE RI.recipe_id=? AND RI.ingredient_id = I.id");
    $stmt->bind_param("i", $id);
    if ($stmt->execute() == false) {
        echo 'Query failed: ' . $mysqli->error;
    }
    $stmt->store_result();
    $stmt->bind_result($name, $amount);
    $ingredients = array(); 
    while ($stmt->fetch()) {
      $ingredient = array();
      $ingredient['name'] = $name;
      $ingredient['amount'] = $amount;
      $ingredients[] = $ingredient;
    }
    
    $stmt->close();
    
    return $ingredients;
    
  }
  
  function getSteps($id, $mysqli) {
    
    $stmt = $mysqli->prepare("SELECT R.name, RS.directions FROM recipe R, recipe_step RS WHERE RS.recipe_id=? AND RS.recipe_id=R.id ORDER BY RS.step");
    $stmt->bind_param("i", $id);
    if ($stmt->execute() == false) {
        echo 'Query failed: ' . $mysqli->error;
    }
    $stmt->store_result();
    $stmt->bind_result($name, $step);
    $steps = array();
    while ($stmt->fetch()) {
      $steps[] = $step;
    }
    
    $stmt->close();
    
    return $steps;
  }
  
  function getRecipe($id, $mysqli) {
    
    $stmt = $mysqli->prepare("SELECT name FROM recipe WHERE id=?");
    $stmt->bind_param("i", $id);
    if ($stmt->execute() == false) {
        echo 'Query failed: ' . $mysqli->error;
    }
    $stmt->store_result();
    $stmt->bind_result($name);
    $stmt->fetch();
    $ingredients = getIngredients($id, $mysqli);
    $steps = getSteps($id, $mysqli);
    $recipe = array("name" => $name, "recipeId" => $id, "type" => 'recipe', "ingredients" => $ingredients, "steps" => $steps);
    
    $stmt->close();
    
    return $recipe;
  }
  
  function getAllRecipeIds($mysqli){
      
    $stmt = $mysqli->prepare("SELECT id FROM recipe");
    if ($stmt->execute() == false) {
        echo 'Query failed: ' . $mysqli->error;
    }
    $stmt->store_result();
    $stmt->bind_result($id);
    $allIds = array();
    while ($stmt->fetch()) {
      $allIds[] = $id;
    }
    
    $stmt->close();
    
    return $allIds;
    
  }
  
  $mysqli = connectToDB();
  $allRecipeIds = getAllRecipeIds($mysqli);
  $idsInUse = array();
  $resultRecipes = array();
  
  if(isset($_GET['mon'])){
    $idsInUse[0] = $_GET['mon'];
  }
  if(isset($_GET['tues'])){
    $idsInUse[1] = $_GET['tues'];
  }
  if(isset($_GET['wed'])){
    $idsInUse[2] = $_GET['wed'];
  }
  if(isset($_GET['thurs'])){
    $idsInUse[3] = $_GET['thurs'];
  }
  if(isset($_GET['fri'])){
    $idsInUse[4] = $_GET['fri'];
  }
  if(isset($_GET['sat'])){
    $idsInUse[5] = $_GET['sat'];
  }
  if(isset($_GET['sund'])){
    $idsInUse[6] = $_GET['sund'];
  }
  
  if(count($allRecipeIds) < 7){
    print "ERROR: Need at least 7 recipes in DB for this to work";
    $mysqli->close();
    exit();
  }
  
  
  if (isset($_GET['newlist'])) {
    // Get 7 recipes, return them  
    
    for($i = 0; $i < 7; $i++) {
      $randnum = rand(1, count($allRecipeIds));
      while(in_array($randnum, $idsInUse)){
        $randnum = rand(1, count($allRecipeIds));
      }
      $resultRecipes[] = getRecipe($randnum, $mysqli);
      $idsInUse[] = $randnum;
    }
    
      
  } else if(isset($_GET['replacethis'])) {
    // we just need to return 1 recipe
    $randnum = rand(1, count($allRecipeIds));
    while(in_array($randnum, $idsInUse)){
      $randnum = rand(1, count($allRecipeIds));
    }
    $returnedRecipe = getRecipe($randnum, $mysqli);
    $returnedRecipe['replaceId'] = $_GET['replacethis'];
    $resultRecipes[] = $returnedRecipe;
    $idsInUse[] = $randnum;

    
  } else if(isset($_GET['fetchrecipes'])) {
    // we need to get the specified recipes
    if($idsInUse){
      foreach ($idsInUse as $day) {
        if($day == 'T' || $day == 't'){
          $resultRecipes[] = array("recipeId" => $day, "type" => 'takeout');
        } else if ($day == 'L' || $day == 'l') {
          $resultRecipes[] = array("recipeId" => $day, "type" => 'leftovers');
        } else if ($day == 'null') {
          $resultRecipes[] = array("recipeId" => $day, "type" => 'empty');
        } else {
          $resultRecipes[] = getRecipe($day, $mysqli);
        }
      }
    } else {
       $resultRecipes[] = getRecipe($_GET['recipe'], $mysqli);
    }
    
  } else if(isset($_GET['fetchingredients'])) {
    // get all the recipes
    if($idsInUse){
      foreach ($idsInUse as $day) {
        if($day == 'T' || $day == 't'){
          $resultRecipes[] = array("recipeId" => $day, "type" => 'takeout');
        } else if ($day == 'L' || $day == 'l') {
          $resultRecipes[] = array("recipeId" => $day, "type" => 'leftovers');
        } else if ($day == 'null') {
          $resultRecipes[] = array("recipeId" => $day, "type" => 'empty');
        } else {
          $resultRecipes[] = getRecipe($day, $mysqli);
        }
      }
    } else {
       $resultRecipes[] = getRecipe($_GET['recipe'], $mysqli);
    }
    
    // now return the ingredients only, without duplicates
    $ingredientsList = array();
    
    foreach($resultRecipes as $recipe){
      if($recipe['ingredients']){
        foreach($recipe['ingredients'] as $in){
          if(!in_array($in['name'], $ingredientsList)){
            $ingredientsList[] = $in['name'];
          }
        }
        
      }
    }
    // result recipes is what we're sending back to the call
    $resultRecipes = $ingredientsList;
  
  } else {
    $replacements = array();
    // replace x number of empty recipes, trying not to pick ones already in use
    for($i = 0; $i < 7; $i++){
      if($idsInUse[$i] == null){
        
        $randnum = rand(1, count($allRecipeIds));
        while(in_array($randnum, $idsInUse)){
          $randnum = rand(1, count($allRecipeIds));
        }
        $resultRecipes[] = getRecipe($randnum, $mysqli);
        $replacements[] = $randnum;
        
      }
    }

    
  }
  $mysqli->close();
  header('Content-Type: application/json');
  echo json_encode($resultRecipes);
  
  

?>