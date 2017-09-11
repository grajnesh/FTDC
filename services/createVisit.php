<?php 
require_once("config.php");
$patientid	  = $_REQUEST["pid"];
$visitdesc	  = $_REQUEST["vdesc"];
$visitcost		= $_REQUEST["vcost"];
$visitdate		= $_REQUEST["vdate"];
try{
	$insertVisit = "INSERT INTO VisitDetails 
                      (PatientId,
                        VisitDesc,
                        VisitCost,
                         VisitDate,
                        Created_at 
                      ) VALUES  
                      ('".$patientid."', 
                      '".$visitdesc."',
                      '".$visitcost."',
                      '".$visitdate."',
                      '".date("Y-m-d H:i:s")."'
                      )";
  
  //echo 'sql ->' . $insertVisit;
  
  mysqli_query($conn, $insertVisit);
  $visitid =  mysqli_insert_id($conn);
  
  //echo 'New Record has id---' . mysqli_insert_id($conn);
  $resp = array("success" => "1", "visitid" => $visitid, "msg" => "Visit Information Saved Successfully.");
	echo json_encode( $resp );
  exit;
 } 
  catch(Exception $e) {
  //mysqli_rollback($conn);
  echo 'Message: ' .$e->getMessage();
}

?>