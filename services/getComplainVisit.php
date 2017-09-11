<?php 
require_once("config.php");
$patientId = $_REQUEST["pid"];

if(!empty($patientId)) {	
  $selectComplain = "SELECT * FROM ComplainDetails WHERE patientid=".$patientId;
  $selectVisit = "SELECT * FROM VisitDetails WHERE patientid=".$patientId;
  //echo 'visit->' .$selectVisit;
  
  //Compialn Info
  $rsComplain = mysqli_query($conn, $selectComplain);
  $rowcountComplain=mysqli_num_rows($rsComplain);
  
    //$list = mysqli_fetch_assoc($rsComplain);
     while($list = mysqli_fetch_assoc($rsComplain)){
		  $dataComplain[] = array('id'=> $list['ComplainId'],
                            'patientid'=> $list['PatientId'], 
                            'actualcomplain'=> $list['ActualComplain'], 
                            'diagnosis'=> $list['Diagnosis'], 
                            'treatment'=> $list['Treatment'], 
                            'created_at'=> $list['Created_at']
                            );
                        }
  //Visit Info
  $rsVisit = mysqli_query($conn, $selectVisit);
  $rowcountVisit=mysqli_num_rows($rsVisit);

  //$list = mysqli_fetch_assoc($rsVisit);  
  while($list = mysqli_fetch_assoc($rsVisit)){
	$dataVisit[] = array('id'=> $list['VisitId'],
                            'patientid'=> $list['PatientId'], 
                            'visitdesc'=> $list['VisitDesc'], 
                            'visitcost'=> $list['VisitCost'], 
                            'visitdate'=> $list['VisitDate'],
                            'created_at'=> $list['Created_at']
                            );
                        }
    
    $resp = array("success" => "1" , "errorMsg" => "Data Found", "complainList" => $dataComplain,"visitList" => $dataVisit);
		echo json_encode( $resp );
	}

exit;

?>