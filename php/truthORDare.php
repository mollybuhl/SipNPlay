<?php
    ini_set("display_errors", 1);
    require_once("functions.php");

    $questions = getFileContents("truthORDare.json");
    $requestMethod = $_SERVER["REQUEST_METHOD"];
    // Get data from the request body
    $requestData = getFileContents("php://input");

    if($requestMethod == "POST") {
        //Fetches information from POST request and save values
        $data = getFileContents("php://input"); 
        $questionType = $data["type"];
        $category = $data["category"];

        // Declare variable to store question
        $question;

        if($questionType == "truth") {
            switch($category) {
                case "The Basic Version":
                    $question = $questions[0]["basic"]["truth"][array_rand($questions[0]["basic"]["truth"], 1)];
                    break;
                case "spicy":
                    $question = $questions[0]["spicy"]["truth"][array_rand($questions[0]["spicy"]["truth"], 1)];
                    break;
                case "girls":
                    $question = $questions[0]["girls"]["truth"][array_rand($questions[0]["girls"]["truth"], 1)];
                    break;
            }
        } else {
            switch($category) {
                case "The Basic Version":
                    $question = $questions[0]["basic"]["dare"][array_rand($questions[0]["basic"]["dare"], 1)];
                    break;
                case "spicy":
                    $question = $questions[0]["spicy"]["dare"][array_rand($questions[0]["spicy"]["dare"], 1)];
                    break;
                case "girls":
                    $question = $questions[0]["girls"]["dare"][array_rand($questions[0]["girls"]["dare"], 1)];
                    break;
            }
        }

        $message = [
            "question" => $question,
            "type" => $questionType,
            "category" => $category
        ];

        sendJSON($message);
    }
?>