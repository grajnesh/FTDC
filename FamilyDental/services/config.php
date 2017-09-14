<?php 
  error_reporting(0);
  $dbhost = 'familydentaldb.mysql.database.azure.com';
  $dbuser = 'familydental@familydentaldb';
  $dbpass = 'dental12#';
  $dbname =  'ftdc';
  $conn = mysqli_connect($dbhost, $dbuser, $dbpass,$dbname);
  
  if (mysqli_connect_errno())
  {
    echo "Failed to connect to MySQL: " . mysqli_connect_error();
  }    
  //mysqli_close($conn);
?> 