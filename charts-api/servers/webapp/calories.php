<?php

  include 'header.php';

  $db_servername="localhost";
  $db_username="root";
  $db_password="";
  $db_name="test";

  $conn=mysqli_connect($db_servername,$db_username,$db_password,$db_name);

  // setting up my select query
  $sql = "SELECT * FROM calsBurnt";

  if(!$conn ) {
    die('Could not connect: ' . mysqli_error());
 }
  $result = $conn->query($sql);

 if (!empty($result) && $result->num_rows > 0) {

  $arr=array();

  // output data from each row of the database into each row of the table
  while($row = $result->fetch_assoc()) {

    $date=$row["Day"];
    $calories =$row["Calories"];

    $date =strtotime($date);
    $day = date('d F Y', $date);

    $insert=array("['".$day."',".$calories."]");

    $arr[] = $insert; 

    }
  }


?>

<script type="text/javascript" src="https://www.gstatic.com/charts/loader.js"></script>
  <script type="text/javascript">
    google.charts.load("current", {packages:['corechart']});
    google.charts.setOnLoadCallback(drawChart);
    function drawChart() {
      var data = google.visualization.arrayToDataTable([
        ["Day", "Calories"]
        <?php
        for($i=0;$i<sizeof($arr);$i++){
          foreach($arr[$i] as $entry) {
            echo ",".$entry;
          }
        }
        ?>
      ]);

      var view = new google.visualization.DataView(data);

      var options = {
        title: "Calories Burnt",
        width: 600,
        height: 400,
        bar: {groupWidth: "95%"},
        legend: { position: "none" },
      };
      var chart = new google.visualization.ColumnChart(document.getElementById("columnchart_values"));
      chart.draw(view, options);
  }
  </script>








<!DOCTYPE html>
<html>
<head>
<title>CHARTS</title>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css">
<link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto">
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
<style>
    .w3-sidebar a {font-family: "Roboto", sans-serif}
    body,h1,h2,h3,h4,h5,h6,.w3-wide {font-family: "Roboto", sans-serif;}
</style>
</head>
<body class="w3-content" style="max-width:1200px">

<!-- Sidebar/menu -->
<nav class="w3-sidebar w3-bar-block w3-white w3-collapse w3-top" style="z-index:3;width:250px" id="mySidebar">
  <div class="w3-container w3-display-container w3-padding-16">
    <i onclick="w3_close()" class="fa fa-remove w3-hide-large w3-button w3-display-topright"></i>
    <h3 class="w3-wide"><b>CHARTS</b></h3>
  </div>
  <div class="w3-padding-64 w3-large w3-text-grey" style="font-weight:bold">
    <a href="#" class="w3-bar-item w3-button">CALORIES</a>
    <a href="#" class="w3-bar-item w3-button">ELEVATION/RISE INTENSITY</a>
    <a href="#" class="w3-bar-item w3-button">DISTANCE TRAVELLED</a>
    <a href="activity_recap" class="w3-bar-item w3-button">ACTIVITY RECAP</a>
    <a href="moving_avg" class="w3-bar-item w3-button">MOVING AVERAGE</a>
  </div>
</nav>

<!-- Top menu on small screens -->
<header class="w3-bar w3-top w3-hide-large w3-grey w3-xlarge">
  <div class="w3-bar-item w3-padding-24 w3-wide">CHARTS</div>
  <a href="javascript:void(0)" class="w3-bar-item w3-button w3-padding-24 w3-right" onclick="w3_open()"><i class="fa fa-bars"></i></a>
</header>

<!-- Overlay effect when opening sidebar on small screens -->
<div class="w3-overlay w3-hide-large" onclick="w3_close()" style="cursor:pointer" title="close side menu" id="myOverlay"></div>

<!-- !PAGE CONTENT! -->
<div class="w3-main" style="margin-left:250px;">

  <!-- Push down content on small screens -->
  <div class="w3-hide-large" style="margin-top:83px"></div>

  <!-- Image header -->
  <div class="w3-display-container w3-container">
    <!-- <div id='chart' class='chart'></div> -->
  </div>

  <div id="columnchart_values" style="width: 900px; height: 300px;"></div>

  <!-- End page content -->
</div>

</body>


</html> 