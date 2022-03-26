<?php

function create_workout($path){
    $xml = simplexml_load_file($path);

    $json = json_encode($xml);
    return json_decode($json);
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
                            "Database/COMP354DATA3.xml");

echo $workouts;
?>