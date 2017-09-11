<?php 
require_once("config.php");
$firstname	  = $_REQUEST["fna"];
$lastname	    = $_REQUEST["lna"];
$address	    = $_REQUEST["add"];
$email	      = $_REQUEST["email"];
$phone		    = $_REQUEST["ph"];
$active		    = $_REQUEST["active"];
$actualcomplain	= $_REQUEST["com"];
$diagnosis		  = $_REQUEST["dia"];
$treatment		  = $_REQUEST["treat"];

try{
	$insertPatient = "INSERT INTO PatientDetails 
                      (FirstName,
                        LastName,
                        Address,
                        Email,
                        Phone,
                        Active,
                        Created_at 
                      ) VALUES  
                      ('".$firstname."', 
                      '".$lastname."',
                      '".$address."',
                      '".$email."', 
                      '".$phone."',
                      '".$active."', 
                      '".date("Y-m-d H:i:s")."'
                      )";
  
  
    mysqli_begin_transaction($conn, "My Transaction");
    mysqli_query($conn, $insertPatient);
    $patientid =  mysqli_insert_id($conn);
 
  //echo 'New Record has id---' . mysqli_insert_id($conn);
    
  $insertComplain= "INSERT INTO ComplainDetails (
                  patientid,
                  actualcomplain,
                  diagnosis,
                  treatment,
                  Created_at) 
                  VALUES  
                  ('".$patientid."',
                  '".$actualcomplain."', 
                  '".$diagnosis."',
                  '".$treatment."', 
                  '".date("Y-m-d H:i:s")."'
                  )";
                  
	mysqli_query($conn, $insertComplain);
  
 // echo 'com-' .$insertComplain;
  
  mysqli_commit($conn);
  mysqli_close($conn);   
 
	$resp = array("success" => "1", "patientid" => $patientid ,"msg" => "Patient Information Added Successfully. Now Add Patient Visit Details one by one.");
	echo json_encode( $resp );
  
	exit;
 } 
  catch(Exception $e) {
  mysqli_rollback($conn);
  echo 'Message: ' .$e->getMessage();
}

?>