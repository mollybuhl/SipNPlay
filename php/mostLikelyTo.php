<?php
    ini_set("display_errors", 1); 
    require_once("functions.php");

    // Get all questions from json file
    $questions = getFileContents("mostLikelyTo.json");
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
            $questionsOfCategory = $questions[1]["Not Safe For Work"];
            break;
        case "Spicy Edition":
            $questionsOfCategory = $questions[2]["Spicy Edition"];
            break;
        case "Girl Dinner":
            $questionsOfCategory = $questions[3]["Girl Dinner"];
            break;
    }

    // Select a random question and send back to user
    $randIndex = rand(0, count($questionsOfCategory) - 1);
    $randQuestion = $questionsOfCategory[$randIndex];

    $data = $randQuestion;

    sendJSON($data);

?>