<?php
    ini_set("display_errors", 1);
    require_once("functions.php");

    // Check if request method is allowed
    $requestMethod = $_SERVER["REQUEST_METHOD"];
    $allowed = ["POST"];
    checkMethod($requestMethod, $allowed);

    $questions = getFileContents("wouldYouRatherQuestions.json");
    $games = getFileContents("wouldYouRatherGame.json");

    // Get data from the request body
    $requestData = getFileContents("php://input");
    // Base action on request action key
    $action = $requestData["action"];

    if($action == "fetchQuestion") {
        // Save values from request body
        $category = $requestData["category"];

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

    } else if($action == "createGame") {
          // Give the game a randomized id
          function setRandomId(){
            return rand(1000,9999);
        }

        // Check if id is already used
        function checkId($gameId){
            global $games;
            // Check if id already exists
            foreach($games as $game){
                if($game["gameId"] == $gameId){
                    $newGameId = setRandomId();
                    checkId($newGameId);
                    return;
                }
            }
        }

        // Create new game and check if id already exists
        $gameId = setRandomId();
        checkId($gameId);

        // Set game parameters
        $gameData = [
            "gameId" => $gameId,
            "this" => [
                "votes" => []
            ],
            "that" => [
                "votes" => []
            ]
        ];
          
        $games[] = $gameData;

        // Update json file and return game id
        saveToFile("wouldYouRatherGame.json", $games);
        $message = $gameId;
        sendJSON($message);

    } else if($action == "fetchResults") {
        $gameId = $requestData["gameId"];

        // Find active game based on gameId from request
        $activeGame = false;
        $gameIndex;

        foreach($games as $index => $game){
            if($game["gameId"] == $gameId){
                $activeGame = $game;
                $gameIndex = $index;
            }
        }

        // If active game found handle votes, otherwise inform user
        if($activeGame){
            sendJSON($activeGame);

        }else{
            $message = ["message" => "No active game was found"];
            sendJson($message, 404);
        }
    } else if($action == "updateVotes") {
        // Get saved values from request body
        $gameId = $requestData["gameId"];
        $questionType = $requestData["questionType"];
        $vote = $requestData["vote"];

        // Find active game based on gameId from request
        $activeGame = false;
        $gameIndex;

        foreach($games as $index => $game){
            if($game["gameId"] == $gameId){
                $activeGame = $game;
                $gameIndex = $index;
            }
        }

        // If active game found handle votes, otherwise inform user
        if($activeGame){
            // Remove vote and add new vote
            if(!$vote == null) {
                if($questionType == "this") {
                    array_shift($games[$gameIndex]["that"]["votes"]);
        
                    $games[$gameIndex]["this"]["votes"][] = $vote;
                } else {
                    array_shift($games[$gameIndex]["this"]["votes"]);
        
                    $games[$gameIndex]["that"]["votes"][] = $vote;
                }
            }

            saveToFile("wouldYouRatherGame.json", $games);
            sendJSON($games[$gameIndex]);

        } else{
            $message = ["message" => "No active game was found"];
            sendJson($message, 404);
        }
    }
?> 