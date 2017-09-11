<?php 
  error_reporting(0);
  $dbhost = 'localhost';
  $dbuser = 'root';
  $dbpass = 'pwd';
  $dbname =  'fcdb';
  $conn = mysqli_connect($dbhost, $dbuser, $dbpass,$dbname);
  
  if (mysqli_connect_errno())
  {
    echo "Failed to connect to MySQL: " . mysqli_connect_error();
  }    
  //mysqli_close($conn);
?> 