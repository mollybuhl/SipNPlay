<?php
    ini_set("display_errors", 1);
    require_once("functions.php");

    $questions = getFileContents("wouldYouRatherQuestions.json");
    $requestMethod = $_SERVER["REQUEST_METHOD"];
    // Get data from the request body
    $requestData = getFileContents("php://input");

    if($requestMethod == "POST") {
        //Fetches information from POST request and save values
        $data = getFileContents("php://input"); 
        $category = $data["category"];

        // Declare variable to store question
        $questionArray;

        switch($category) {
            case "The Basic Version":
                $questionArray = $questions[0]["basic"];
                break;
            case "Spicy Edition":
                $questionArray = $questions[0]["spicy"];
                break;
            case "Girl Dinner":
                $questionArray = $questions[0]["girls"];
                break;
        }

        $response = [
            "questions" => $questionArray,           
            "category" => $category
        ];

        sendJSON($response);
    }

    if($requestMethod == "PATCH") {
        //Fetches information from POST request and save values
        $data = getFileContents("php://input"); 
    }
?>