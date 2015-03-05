<?php
  require_once('connect.php');
  session_start();
  
  $searchText = '';  
  $mysqli = connectToDB();
  
  $stmt = $mysqli->prepare("SELECT * from ingredient");
  if ($stmt->execute() == false) {
      echo 'Query failed: ' . $mysqli->error;
  }
  $stmt->store_result();
  $stmt->bind_result($id, $name);
  $allIngredients = array();
  while ($stmt->fetch()) {
    $newIngredient = array('id' => $id, 'name' => $name);
    $allIngredients[] = $newIngredient;
  }
  
  $stmt->close();

  $mysqli->close();
  header('Content-Type: application/json');
  echo json_encode($allIngredients);
  
  

?>