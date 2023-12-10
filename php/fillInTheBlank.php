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

    if($action == "fetchQuestion"){

        // Get all questions from json file
        $questions = getFileContents("fillInTheBlank.json");

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

    }else if($action == "saveAnswer"){

        // Find active game based on gameId from request
        $gameId = $requestData["gameId"];
        [$activeGame, $gameIndex] = checkForActiveGame($gameId); 

        // If active game found save player answer
        if($activeGame){

            $playerAnswer = $requestData["playerAnswer"];
            $playerName = $requestData["playerName"];

            // Look for answer key
            if(!isset($activeGame["activeGame"]["answers"])){
                // If not found, create "answerW key and initialize it as an empty array
                $activeGame["activeGame"]["answers"] = [];
            }

            // Save playwer answer
            $activeGame["activeGame"]["answers"][$playerName] = $playerAnswer;

            // Update the game in the $games array
            $games[$gameIndex] = $activeGame;

            saveToFile("activeGames.json", $games);
            sendJSON(["message" => "Answer saved successfully"]);

        }else{
            $message = ["message" => "no game with matching Id was found"];
            sendJson($message, 404);
        }
    }else if($action == "fetchAnswers"){

        // Get game by id
        $gameId = $requestData["gameId"];
        [$activeGame, $gameIndex] = checkForActiveGame($gameId); 

        if($activeGame){

            // Send back answers
            $activeGame["activeGame"]["answers"];
            sendJSON($activeGame["activeGame"]["answers"]);

        }else{
            $message = ["message" => "no game with matching Id was found"];
            sendJson($message, 404);
        }
    }else if($action == "updateSelected"){

        // Get game by id
        $gameId = $requestData["gameId"];
        [$activeGame, $gameIndex] = checkForActiveGame($gameId); 

        $newVote = $requestData["vote"];
        $previousVote = $requestData["previousVote"];

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
    }else if($action == "fetchVotes"){

        // Get game by id
        $gameId = $requestData["gameId"];
        [$activeGame, $gameIndex] = checkForActiveGame($gameId); 

        if($activeGame){
            // Send back votes
            sendJSON($activeGame["activeGame"]["votes"]);
        }else{
            $message = ["message" => "no game with matching Id was found"];
            sendJson($message, 404);
        }
    }
?>