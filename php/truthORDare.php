<?php
    ini_set("display_errors", 1);
    require_once("functions.php");

    $questions = getFileContents("truthORDareQuestions.json");
    $requestMethod = $_SERVER["REQUEST_METHOD"];
    // Get data from the request body
    $requestData = getFileContents("php://input");

    if($requestMethod == "POST") {
        //Fetches information from POST request and save values
        $data = getFileContents("php://input"); 
        $questionType = $data["type"];
        $category = $data["category"];

        // Declare variable to store question
        $questionArray;

        if($questionType == "truth") {
            switch($category) {
                case "The Basic Version":
                    $questionArray = $questions[0]["basic"]["truth"];
                    break;
                case "spicy":
                    $questionArray = $questions[0]["spicy"]["truth"];
                    break;
                case "girls":
                    $questionArray = $questions[0]["girls"]["truth"];
                    break;
            }
        } else {
            switch($category) {
                case "The Basic Version":
                    $questionArray = $questions[0]["basic"]["dare"];
                    break;
                case "Spicy Edition":
                    $questionArray = $questions[0]["spicy"]["dare"];
                    break;
                case "Girl Dinner":
                    $questionArray = $questions[0]["girls"]["dare"];
                    break;
            }
        }

        $response = [
            "questions" => $questionArray,
            "type" => $questionType,
            "category" => $category
        ];

        sendJSON($response);
    }
?>