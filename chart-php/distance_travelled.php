<?php
 
   $jsondata=file_get_contents("stats.json");
   $json=json_decode($jsondata,true);

   foreach($json as $days){
    $date=$days['startTime'];
    $distance=$days['distance'];

    $day=strtotime($date);

    $insert = array($day,$distance);

    $arr[] = $insert; 

    }
 

  //====================== CALCULATE WEEKLY ==================================

  $weekly=array();

  $i=0;
  $total_otw=0;

  for($i=0;$i<sizeof($arr);$i++){
    $total_otw+=$arr[$i][1];

    $dayOfWeek= date("l", $arr[$i][0]);

    if(($i+1)!=sizeof($arr)){
      $nextDay= date("l", $arr[$i+1][0]);
    }else{$nextDay= date("l", $arr[$i][0]);}

    $thisMonth=date("m",$arr[$i][0]);
    $thisYear=date("y",$arr[$i][0]);

    //check if next day is not beyond sunday
    if($dayOfWeek>=$nextDay){
      $insert=array("['w".($i+1)."',".$total_otw."]");
      $weekly[]=$insert; 
      $total_otw=0;
      continue;
    }

    //Check if the next entry is in the same month and year
    if(($i+1)!=sizeof($arr)){
      $nextMonth=date("m",$arr[$i+1][0]);
      $nextYear=date("y",$arr[$i+1][0]);

      if($thisMonth!=$nextMonth || $thisYear!=$nextYear){
        $insert=array("['w".($i+1)."',".$total_otw."]");
        $weekly[]=$insert; 
        $total_otw=0;
        continue;
      }
    }

  }
  //====================== CALCULATE MONTHLY ==================================
    $monthly=array();
    
    $times=0;

    for($i=0;$i<sizeof($arr);$i++){

      $thisMonth=date("m",$arr[$i][0]);
      $thisYear=date("y",$arr[$i][0]);

      if(($i+1)!=sizeof($arr)){
        $nextMonth=date("m",$arr[$i+1][0]);
        $nextYear=date("y",$arr[$i+1][0]);

        if($thisMonth!=$nextMonth || $thisYear!=$nextYear){
          $times++;
        }
      }
    }
    $times++;

    $j=0;
  
    for($i=0;$i<$times;$i++){
  
      $total_of_the_month=0;
     
      $continue=true;

      $thisMonth=date("m",$arr[$i][0]);
      $thisYear=date("y",$arr[$i][0]);

      //loop through the month
      do{
        $total_of_the_month = $arr[$j][1]+$total_of_the_month;
  
        if($j>=sizeof($arr)-1){
          break;
        }
        $j++;
        //$nDay=date("d",$arr[$j][0]);

        if(($j)!=sizeof($arr)){
          $nextMonth=date("m",$arr[$j][0]);
          $nextYear=date("y",$arr[$j][0]);
        
          if($thisMonth!=$nextMonth || $thisYear!=$nextYear){
            $continue=false;
          }
        }

      }while($continue==true);
  
      //Store into DB
      $insert=array("['m".($i+1)."',".$total_of_the_month."]");
      $monthly[]=$insert;
  
    }

    if($times==0){
      $insert=array("['No stats',0]");
      $monthly[]=$insert;
    }

   //====================== CALCULATE YEARLY ==================================
    $yearly=array();

    $times=0;

    for($i=0;$i<sizeof($arr);$i++){

      $thisYear=date("y",$arr[$i][0]);

      if(($i+1)!=sizeof($arr)){
        $nextYear=date("y",$arr[$i+1][0]);

        if($thisYear!=$nextYear){
          $times++;
        }
      }
    }
    $times++;
    $j=0;

    for($i=0;$i<$times;$i++){
      $total_of_the_year=0;

      $currentYear=date("y",$arr[$j][0]);

      do{
        $total_of_the_year = $arr[$j][1]+$total_of_the_year;
  
        if($j>=sizeof($arr)-1){
          break;
        }
  
        $j++;
  
        $thisYear=date("y",$arr[$j][0]);
  
      }while($thisYear==$currentYear);
  
      //Store into DB
      $insert=array("['20".$currentYear."',".$total_of_the_year."]");
      $yearly[]=$insert;

    }
  
    if($times==0){
      $insert=array("['No stats',0]");
      $yearly[]=$insert;
    }

  //searches for user selection  
  if(isset($_POST["submit"])){

    $time=$_POST["time"];

    if($time=="weekly"){
      $display=$weekly;
    }
    else if($time=="monthly"){
      $display=$monthly;
    }
    else if($time=="yearly"){
      $display=$yearly;
    }
  }
  else{
    $display=$weekly;
  }
?>

<script type="text/javascript" src="https://www.gstatic.com/charts/loader.js"></script>
  <script type="text/javascript">
    google.charts.load("current", {packages:['corechart']});
    google.charts.setOnLoadCallback(drawChart);
    function drawChart() {
      var data = google.visualization.arrayToDataTable([
        ["Day", "Distance (KM)"]
        <?php
        for($i=0;$i<sizeof($display);$i++){
          foreach($display[$i] as $entry) {
            echo ",".$entry;
          }
        }
        ?>
      ]);

      var view = new google.visualization.DataView(data);

      var options = {
        title: "Distance Travelled, in km",
        width: 600,
        height: 400,
        bar: {groupWidth: "95%"},
        legend: { position: "none" },
      };
      var chart = new google.visualization.ColumnChart(document.getElementById("columnchart_values"));
      chart.draw(view, options);
  }
  </script>


  <section id="wrapper">

    <div id="buttons">
    <form method="POST" action="<?php echo $_SERVER['PHP_SELF']; ?>">
      <select name="time" id="time">
        <option value="weekly" name="weekly">Weekly</option>
        <option value="monthly" name="monthly">Monthly</option>
        <option value="yearly" name="yearly">Yearly</option>
      </select>
      <button type="submit" name="submit">GENERATE</button>
      </form>
    </div>
    <div id="columnchart_values"></div>
  </section>
