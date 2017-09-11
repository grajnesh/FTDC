var Addapp = angular.module("addApp", []);
//var serviceUrl = "http://localhost/FamilyDental/services/";

Addapp.controller("addController", function ($scope, $http) {
    debugger;
    $scope.PatientAddContainer = true;
    $scope.VisitAddContainer = true;
 
	//// Hide Add User Form
	//$scope.addUser = function () {
	//    //ClearPatientFields();
	//	$scope.Action = "Add";
	//	$scope.PatientAddContainer = true;	
	//}

    //Add Update Action 
	$scope.AddPatient = function () {
	    //ClearPatientFields();
	    $scope.Action = "Add";

	    if ($scope.firstname.length == 0) {
	        alert("Patient first name is required.");
	    }
	    else {
	        var user = {
	            //pid: $scope.patientid,
	            //cid: $scope.complainid,
	            fna: $scope.firstname,
	            lna: $scope.lastname,
	            add: $scope.address,
	            email: $scope.email,
	            ph: $scope.phone,
	            active: (($scope.UserActive) ? "1" : "0"),
	            com: $scope.actualcomplain,
	            dia: $scope.diagnosis,
	            treat: $scope.treatment
	        };
	        var getUserAction = $scope.Action;

	        //http://localhost/FamilyDental/services/createuser.php?fna=1&lna=2&add=3&email=4&ph=5&active=1&com=6&dia=7&treat=8

	        if (getUserAction == "Add") {
	            //Add Use Code Come Here
	            var addUserData = $http({
	                method: "POST",
	                url: serviceUrl + "createUser.php",
	                params: user
	            });

	            addUserData.then(function (response) {
	                var msg = response.data.msg;
	                $scope.patientid = response.data.patientid;
	                alert(msg);
	                $scope.PatientAddContainer = false;
	            }, function () {
	                alert('Error in adding User record');
	            });
	        }
	    }
	}

    //Add Update Action 
	$scope.AddVisit = function () {
	    //ClearVisitFields();
	    $scope.Action = "Add";
	    var user = {
	        pid: $scope.patientid,
	        vdesc: $scope.visitdesc,
	        vcost: $scope.visitcost	        
	    };
	    var getUserAction = $scope.Action;

	    //http://localhost/FamilyDental/services/createvisit.php?pid=1&vdesc=2&vcost=3

	    if (getUserAction == "Add") {
	        //Add Use Code Come Here
	        var addUserData = $http({
	            method: "POST",
	            url: serviceUrl + "createVisit.php",
	            params: user
	        });

	        addUserData.then(function (response) {
	            var msg = response.data.msg;
	            $scope.visitid = parseInt(response.data.visitid)+1;
	            alert(msg);
	            ClearVisitFields();	            
	        }, function () {
	            alert('Error in adding User record');
	        });
	    }
	}

	function ClearPatientFields() {
	    $scope.patientid = "";
	    $scope.complainid = "";
        $scope.firstname = "";
        $scope.lastname = "";
        $scope.address = "";
        $scope.email = "";
        $scope.phone = "";
        $scope.UserActive = "";
        $scope.actualcomplain = "";
        $scope.diagnosis = "";
        $scope.treatment = "";
	}
	function ClearVisitFields() {
	  	$scope.visitdesc = "";
	    $scope.visitcost = "";	 
	}
	
	// Hide Add / Update User Form
	$scope.closeAddBtn = function () {
	    $scope.PatientAddContainer = false;
	}
	$scope.closeVisitBtn = function () {
	    $scope.VisitAddContainer = false;
	}

	$scope.CancelPatient = function () {
	    ClearPatientFields();
	}
	$scope.CancelVisit = function () {
	    ClearVisitFields();
	}    
	$scope.sort = function(keyname){
        $scope.sortKey = keyname;   //set the sortKey to the param passed
        $scope.reverse = !$scope.reverse; //if true make it false and vice versa
    }

	$scope.activeChange = function() {
		$scope.search.active = ( ($scope.uActive) ? "1" : "0" );
	};	
	
	$scope.reset = function(){
		$scope.search = '';
	};

	$scope.Home = function () {
	    window.location.href = pageUrl + "index.html";
	};

	$scope.viewPatientDetails = function () {
	    window.location.href = pageUrl + "viewpatient.html";
	};

});