<?php
    ini_set("display_errors", 1);
    require_once("functions.php");

    // Check if request method is allowed
    $requestMethod = $_SERVER["REQUEST_METHOD"];
    $allowed = ["POST"];
    checkMethod($requestMethod, $allowed);

    $questions = getFileContents("truthORDareQuestions.json");
    $games = getFileContents("activeGames.json");


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
    } else if($action === "changeQuestionType") {
        // Get saved values from request body
        $gameId = $requestData["gameId"];
        $questionType = $requestData["type"];

        // Find active game based on gameId from request
        $activeGame = false;
        $gameIndex;

        foreach($games as $index => $game){
            if($game["id"] == $gameId){
                $activeGame = $game;
                $gameIndex = $index;
            }
        }

        if($activeGame){
            $games[$gameIndex]["activeGame"]["truthORdare"]["type"] = $questionType;

            saveToFile("activeGames.json", $games);
            $message = ["Success"];
            sendJSON($message);
        } else{
            $message = ["No game under that pin was found"];
            sendJson($message, 404);
        }
        
    } else if($action === "getQuestionType") {
        // Get saved values from request body
        $gameId = $requestData["gameId"];

        // Find active game based on gameId from request
        $activeGame = false;
        $gameIndex;

        foreach($games as $index => $game){
            if($game["id"] == $gameId){
                $activeGame = $game;
                $gameIndex = $index;
            }
        }

        if($activeGame){
            sendJson($games[$gameIndex]["activeGame"]["truthORdare"]["type"]);
        }else{
            $message = ["No game under that pin was found"];
            sendJson($message, 404);
        }

    } else if($action === "setQuestionIndex") {
        // Get game by id
        $gameId = $requestData["gameId"];
        $index = $requestData["index"];
        $questionType = $requestData["type"];
        [$activeGame, $gameIndex] = checkForActiveGame($gameId); 

        // If active game found change game status, otherwise inform user
        if($activeGame){

            if($questionType === "truth") {
                // Change truthIndex
                $games[$gameIndex]["activeGame"]["truthORdare"]["truthIndex"] = $index;
                $message = $games[$gameIndex]["activeGame"]["truthORdare"];
            } else {
                // Change dareIndex
                $games[$gameIndex]["activeGame"]["truthORdare"]["dareIndex"] = $index;
                $message = $games[$gameIndex]["activeGame"]["truthORdare"];
            }
    
            // Update json file and inform user
            saveToFile("activeGames.json", $games);
            
            sendJson($message);
        }else{
            $message = ["No game under that pin was found"];
            sendJson($message, 404);
        }    
    } else if($action === "getCurrentQuestionIndex") {
        // Get game by id
        $gameId = $requestData["gameId"];
        $questionType = $requestData["type"];
        [$activeGame, $gameIndex] = checkForActiveGame($gameId);  
        
        // If active game found change game status, otherwise inform user
        if($activeGame){

            // Send back current question index for either truth or dare
            $activeGameQuestion;
            if($questionType === "truth") {
                $activeGameQuestion = $games[$gameIndex]["activeGame"]["truthORdare"]["truthIndex"];
            } else {
                $activeGameQuestion = $games[$gameIndex]["activeGame"]["truthORdare"]["dareIndex"];
            }
        
            $message = $activeGameQuestion;
            sendJson($message);
        }else{
            $message = ["No game under that pin was found"];
            sendJson($message, 404);
        }
    }
?>