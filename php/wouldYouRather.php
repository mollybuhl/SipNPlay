<?php
    ini_set("display_errors", 1);
    require_once("functions.php");

    // Check if request method is allowed
    $requestMethod = $_SERVER["REQUEST_METHOD"];
    $allowed = ["POST"];
    checkMethod($requestMethod, $allowed);

    $questions = getFileContents("wouldYouRatherQuestions.json");
    $games = getFileContents("activeGames.json");

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
                $questionArray = $questions[0]["The Basic Version"];
                break;
            case "Spicy Edition":
                $questionArray = $questions[0]["Spicy Edition"];
                break;
            case "Girl Dinner":
                $questionArray = $questions[0]["Girl Dinner"];
                break;
            case "Not Safe For Work":
                $questionArray = $questions[0]["Not Safe For Work"];
                break;
        }

        $response = [
            "questions" => $questionArray,           
            "category" => $category
        ];

        sendJSON($response);

    } else if($action == "fetchResults") {
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
        $player = $requestData["vote"];

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
             // Check if the player's vote already exists to prevent multiple votes
            $existingVotes = $games[$gameIndex]["activeGame"]["votes"][$questionType];
            if (!in_array($player, $existingVotes)) {
                // Add a new vote
                $games[$gameIndex]["activeGame"]["votes"][$questionType][] = $player;

                // Remove the vote from the other option if it exists
                $oppositeType = ($questionType == "this") ? "that" : "this";
                $indexToRemove = array_search($player, $games[$gameIndex]["activeGame"]["votes"][$oppositeType]);
                if ($indexToRemove !== false) {
                    array_splice($games[$gameIndex]["activeGame"]["votes"][$oppositeType], $indexToRemove, 1);
                }
            }
            saveToFile("activeGames.json", $games);
            sendJSON($games[$gameIndex]);

        } else{
            $message = ["message" => "No active game was found"];
            sendJson($message, 404);
        }
    } else if($action == "replaceVotesStructure") {
        $gameId = $requestData["gameId"];

        // Add keys this or that in votes key to store votes
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
            $games[$gameIndex]["activeGame"]["votes"]["this"] = [];
            $games[$gameIndex]["activeGame"]["votes"]["that"] = [];
        }
        
        saveToFile("activeGames.json", $games);
    } else if($action == "originalVotesStructure") {
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
            $games[$gameIndex]["activeGame"]["votes"]= [];
        }

        saveToFile("activeGames.json", $games);
    }
?> 