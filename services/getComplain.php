<?php 

require_once("config.php");

$patientId = $_REQUEST["pid"];

  $selectComplain = "SELECT * FROM ComplainDetails WHERE patientid=".$patientId. " order by created_at desc";
// $selectComplain = "SELECT * FROM ComplainDetails order by created_at desc";
  //echo "select -" .$selectComplain;

  //Compialn Info
  $rsComplain = mysqli_query($conn, $selectComplain);
  $rowcountComplain=mysqli_num_rows($rsComplain);
   
    while($list = mysqli_fetch_assoc($rsComplain)){
		$dataComplain[] = array('id'=> $list['ComplainId'],
                            'patientid'=> $list['PatientId'], 
                            'actualcomplain'=> $list['ActualComplain'], 
                            'diagnosis'=> $list['Diagnosis'], 
                            'treatment'=> $list['Treatment'], 
                            'created_at'=> $list['Created_at']
                            );}
  
    
    $resp = array("success" => "1" , "rowCount"=> $rowcountComplain, "complainList" => $dataComplain);
		echo json_encode( $resp );
exit;

?>