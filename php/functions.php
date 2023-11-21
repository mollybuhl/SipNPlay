<?php 
    function sendJSON($data, $statusCode = 200) {
        header("Content-Type: application/json");
        http_response_code($statusCode);
        $json = json_encode($data);
        echo $json;
        exit();
    }

    function saveToFile($file, $array) {
        $json = json_encode($array, JSON_PRETTY_PRINT);
        file_put_contents($file, $json);
    }

    function getFileContents($filename) {
        $json = file_get_contents($filename);
        return json_decode($json, true); 
    }
?>