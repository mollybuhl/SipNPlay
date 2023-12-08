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

        if($activeGame){
            if($previousVote == "this") {
                // Find the index of the lowercase player name in the lowercase array
                $votes = $games[$gameIndex]["activeGame"]["votes"]["this"];
                $indexToRemove = array_search($player, $votes);

                // Check if the value was found before attempting to remove
                if ($indexToRemove !== false) {
                    // Remove the value at the found index
                    array_splice($games[$gameIndex]["activeGame"]["votes"]["this"], $indexToRemove, 1);

                    $games[$gameIndex]["activeGame"]["votes"]["that"][] = $player;
                }
            } elseif($previousVote == "that") {
                $votes = $games[$gameIndex]["activeGame"]["votes"]["that"];
                $indexToRemove = array_search($player, $votes);

                if ($indexToRemove !== false) {
                    array_splice($games[$gameIndex]["activeGame"]["votes"]["that"], $indexToRemove, 1);

                    $games[$gameIndex]["activeGame"]["votes"]["this"][] = $player;
                }
            } else {
                // Add new vote
                if(!$player == null) {
                    if ($questionType == "this") {
                        $games[$gameIndex]["activeGame"]["votes"]["this"][] = $player;

                        // Find the index of the lowercase player name in the lowercase array
                        $votes = $games[$gameIndex]["activeGame"]["votes"]["that"];
                        $indexToRemove = array_search($player, $votes);

                        // Check if the value was found before attempting to remove
                        if ($indexToRemove !== false) {
                        // Remove the value at the found index
                        array_splice($games[$gameIndex]["activeGame"]["votes"]["that"], $indexToRemove, 1);
                        }
                    } else {
                        $games[$gameIndex]["activeGame"]["votes"]["that"][] = $player;

                        $votes = $games[$gameIndex]["activeGame"]["votes"]["this"];
                        $indexToRemove = array_search($player, $votes);

                        if ($indexToRemove !== false) {
                            array_splice($games[$gameIndex]["activeGame"]["votes"]["this"], $indexToRemove, 1);
                        }
                    }
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
    }
?> 