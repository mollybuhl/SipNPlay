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

    // Get all active games
    $games = getFileContents("activeGames.json");

    // Create new game
    if($action == "createGame"){

        // function to get a random Id
        function setRandomId(){
            return rand(1000,9999);
        }

        // Function to check if id is already used
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

        $creatorName = $requestData["name"];

        // Set game parameters
        $gameData = [
        "id" => $gameId,
        "players" => [$creatorName],
        "activeGame" => [
            "game" => "No Active Game",
            "category" => "No category",
            "votes" => []
        ]];
          
        $games[] = $gameData;

        // Update json file and return game id
        saveToFile("activeGames.json", $games);
        $message = $gameId;
        sendJSON($message);
    }else if($action == "getPlayers"){

        // Get game by id
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

        // If active game found return current players, otherwise inform user
        if($activeGame){
            $players = $activeGame["players"];
            sendJSON($players);

        }else{
            $message = ["message" => "no active game was found"];
            sendJson($message, 404);
        }
    }else if($action == "joinGame"){

        // Get game by id
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
        
        // If active game found return current players, otherwise inform user
        if($activeGame){
            $playerName = $requestData["name"];

            $games[$gameIndex]["players"][] = $playerName;

            // Update json file and return game id
            saveToFile("activeGames.json", $games);
            $message = "Added";
            sendJSON($message);

        }else{
            $message = ["message" => "no game under that pin was found"];
            sendJson($message, 404);
        }

    }else if($action == "leaveGame"){

        // Get game by id
        $gameId = $requestData["gameId"];
        // Get name of player
        $playerName = $requestData["player"];

        // Find active game based on gameId from request
        $activeGame = false;
        $gameIndex;
 
        foreach($games as $index => $game){
            if($game["id"] == $gameId){
                $activeGame = $game;
                $gameIndex = $index;
            }
        }

        // If active game found delete user from game, otherwise inform user
        if($activeGame){
            $players = $activeGame["players"];

            foreach($players as $index => $player){
                if($player == $playerName){
                    array_splice($games[$gameIndex]["players"], $index,1);
                }
            }

            saveToFile("activeGames.json", $games);
            sendJSON(true);

        }else{
            $message = ["message" => "no active game was found"];
            sendJson($message, 404);
        }

    }else if($action == "requestToStartGame"){
        // Get game by id
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
        
        // If active game found return current players, otherwise inform user
        if($activeGame){

            $game = $games[$gameIndex]["activeGame"]["game"];
            $category = $games[$gameIndex]["activeGame"]["category"];

            if($game == "No Active Game"){
                $message = False;
            }else{
                $message = ["game" => $game, "category" => $category];
            }

            sendJSON($message);

        }else{
            $message = ["message" => "no game under that pin was found"];
            sendJson($message, 404);
        }
    }else if($action == "startGame"){
        // Get game by id
        $gameId = $requestData["gameId"];
        $gamePlayed = $requestData["game"];
        $categoryPlayed = $requestData["category"];
        

        // Find active game based on gameId from request
        $activeGame = false;
        $gameIndex;

        foreach($games as $index => $game){
            if($game["id"] == $gameId){
                $activeGame = $game;
                $gameIndex = $index;
            }
        }   
        
        // If active game found update game status, otherwise inform user
        if($activeGame){
        
            // Update game status
            $games[$gameIndex]["activeGame"]["game"] = $gamePlayed;
            $games[$gameIndex]["activeGame"]["category"] = $categoryPlayed;

            // Update json file and return game id
            saveToFile("activeGames.json", $games);

            $message = ["message" => "Game started"];
            sendJSON($message);

        }else{
            $message = ["message" => "no game under that pin was found"];
            sendJson($message, 404);
        }
    }else if($action == "endGame"){
        // Get game by id
        $gameId = $requestData["gameId"];
        /*$gamePlayed = $requestData["game"];
        $categoryPlayed = $requestData["category"];*/
        

        // Find active game based on gameId from request
        $activeGame = false;
        $gameIndex;

        foreach($games as $index => $game){
            if($game["id"] == $gameId){
                $activeGame = $game;
                $gameIndex = $index;
            }
        }   
        
        // If active game found update game status, otherwise inform user
        if($activeGame){
        
            // Delete game
            array_splice($games, $gameIndex, 1);

            // Update json file and inform user
            saveToFile("activeGames.json", $games);

            $message = ["message" => "Game Deleted"];
            sendJSON($message);

        }else{
            $message = ["message" => "no game under that pin was found"];
            sendJson($message, 404);
        }
    }else if($action == "endRound"){

        // Get game by id
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
        
        // If active game found end current game round, otherwise inform user
        if($activeGame){
        
            // Change game and category status
            $games[$gameIndex]["activeGame"]["game"] = "No Active Game";
            $games[$gameIndex]["activeGame"]["category"] = "No category";

            // Update json file and inform user
            saveToFile("activeGames.json", $games);

            $message = ["message" => "Round Ended"];
            sendJSON($message);

        }else{
            $message = ["message" => "no game under that pin was found"];
            sendJson($message, 404);
        }
    }else if($action == "checkGameId"){

        // Get game by id
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
        
        // If active game found return true, if not found return false
        if($activeGame){
            $message = [true];
            sendJSON($message);
        }else{
            $message = [false];
            sendJson($message, 404);
        }
    }else if($action == "checkActiveGame"){

        // Get game by id
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
        
        // If active game found return true, if not found return false
        if($activeGame){

            if($activeGame["activeGame"]["game"] == "No Active Game"){
                $message = false;
                sendJSON($message);
            }else{
                $currentGame = $activeGame["activeGame"]["game"];
                $message = $currentGame;
                sendJSON($message);
            }

            $message = true;
            sendJSON($message);
        }else{
            $message = ["No game under that pin was found"];
            sendJson($message, 404);
        }

    }
?>