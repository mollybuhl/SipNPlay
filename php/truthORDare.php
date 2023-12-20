<?php
    ini_set("display_errors", 1);
    require_once("functions.php");

    // Check if request method is allowed
    $requestMethod = $_SERVER["REQUEST_METHOD"];
    $allowed = ["POST"];
    checkMethod($requestMethod, $allowed);

    $questions = getFileContents("truthORDareQuestions.json");

    // Get data from the request body
    $requestData = getFileContents("php://input");
    // Base action on request action key
    $action = $requestData["action"];

    if($action == "fetchQuestion") {
        //Fetches information from POST request and save values
        $questionType = $requestData["type"];
        $category = $requestData["category"];

        // Declare variable to store question
        $questionArray;

        if($questionType == "truth") {
            switch($category) {
                case "The Basic Version":
                    $questionArray = $questions[0]["The Basic Version"]["truth"];
                    break;
                case "Spicy Edition":
                    $questionArray = $questions[0]["Spicy Edition"]["truth"];
                    break;
                case "Girl Dinner":
                    $questionArray = $questions[0]["Girl Dinner"]["truth"];
                    break;
                case "Not Safe For Work":
                    $questionArray = $questions[0]["Not Safe For Work"]["truth"];
                    break;
            }
        } else {
            switch($category) {
                case "The Basic Version":
                    $questionArray = $questions[0]["The Basic Version"]["dare"];
                    break;
                case "Spicy Edition":
                    $questionArray = $questions[0]["Spicy Edition"]["dare"];
                    break;
                case "Girl Dinner":
                    $questionArray = $questions[0]["Girl Dinner"]["dare"];
                    break;
                case "Not Safe For Work":
                    $questionArray = $questions[0]["Not Safe For Work"]["truth"];
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