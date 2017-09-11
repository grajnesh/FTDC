<?php 
require_once("config.php");

  //$patientId = $_REQUEST["pid"];
  //$selectPatient = "SELECT * FROM PatientDetails WHERE patientId=".$patientId. " order by created_at desc";

  $selectPatient = "SELECT * FROM PatientDetails order by created_at desc";
 
  //Patient Info
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
    
      $resp = array("success" => "1" , "rowCount"=> $rowcountPatient, "patientList" => $dataPatient);
		  echo json_encode( $resp );

exit;

?>