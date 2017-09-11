<?php 
require_once("config.php");
$complainid = $_REQUEST["cid"];

try
{
  if(!empty($complainid)) 
  {
  	$delComplain = "DELETE FROM ComplainDetails where complainid=".$complainid;
    mysqli_query($conn, $delComplain);
    $resp = array("success" => "1", "msg" => "Complain Info Deleted Successfully.");
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