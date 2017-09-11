<?php 
require_once("config.php");
$patientid      = $_REQUEST["pid"];
$actualcomplain = $_REQUEST["com"];
$diagnosis      = $_REQUEST["dia"];
$treatment      = $_REQUEST["treat"];
try{
	$insertComplain = "INSERT INTO ComplainDetails 
                      (PatientId,
                        actualcomplain,
                        diagnosis,
                        treatment,
                        Created_at 
                      ) VALUES  
                      ('".$patientid."', 
                      '".$actualcomplain."',
                      '".$diagnosis."',
                      '".$treatment."',
                      '".date("Y-m-d H:i:s")."'
                      )";
  
  //echo 'sql ->' . $insertComplain;
  
  mysqli_query($conn, $insertComplain);
  $complainid =  mysqli_insert_id($conn);
  
  //echo 'New Record has id---' . mysqli_insert_id($conn);
  $resp = array("success" => "1", "visitid" => $complainid, "msg" => "Complain Information Saved Successfully.");
	echo json_encode( $resp );
  exit;
 } 
  catch(Exception $e) {
  //mysqli_rollback($conn);
  echo 'Message: ' .$e->getMessage();
}

?>