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

    // Continue based on actio key
    if($action == "createGame"){
        // CREATE NEW GAME

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
            "host" => $creatorName,
            "game" => "No Active Game",
            "category" => "No category",
            "questionIndex" => 0,
            "playerInQuestion" => "No player",
            "timeLeft" => 30,
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
        [$activeGame, $gameIndex] = checkForActiveGame($gameId); 

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
        [$activeGame, $gameIndex] = checkForActiveGame($gameId); 
        
        // If active game found return current players, otherwise inform user
        if($activeGame){
            $playerName = $requestData["name"];

            $games[$gameIndex]["players"][] = $playerName;

            // Update json file and return game id
            saveToFile("activeGames.json", $games);
            $message = "Added";
            sendJSON($message);

        }else{
            $message = false;
            sendJson($message, 404);
        }

    }else if($action == "leaveGame"){

        // Get game by id
        $gameId = $requestData["gameId"];
        [$activeGame, $gameIndex] = checkForActiveGame($gameId); 

        // Get name of player
        $playerName = $requestData["player"];

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
        [$activeGame, $gameIndex] = checkForActiveGame($gameId); 
        
        // If active game found return current players, otherwise inform user
        if($activeGame){

            $game = $games[$gameIndex]["activeGame"]["game"];
            $category = $games[$gameIndex]["activeGame"]["category"];
            $questionIndex = $games[$gameIndex]["activeGame"]["questionIndex"];

            if($game == "No Active Game"){
                $message = False;
            }else{
                $message = ["game" => $game, "category" => $category, "questionIndex" => $questionIndex];
            }
            sendJSON($message);

        }else{
            $message = ["message" => "no game under that pin was found"];
            sendJson($message, 404);
        }
    }else if($action == "startGame"){
        // Get game by id
        $gameId = $requestData["gameId"];
        [$activeGame, $gameIndex] = checkForActiveGame($gameId); 

        $gamePlayed = $requestData["game"];
        $categoryPlayed = $requestData["category"];
        
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
        [$activeGame, $gameIndex] = checkForActiveGame($gameId); 
        
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
        [$activeGame, $gameIndex] = checkForActiveGame($gameId); 
        
        // If active game found end current game round, otherwise inform user
        if($activeGame){
        
            // Change game and category status
            $games[$gameIndex]["activeGame"]["game"] = "No Active Game";
            $games[$gameIndex]["activeGame"]["category"] = "No category";
            $games[$gameIndex]["activeGame"]["questionIndex"] = 0;
            $games[$gameIndex]["activeGame"]["playerInQuestion"] = "No player";

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
        [$activeGame, $gameIndex] = checkForActiveGame($gameId); 
        
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
        [$activeGame, $gameIndex] = checkForActiveGame($gameId); 
        
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

    }else if($action == "changeGameStatus"){

        // Get game by id
        $gameId = $requestData["gameId"];
        [$activeGame, $gameIndex] = checkForActiveGame($gameId); 
        
        // If active game found change game status, otherwise inform user
        if($activeGame){

            // Change game and category status
            $games[$gameIndex]["activeGame"]["game"] = $requestData["game"];
            $games[$gameIndex]["activeGame"]["category"] = $requestData["category"];
            $games[$gameIndex]["activeGame"]["questionIndex"] = 0;

            // Update json file and inform user
            saveToFile("activeGames.json", $games);

            $message = ["message" => "Round Ended"];
            sendJSON($message);

            $message = true;
            sendJSON($message);
        }else{
            $message = ["No game under that pin was found"];
            sendJson($message, 404);
        }

    }else if($action == "updateQuestionIndex"){

        // Get game by id
        $gameId = $requestData["gameId"];
        [$activeGame, $gameIndex] = checkForActiveGame($gameId); 
        
        // If active game found change game status, otherwise inform user
        if($activeGame){

            // Change game and category status
            $questionIndex = $games[$gameIndex]["activeGame"]["questionIndex"];
            $games[$gameIndex]["activeGame"]["questionIndex"]++;

            // Update json file and inform user
            saveToFile("activeGames.json", $games);

            $message = $games[$gameIndex]["activeGame"]["questionIndex"];
            
            sendJson($message);
        }else{
            $message = ["No game under that pin was found"];
            sendJson($message, 404);
        }

    }else if($action == "requestNextQuestion"){

        // Get game by id
        $gameId = $requestData["gameId"];
        [$activeGame, $gameIndex] = checkForActiveGame($gameId);  
        
        // If active game found change game status, otherwise inform user
        if($activeGame){

            // Check if current question index is the same as question index saved in json
            $currentQuestion = $requestData["currentQuestion"];
            $activeGameQuestion = $games[$gameIndex]["activeGame"]["questionIndex"];

            
            $message = $activeGameQuestion;
            sendJson($message);
            
            
        }else{
            $message = ["No game under that pin was found"];
            sendJson($message, 404);
        }
    }else if($action == "updatePlayerInQuestion"){
        // Get game by id
        $gameId = $requestData["gameId"];
        [$activeGame, $gameIndex] = checkForActiveGame($gameId);  
        
        // If active game found change player in question status, otherwise infrom user
        if($activeGame){

            $player = $requestData["player"];
            $games[$gameIndex]["activeGame"]["playerInQuestion"] = $player;
            
            // Update json file and inform user
            saveToFile("activeGames.json", $games);

            sendJson($games[$gameIndex]["activeGame"]["playerInQuestion"]);
            
        }else{
            $message = ["No game under that pin was found"];
            sendJson($message, 404);
        }
    }else if($action == "getPlayerInQuestion"){
        // Get game by id
        $gameId = $requestData["gameId"];
        [$activeGame, $gameIndex] = checkForActiveGame($gameId);  
        
        // If active game found change player in question status, otherwise infrom user
        if($activeGame){
            sendJson($games[$gameIndex]["activeGame"]["playerInQuestion"]);
        }else{
            $message = ["No game under that pin was found"];
            sendJson($message, 404);
        }
    }else if($action == "updateTime"){
        // Get game by id
        $gameId = $requestData["gameId"];
        [$activeGame, $gameIndex] = checkForActiveGame($gameId);  
        
        // If active game found update time
        if($activeGame){
            $games[$gameIndex]["activeGame"]["timeLeft"] = $requestData["timeLeft"];
            saveToFile("activeGames.json", $games);

            sendJson($games[$gameIndex]["activeGame"]["timeLeft"]);
        }else{
            $message = ["No game under that pin was found"];
            sendJson($message, 404);
        }
    }else if($action == "getTime"){
        // Get game by id
        $gameId = $requestData["gameId"];
        [$activeGame, $gameIndex] = checkForActiveGame($gameId);  

        // If active game found return time
        if($activeGame){

            sendJson($games[$gameIndex]["activeGame"]["timeLeft"]);
        }else{
            $message = ["No game under that pin was found"];
            sendJson($message, 404);
        }
    }
?>