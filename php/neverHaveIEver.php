<?php
    ini_set("display_errors", 1); 
    require_once("functions.php");

    // Get all questions from json file
    $questions = getFileContents("neverHaveIEver.json");
    $requestMethod = $_SERVER["REQUEST_METHOD"];

    // Check if request method is allowed
    $allowed = ["POST"];
    checkMethod($requestMethod, $allowed);

    // Get request data
    $requestData = getFileContents("php://input");

    // Get all questions of the category from request
    $category = $requestData["category"];
    $questionsOfCategory = [];

    switch($category){
        case "The Basic Version":
            $questionsOfCategory = $questions[0]["The Basic Version"];
            break;
        case "Not Safe For Work":
            $questionsOfCategory = $questions[0]["Not Safe For Work"];
            break;
        case "Spicy Edition":
            $questionsOfCategory = $questions[0]["Spicy Edition"];
            break;
        case "Girl Dinner":
            $questionsOfCategory = $questions[0]["Girl Dinner"];
            break;
    }

    sendJSON($questionsOfCategory);

?>