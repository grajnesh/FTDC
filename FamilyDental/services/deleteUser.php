<?php 
require_once("config.php");
$patientid = $_REQUEST["pid"];

try
{
  if(!empty($patientid)) {
	$delPatient = "DELETE FROM PatientDetails where Patientid=".$patientid;
	$delComplain = "DELETE FROM ComplainDetails where Patientid=".$patientid;
	$delVisit = "DELETE FROM VisitDetails where Patientid=".$patientid;
    
  //echo 'P ->' .$delPatient;
  //echo 'C ->' .$delComplain;
  //echo 'V ->' .$delVisit;
  
  mysqli_begin_transaction($conn, "My Transaction");
  
  mysqli_query($conn, $delVisit);
  mysqli_query($conn, $delComplain);
  mysqli_query($conn, $delPatient);
 	
  mysqli_commit($conn);
  mysqli_close($conn);  
  
  $resp = array("success" => "1", "msg" => "Patient Info Deleted Successfully.");
	echo json_encode( $resp );

} else {
	$resp = array("error" => "1" ,"errorMsg" => "Invalid Inputs","msg" => "Invalid Inputs");
	echo json_encode( $resp );

}
exit;
 } 
  catch(Exception $e) {
  mysqli_rollback($conn);
  echo 'Message: ' .$e->getMessage();
}
?>