<?php
  require_once('connect.php');
  session_start();
  
  $mysqli = connectToDB();

  $postdata = file_get_contents("php://input");
  $request = json_decode($postdata, true);
  
  $name = $request['name'];
  $ingredients = $request['ingredients'];
  $steps = $request['steps'];
  
  $newIngredientIds = array();
  
  // Check if the id already exists for a recipe
  function idExists($id, $mysqli){
    $stmt = $mysqli->prepare("SELECT name FROM recipe WHERE id=?"); 
    $stmt->bind_param("i", $id);
    
    if ($stmt->execute() == false){
      echo 'Query failed: ' . $mysqli->error;
    }
    $stmt->store_result();
    $stmt->bind_result($name);
    $rows = $stmt->num_rows;
  
    $stmt->fetch();
    if($rows == 0) {
      return false;
    } else {
      return true;
    }
  }
  
  // Check if ingredient ID already exists
  function ingredientIdExists($id, $usedIds, $mysqli){
    if (!empty($usedIds) && in_array($id, $usedIds)) {
      return true;
    }
    
    $stmt = $mysqli->prepare("SELECT name FROM ingredient WHERE id=?"); 
    $stmt->bind_param("i", $id);
    if ($stmt->execute() == false){
      echo 'Query failed: ' . $mysqli->error;
    }
    
    $stmt->store_result();
    $stmt->bind_result($name);
    $rows = $stmt->num_rows;
    
    $stmt->fetch();
    if($rows == 0) {
      return false;
    } else {
      return true;
    }
    
  }
  
  // Return an unused id for the new recipe
  function findValidRecipeID($mysqli){
    $result = $mysqli->query("SELECT COUNT(*) AS recipeCount FROM recipe");
    $row = $result->fetch_assoc();
  
    $id = $row['recipeCount'] + 1;
    
    while(idExists($id, $mysqli)){
      $id += 1;
    }
    
    return $id;
  
  }
  
  function findValidIngredientId($mysqli, $usedIds){
    $result = $mysqli->query("SELECT COUNT(*) AS ingredientCount FROM ingredient");
    $row = $result->fetch_assoc();
  
    $id = $row['ingredientCount'] + 1;
    
    while(ingredientIdExists($id, $usedIds, $mysqli)){
      $id += 1;
    }
    
    return $id;
  }
  
  // Get an id for the new recipe
  $recipeId = findValidRecipeID($mysqli);
  
  // Get new ids for the ingredients
  foreach ($ingredients as $ing) {
    if($ing['id'] == ''){
      $newIngredientIds[] = findValidIngredientID($mysqli, $newIngredientIds);
    }
  }
  
 
  try{
    $mysqli->autocommit(FALSE);
    
    // add recipe
    $insertRecipe = $mysqli->prepare("INSERT INTO recipe (id, name) VALUES (?, ?)");   
    $insertRecipe->bind_param("is", $recipeId, $name);

    if ($insertRecipe->execute() == false){
        echo 'Query failed: ' . $mysqli->error;
    }
    $insertRecipe->close();

    // add new ingredients
    foreach($ingredients as $ingr){
      if($ingr['id'] == ''){
        // not in the ingredients table so we should add it
        $ingrId = array_pop($newIngredientIds);

        $insertIngredient = $mysqli->prepare("INSERT INTO ingredient (id, name) VALUES (?, ?)");   
        $insertIngredient->bind_param("is", $ingrId, $ingr['name']);
    
        if ($insertIngredient->execute() == false){
            echo 'Query failed: ' . $mysqli->error;
        }
        $insertIngredient->close();
        
        // now make sure it has the id
        $ingr['id'] = $ingrId;
        
      }

      // add to recipe_ingredient table
      $insertRecipeIngredient = $mysqli->prepare("INSERT INTO recipe_ingredient (recipe_id, ingredient_id, amount) VALUES (?, ?, ?)");   
      $insertRecipeIngredient->bind_param("iis", $recipeId ,$ingr['id'], $ingr['amount']);
  
      if ($insertRecipeIngredient->execute() == false){
          echo 'Query failed: ' . $mysqli->error;
      }
      $insertRecipeIngredient->close();
      
      
      
    }
    
    // add recipe steps
    $stepNum = 1;
    foreach ($steps as $step) {
      $insertStep = $mysqli->prepare("INSERT INTO recipe_step (recipe_id, step, directions) VALUES (?, ?, ?)");   
      $insertStep->bind_param("iis", $recipeId , $stepNum, $step);
  
      if ($insertStep->execute() == false){
          echo 'Query failed: ' . $mysqli->error;
      }
      $insertStep->close();
      $stepNum++;
    }
  
    $mysqli->commit();
    
  } catch(exception $e) {
    $mysqli->rollback();
    
    print $e;
    
  }
  
  $mysqli->close();

?>