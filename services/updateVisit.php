<?php 
require_once("config.php");
$patientid      = $_REQUEST["pid"];
$visitid        = $_REQUEST["vid"];
$visitdesc      = $_REQUEST["vdesc"];
$visitcost      = $_REQUEST["vcost"];
$visitdate		= $_REQUEST["vdate"];

if(!empty($patientid)) {

  //http://localhost/FamilyDental/services/updateVisit.php?pid=1&vid=1&vdesc=RRR&vdate='2017-09-01 22:00:00'&vcost=101.1
	$updatePatient = "UPDATE VisitDetails set visitdesc='".$visitdesc."',visitcost='".$visitcost."', visitdate='".$visitdate."', created_at='".date("Y-m-d H:i:s")."' WHERE patientid=".$patientid. " AND visitId =" .$visitid;
  
  //echo json_encode( $updatePatient );
  
	$rs = mysqli_query($conn, $updatePatient);
	$resp = array("success" => "1", "msg" => "Visit Information Updated Successfully.");
	echo json_encode( $resp );

} else {
	$resp = array("error" => "1" ,"errorMsg" => "Invalid Inputs", "msg" => "Invalid Inputs");
  //$resp = array("error" => "1" ,"errorMsg" => .$updatePatient, "msg" => .$updatePatient);
	echo json_encode( $resp );

}

exit;
?>