<?php 
require_once("config.php");
try
{
    $selectPatient = "SELECT * FROM PatientDetails order by created_at;";
    $selectComplain = "SELECT * FROM ComplainDetails order by created_at;";
    $selectVisit = "SELECT * FROM VisitDetails order by created_at;";
    $rsPatient = mysqli_query($conn, $selectPatient);
    $rowcountPatient=mysqli_num_rows($rsPatient);
    
    while($list = mysqli_fetch_assoc($rsPatient)){
	    $dataPatient[] = array('id'=> $list['PatientId'],
                            'firstname'=> $list['FirstName'], 
                            'lastname'=> $list['LastName'], 
                            'address'=> $list['Address'], 
                            'email'=> $list['Email'], 
                            'phone'=> $list['Phone'], 
                            'active'=> $list['Active'] , 
                            'created_at'=> $list['Created_at']
                            );}
                            
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
                            
    $rsVisit = mysqli_query($conn, $selectVisit);
    $rowcountVisit=mysqli_num_rows($rsVisit);
    while($list = mysqli_fetch_assoc($rsVisit)){
	  $dataVisit[] = array('id'=> $list['VisitId'],
                            'patientid'=> $list['PatientId'], 
                            'visitdesc'=> $list['VisitDesc'], 
                            'visitcost'=> $list['VisitCost'], 
                            'created_at'=> $list['Created_at']
                            );}
                            
    //$resp = array("data" => array("success" => "1" , "rowCount"=> $rowcount, "data" => $data) );
    $resp = array("success" => "1" , "rowCount"=> $rowcount, "patientList" => $dataPatient, "patientComplain" => $dataComplain, "patientvistit" => $dataVisit);
    //header('Content-Type: application/json');
    echo json_encode( $resp );
    exit;
}
catch(Exception $e) {
  echo 'Message: ' .$e->getMessage();
}

?>