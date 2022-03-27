<?php

function create_workout($path){

    if(is_file($path)){
        $xml = simplexml_load_file($path);
    } elseif(is_string($path)){
        $xml = simplexml_load_string($path);
    } else{
        return false;
    }

    $json = json_encode($xml);
    $workout = json_decode($json);
    
    $id = (int)$workout->{'id'};
    $distance = (int)$workout->{'distance'};
    $avgSpeed = (double)$workout->{'avgSpeed'};
    $totalTime = (int)$workout->{'totalTime'}; 
    $maxAlt = (double)$workout->{'maxAlt'};
    $calsBurned = (int)$workout->{'calsBurned'};
    
    $workout->{'id'}=$id;
    $workout->{'distance'}=$distance;  
    $workout->{'avgSpeed'}=$avgSpeed;
    $workout->{'maxAlt'}=$maxAlt;
    $workout->{'totalTime'}=$totalTime;
    $workout->{'calsBurned'}=$calsBurned;

    return $workout;
}

function display_workouts(...$paths){
    $workouts = array();
    foreach($paths as $path){
        array_push($workouts, create_workout($path));
    }
    return json_encode($workouts);
}

$workouts = display_workouts("Database/COMP354DATA.xml",
                             "Database/COMP354DATA2.xml",
                             "Database/COMP354DATA3.xml",
                             "Database/COMP354DATA4.xml");

echo $workouts;
?>