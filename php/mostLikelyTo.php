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

    // Continue bsed on action
    if($action == "fetchQuestion"){
        // FETCH QUESTIONS

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
                $questionsOfCategory = $questions[0]["Not Safe For Work"];
                break;
            case "Spicy Edition":
                $questionsOfCategory = $questions[0]["Spicy Edition"];
                break;
            case "Girl Dinner":
                $questionsOfCategory = $questions[0]["Girl Dinner"];
                break;
        }

        // Send back questions within category
        sendJSON($questionsOfCategory);

    }else if($action == "updateSelected"){
        // UPDATE SELECTED

        // Get saved games and find
        $games = getFileContents("activeGames.json");
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
            $votes = $activeGame["activeGame"]["votes"];
            foreach($votes as $index => $vote){
                if($vote == $previousVote){
                    array_splice($games[$gameIndex]["activeGame"]["votes"], $index,1);
                }
            }

            // Add new vote
            if(!$newVote == null){
                $games[$gameIndex]["activeGame"]["votes"][] = $newVote;
            }

            saveToFile("activeGames.json", $games);
            sendJSON($games[$gameIndex]["activeGame"]["votes"]);

        }else{
            $message = ["message" => "no game with matching Id was found"];
            sendJson($message, 404);
        }

    }else if($action == "fetchResults"){
        // GET RESULTS

        $games = getFileContents("activeGames.json");
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
            sendJSON($activeGame["activeGame"]["votes"]);

        }else{
            $message = ["message" => "no game with matching Id was found"];
            sendJson($message, 404);
        }
    }else if($action == "clearVotes"){
        // CLEAR ALL VOTES

        $games = getFileContents("activeGames.json");
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
            
            // Remove votes
            $games[$gameIndex]["activeGame"]["votes"] = [];

            saveToFile("activeGames.json", $games);
            sendJSON([$games[$gameIndex]["activeGame"]["votes"]]);

        }else{
            $message = ["message" => "no game with matching Id was found"];
            sendJson($message, 404);
        }

    }

    
?>