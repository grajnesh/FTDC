<?php 
require_once("config.php");
$firstname	  = $_REQUEST["fna"];
$lastname	    = $_REQUEST["lna"];
$address	    = $_REQUEST["add"];
$email	      = $_REQUEST["email"];
$phone		    = $_REQUEST["ph"];
$active		    = $_REQUEST["active"];

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
    mysqli_query($conn, $insertPatient);
    $patientid =  mysqli_insert_id($conn);
    
    //Dummy Complain Deatil
    $insertComplain= "INSERT INTO ComplainDetails (
                  patientid,
                  actualcomplain,
                  diagnosis,
                  treatment,
                  Created_at) 
                  VALUES  
                  ('".$patientid."',
                  '', 
                  '',
                  '', 
                  '".date("Y-m-d H:i:s")."'
                  )";              
                  
	// echo 'com-' .$insertComplain;
  mysqli_query($conn, $insertComplain);
  $Complainid = mysqli_insert_id($conn);
  
  $insertVisit = "INSERT INTO VisitDetails 
                      (PatientId,
                        VisitDesc,
                        VisitCost,
                        VisitDate,
                        Created_at 
                      ) VALUES  
                      ('".$patientid."', 
                      '',
                      '0',
                      null,
                      '".date("Y-m-d H:i:s")."'
                      )";
  
  //echo 'sql ->' . $insertVisit;
  mysqli_query($conn, $insertVisit);
  $visitid =  mysqli_insert_id($conn);
  
 // echo 'com-' .$insertComplain;
  //echo 'New Record has id---' . mysqli_insert_id($conn); 
 
	$resp = array("success" => "1", "patientid" => $patientid,"complainid" => $complainid,"visittid" => $visitid ,"msg" => "Patient Information Added Successfully.");
	echo json_encode( $resp );
  
	exit;
 } 
  catch(Exception $e) {
  echo 'Message: ' .$e->getMessage();
}

?>