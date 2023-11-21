<?php 
    // Function to maintain client <-> server connection
    function sendJSON($data, $statusCode = 200) {
        header("Content-Type: application/json");
        http_response_code($statusCode);
        $json = json_encode($data);
        echo $json;
        exit();
    }

    // Function to save to json files
    function saveToFile($file, $array) {
        $json = json_encode($array, JSON_PRETTY_PRINT);
        file_put_contents($file, $json);
    }

    // Function to retrieve the content in a json file
    function getFileContents($filename) {
        $json = file_get_contents($filename);
        return json_decode($json, true); 
    }
?>