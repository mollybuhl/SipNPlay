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
        $question;

        switch($category) {
            case "The Basic Version":
                $question = $questions[0]["basic"][array_rand($questions[0]["basic"], 1)];
                break;
            case "Spicy Edition":
                $question = $questions[0]["spicy"][array_rand($questions[0]["spicy"], 1)];
                break;
            case "Girl Dinner":
                $question = $questions[0]["girls"][array_rand($questions[0]["girls"], 1)];
                break;
        }

        $response = [
            "question" => $question,           
            "category" => $category
        ];

        sendJSON($response);
    }
?>