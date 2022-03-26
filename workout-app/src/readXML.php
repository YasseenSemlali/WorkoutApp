<?php

function create_workout($path){
    $xml = simplexml_load_file($path);

    return json_encode($xml);
}

function display_workouts(...$paths){
    foreach($paths as $path){
        echo nl2br(create_workout($path)."\n");
    }
}

display_workouts("../COMP354DATA.xml",
                "../COMP354DATA2.xml",
                "../COMP354DATA3.xml");
?>