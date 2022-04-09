<?php
   include 'includes/db-connect.php';

    // setting up my select query
    $sql = "SELECT * FROM distancetravelled";

    if(!$conn ) {
      die('Could not connect: ' . mysqli_error());
    }
    $result = $conn->query($sql);
  
    if (!empty($result) && $result->num_rows > 0) {
  
    $arr=array();
  
    // output data from each row of the database into each row of the table
    while($row = $result->fetch_assoc()) {
  
      $date=$row["Day"];
      $distance=$row["Distance"];
  
      $day =strtotime($date);
  
      $insert = array($day,$distance);
  
      $arr[] = $insert; 
  
      }
    }
  if($_SERVER["REQUEST_METHOD"] == "POST"){

  //user's selection
  $time = $_POST["time"];

  //====================== CALCULATE WEEKLY ==================================


  // 1) Weekly array
  $weekly=array();

  // 2) add up the first set of weeks (x day to Saturday)
  $total_otw=0;
  $i=0;
  do {

    $total_otw = $arr[$i][1]+$total_otw;

    $dayOfWeek = date("l", $arr[$i][0]);

    $i++;
  } while($dayOfWeek!="Saturday");

  //Store into array
  $insert=array("['w1',".$total_otw."]");
  $weekly[]=$insert;

  // # of days for w1 (need to for last week calc.)
  $w1 = $i;

  $k=0;

  //3. add up any middle week (if total days > 7, while )
  if((sizeof($arr)-$i)>7){

    //calculate how many times we should run next step
    $times = intval((sizeof($arr)-$i)/7);

    for(;$k<$times;$k++){
      $total_otw=0;
      for($j=$i;$j<($i+7);$j++){
        $total_otw = $arr[$j][1]+$total_otw;
      }
      $i=$j;

      //Store into DB
      $insert=array("['w".($k+2)."',".$total_otw."]");
      $weekly[]=$insert;

    }
  }

  // 4) add up last week
  $total_otw=0;

  while($i<sizeof($arr)){
    $total_otw = $arr[$i][1]+$total_otw;
    $dayOfWeek = date("l", $arr[$i][0]);
    $i++;
  }

  //Store into DB
  $insert=array("['w".($k+2)."',".$total_otw."]");
  $weekly[]=$insert; 



   //====================== CALCULATE MONTHLY ==================================
    $monthly=array();

    $total_of_the_month=0;
  
    //calculate how many time we should run this step.
    $times=(intval(sizeof($arr)/30)+1);
  
    $j=0;
  
    for($i=0;$i<$times;$i++){
  
      $total_of_the_month=0;
     
      do{
        $total_of_the_month = $arr[$j][1]+$total_of_the_month;
  
        if($j>=sizeof($arr)-1){
          break;
        }
  
        $j++;
  
        $nDay=date("d",$arr[$j][0]);
  
      }while($nDay!=1);
  
      //Store into DB
      $insert=array("['m".($i+1)."',".$total_of_the_month."]");
      $monthly[]=$insert;
  
    }

    if($time=="monthly"){
      $diplay=$monthly;
    }
    else{
      $display=$weekly;
    }

    header("Location:distance_travelled.php");
  }
?>