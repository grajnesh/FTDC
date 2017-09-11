<?php 
require_once("config.php");
$visitid = $_REQUEST["vid"];

try
{

  if(!empty($visitid)) 
  {
  	$delVisit = "DELETE FROM VisitDetails where Visitid=".$visitid;
    mysqli_query($conn, $delVisit);
    $resp = array("success" => "1", "msg" => "Visit Info Deleted Successfully.");
	  echo json_encode( $resp );
} 
else 
{
	$resp = array("error" => "1" ,"errorMsg" => "Invalid Inputs","msg" => "Invalid Inputs");
	echo json_encode( $resp );
}
exit;
} 
catch(Exception $e) 
{
  mysqli_rollback($conn);
  echo 'Message: ' .$e->getMessage();
}
?>