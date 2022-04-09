<?php
  include 'includes/header.php';
?>

<!-- !PAGE CONTENT! -->
<div class="w3-main" style="margin-left:250px">

  <!-- Push down content on small screens -->
  <div class="w3-hide-large" style="margin-top:83px"></div>

  <!-- Image header -->
  <div class="w3-display-container w3-container">
    <div id='chart' class='chart'></div>
  </div>

  <!-- End page content -->
</div>

</body>

<script src='https://cdn.plot.ly/plotly-latest.min.js'></script>

<script type='text/javascript'>
  var graphs = {{graphJSON | safe}};
  Plotly.plot('chart',graphs,{});
</script>

</html>