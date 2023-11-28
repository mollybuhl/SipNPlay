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
        $category = $requestDdata["category"];

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