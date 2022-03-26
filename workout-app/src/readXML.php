<?php

$xml = simplexml_load_file("../COMP354DATA.xml");

$jason = json_encode($xml);
$array = json_decode($jason, true);

print_r($jason);

// print_r($array);
echo "<br>";
echo $array ["distance"];
echo "<br>";
echo $array ['avgSpeed'];
echo "<br>";
echo $array ['totalTime'];
echo "<br>";
echo $array ['maxAlt'];
echo "<br>";
echo $array ['date'];
echo "<br>";
echo $array ['caloriesBurned'];
echo "<br>";
?>