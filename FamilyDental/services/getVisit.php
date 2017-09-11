<?php 

require_once("config.php");
$patientId = $_REQUEST["pid"];

  $selectVisit = "SELECT * FROM VisitDetails WHERE patientid=".$patientId. " order by created_at desc";
  //$selectVisit = "SELECT * FROM VisitDetails order by created_at desc";
  
  //Visit Info
  $rsVisit = mysqli_query($conn, $selectVisit);
  $rowcountVisit=mysqli_num_rows($rsVisit);
  
    while($list = mysqli_fetch_assoc($rsVisit)){
		$dataVisit[] = array('id'=> $list['VisitId'],
                            'patientid'=> $list['PatientId'], 
                            'visitdesc'=> $list['VisitDesc'], 
                            'visitcost'=> $list['VisitCost'], 
                            'visitdate'=> $list['VisitDate'], 
                            'created_at'=> $list['Created_at']
                            );}
    
    $resp = array("success" => "1" , "rowCount"=> $rowcountVisit, "visitList" => $dataVisit);
		echo json_encode( $resp );

exit;

?>