<?php 
require_once("config.php");
$patientid  = $_REQUEST["pid"];
$firstname  = $_REQUEST["fna"];
$lastname   = $_REQUEST["lna"];
$address    = $_REQUEST["add"];
$email      = $_REQUEST["email"];
$phone      = $_REQUEST["ph"];
$active     = $_REQUEST["active"];

if(!empty($patientid)) {

  //http://localhost/FamilyDental/services/updateUser.php?pid=1&fna=rrrr&lna=ewe&add=sagar&email=r@yahoo.com&ph=9349-44534-0&active=1
	$updatePatient = "UPDATE PatientDetails set firstname='".$firstname."', lastname='".$lastname."', address='".$address."', email='".$email."', phone='".$phone."', active='".$active."', created_at='".date("Y-m-d H:i:s")."' WHERE patientid=".$patientid;
	//echo json_encode( $updatePatient );
  $rs = mysqli_query($conn, $updatePatient);
	$resp = array("success" => "1", "msg" => "Patient Information Updated Successfully.");
	echo json_encode( $resp );

} else {
	$resp = array("error" => "1" ,"errorMsg" => "Invalid Inputs", "msg" => "Invalid Inputs");
  //$resp = array("error" => "1" ,"errorMsg" => .$updatePatient, "msg" => .$updatePatient);
	echo json_encode( $resp );

}

exit;
?>