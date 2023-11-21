<?php
    ini_set("display_errors", 1); 

    function sendJSON($message, $statusCode = 200){
        header("Content-Type: application/json");
        http_response_code($statusCode);
        $json = json_encode($message);
        echo $json;
        exit();
    }

    $requestMethod = $_SERVER["REQUEST_METHOD"];
    $allowed = ["POST"];
    //checkMethod($requestMethod, $allowed);

    $filename = __DIR__."/neverHaveIEverQuestions.json";

    /*if(!file_exists($filename)){
        
    }*/
    $json = file_get_contents($filename);
    $questions = json_decode($json, true);



    $requestJSON = file_get_contents("php://input");
    $requestData = json_decode($requestJSON, true);

    

    $category = $requestData["category"];
    $questionsOfCategory = [];

    foreach($questions as $question){
        if($question["category"] == $category){
            $questionsOfCategory[] = $question;
        }
    }

    $randIndex = rand(0, count($questionsOfCategory) - 1);

    $randQuestion = $questionsOfCategory[$randIndex];

    sendJSON($randQuestion);

    

?>