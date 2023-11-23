<?php
    ini_set("display_errors", 1); 
    require_once("functions.php");

    // Check if request method is allowed
    $requestMethod = $_SERVER["REQUEST_METHOD"];
    $allowed = ["POST"];
    checkMethod($requestMethod, $allowed);

    // Get request data
    $requestData = getFileContents("php://input");

    // Base action on request action key
    $action = $requestData["action"];

    if($action == "fetchQuestion"){
        // Get all questions from json file
        $questions = getFileContents("mostLikelyTo.json");

        // Get all questions of the category from request
        $category = $requestData["category"];
        $questionsOfCategory = [];

        switch($category){
            case "The Basic Version":
                $questionsOfCategory = $questions[0]["The Basic Version"];
                break;
            case "Not Safe For Work":
                $questionsOfCategory = $questions[1]["Not Safe For Work"];
                break;
            case "Spicy Edition":
                $questionsOfCategory = $questions[2]["Spicy Edition"];
                break;
            case "Girl Dinner":
                $questionsOfCategory = $questions[3]["Girl Dinner"];
                break;
        }

        // Send back questions within category
        sendJSON($questionsOfCategory);

    }else if($action == "updateSelected"){
        // Get saved games and find
        $games = getFileContents("mostLikelyToGame.json");
        $gameId = $requestData["gameId"];
        $newVote = $requestData["vote"];
        $previousVote = $requestData["previousVote"];

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

            // Remove vote
            $votes = $activeGame["votes"];
            foreach($votes as $index => $vote){
                if($vote == $previousVote){
                    array_splice($games[$gameIndex]["votes"], $index,1);
                }
            }

            // Add new vote
            if(!$newVote == null){
                $games[$gameIndex]["votes"][] = $newVote;
            }

            saveToFile("mostLikelyToGame.json", $games);
            sendJSON($games[$gameIndex]["votes"]);

        }else{
            $message = ["message" => "no active game was found"];
            sendJson($message, 404);
        }

    }else if($action == "createGame"){
        $games = getFileContents("mostLikelyToGame.json");
        $players = $requestData["players"];
       
        // Give the game a randomized id
        function setRandomId(){
            return rand(1000,9999);
        }

        // Check if id is already used
        function checkId($gameId){
            global $games;
            // Check if id already exists
            foreach($games as $game){
                if($game["id"] == $gameId){
                    $newGameId = setRandomId();
                    checkId($newGameId);
                    return;
                }
            }
        }

        $gameId = setRandomId();
        checkId($gameId);

        // Set game parameters
        $gameData = [
            "id" => $gameId,
            "palyers" => $players,
            "votes" => []
        ];
          
        $games[] = $gameData;

        // Update json file and return game id
        saveToFile("mostLikelyToGame.json", $games);
        $message = $gameId;
        sendJSON($message);
    }

    
?>