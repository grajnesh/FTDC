<?php 
require_once("config.php");
$patientid      = $_REQUEST["pid"];
$complainid     = $_REQUEST["cid"];
$actualcomplain = $_REQUEST["com"];
$diagnosis      = $_REQUEST["dia"];
$treat          = $_REQUEST["treat"];

if(!empty($patientid)) {

  //http://localhost/FamilyDental/services/updateComplain.php?pid=1&cid=1&com=RRR&dia=DDDDD&treat=TTTTT
	$updateComplain = "UPDATE ComplainDetails set actualcomplain='".$actualcomplain."',diagnosis='".$diagnosis."',treatment='".$treat."',created_at='".date("Y-m-d H:i:s")."' WHERE patientid=".$patientid. " AND complainId =" .$complainid;
  
  //echo json_encode( $updateComplain );
  
	$rs = mysqli_query($conn, $updateComplain);
	$resp = array("success" => "1", "msg" => "Complain Information Updated Successfully.");
	echo json_encode( $resp );

} else {
	$resp = array("error" => "1" ,"errorMsg" => "Invalid Inputs", "msg" => "Invalid Inputs");
  //$resp = array("error" => "1" ,"errorMsg" => .$updateComplain, "msg" => .$updateComplain);
	echo json_encode( $resp );

}

exit;
?>