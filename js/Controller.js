app.controller("crudController", function ($scope, crudService) {
    debugger;	
    $scope.PatientFormContainer = false;
    $scope.ComplainFormContainer = false;
    $scope.VisitFormContainer = false;
    $scope.ComplainVisitForm = false;
    $scope.PatientDetailContainer = true;
    $scope.PatientComContainer = true;
    $scope.PatientVisitContainer = true;    
    $scope.itemShowCount = ['5','10','20', '30','50','99'];
     $scope.date = new Date();
    //GetAllUsers(); 
    GetAllPatients();
    var globalPatientId;
    $scope.currentPage = 1;
    $scope.error = 'Error in getting users list';
    $scope.delete = 'Are you sure to delete it?';

    $scope.selectedRow = null;
    $scope.setClickedRow = function(index) {
		$scope.selectedRow = index;
    }

    $scope.alert = function (msg) {
        $("#error").html(msg);
        $('#myModal').modal("show");
    };

    $scope.alertError = function (msg) {
        $("#errorModel").html(msg);
        $('#myModalError').modal("show");
    };

    //$scope.alertConfirm = function (msg) {
    //    $("#errorConfirm").html(msg);
    //    $('#myModalConfirm').modal("show");       
    //};

    //$scope.ShowConfirm = function () {
    //    var dlg = null;
    //    alert("1");
    //    dlg = $dialogs.confirm('Please Confirm', 'Is this awesome or what?');
    //    dlg.result.then(function (btn) {
    //        $scope.confirmed = 'You thought this quite awesome!';
    //    }, function (btn) {
    //        $scope.confirmed = 'Shame on you for not thinking this is awesome!';
    //    });
        
    //};

    $scope.pageChangeHandler = function () {
        $scope.selectedRow = null;
        $scope.viewfirstname = "";
        $scope.ComplainFormContainer = false;
        $scope.VisitFormContainer = false;
        $scope.ComplainVisitForm = false;
        $scope.PatientComContainer = false;
        $scope.PatientVisitContainer = false;
    }
    //To Get all Patient list
    function GetAllPatients() {
        var getUserData = crudService.getPatient();
            getUserData.then(function (user) {
            $scope.users = user.data.patientList;
            //to select first item from ng-option list
            $scope.actItem = $scope.itemShowCount[0];
            $scope.selectPatient($scope.users[0], 0)
            $scope.selectedRow = 0;
	        
        }, function () {
            //alert('Error in getting users list');
            $scope.alertError($scope.error);
        });
    }
    //To Get all Complain list
    function GetAllComplains(pid) {
        var getUserData = crudService.getComplain(pid);
        getUserData.then(function (pid) {
            $scope.complains = pid.data.complainList;
            //$scope.actItem = $scope.itemShowCount[0];
        }, function () {
            //alert('Error in getting users list');
            $scope.alertError($scope.error);
        });
    }
    //To Get all Visit list
    function GetAllVisits(pid) {
        var getUserData = crudService.getVisit(pid);
        getUserData.then(function (pid) {
            $scope.visits = pid.data.visitList;
            //to select first item from ng-option list
            //$scope.actItem = $scope.itemShowCount[0];
        }, function () {
            //alert('Error in getting users list');
            $scope.alertError($scope.error);
        });
    }

    //Open Patient section for Add/Update
    $scope.editPatient = function (user,action) {
        //alert(action);
        $scope.user = {};  //ISSUE: ng-model no longer updates after typing into text input
        $scope.user.patientid = user.id
        $scope.user.firstname = user.firstname;
        $scope.user.lastname = user.lastname;
        $scope.user.address = user.address
        $scope.user.email = user.email;
        $scope.user.phone = user.phone;
        var isActive = (user.active == 1) ? true : false;
        $scope.user.UserActiveChecked = isActive;
        //$scope.user.Action = "Update";
        $scope.user.Action = action;
        $scope.PatientFormContainer = true;
        $scope.ComplainFormContainer = false;
        $scope.VisitFormContainer = false;
        if (action == "Add") {
            ClearPatientFields();
        }        
	}

    //Open Complain section for Add/Update 
    $scope.editComplain = function (user,action) {
        //alert(action);        
            $scope.user = {};  //ISSUE: ng-model no longer updates after typing into text input
            $scope.user.patientid = globalPatientId;
            //$scope.user = _user.data.patientComplain;
            $scope.user.complainid = user.id;
            // $scope.user.patientid = user.patientid
            $scope.user.actualcomplain = user.actualcomplain;
            $scope.user.diagnosis = user.diagnosis;
            $scope.user.treatment = user.treatment;
            $scope.user.Action = action;
            $scope.ComplainFormContainer = true;
            $scope.PatientFormContainer = false;
            $scope.VisitFormContainer = false;
            if (action == "Add") {
                ClearComplainFields();
        }
    }

    //Open Visit section for Add/Update
    $scope.editVisit = function (user,action) {
        //alert(action);
            $scope.user = {};  //ISSUE: ng-model no longer updates after typing into text input
            $scope.user.visitid = user.id
            $scope.user.patientid = globalPatientId; //user.patientid
            $scope.user.visitdesc = user.visitdesc;
            $scope.user.visitcost = user.visitcost;
            $scope.user.visitdate = user.visitdate;
            $scope.user.Action = action;
            $scope.VisitFormContainer = true;
            $scope.ComplainFormContainer = false;
            $scope.PatientFormContainer = false;
            if (action == "Add") {
                ClearVisitFields();
            }
    }

	function ClearFields() {
        $scope.UserId = "";
        $scope.UserFirstname = "";
        $scope.UserLastname = "";
        $scope.UserAddress = "";
        $scope.UserEmail = "";
        $scope.UserPhone = "";
        $scope.UserActive = "";
    }

    //Select Patient
	$scope.selectPatient = function (user, index) {
        $scope.selectedRow = index;
	    $scope.viewfirstname = user.firstname + " " + user.lastname;
	    globalPatientId = user.id;  // update patient id in global variable
	    $scope.ComplainVisitForm = true;
	    var getUserData = crudService.getComplainVisit(user.id);
	    getUserData.then(function (user) {
	        $scope.complains = user.data.complainList;
	        $scope.visits = user.data.visitList;
            $scope.PatientVisitContainer = true;
	        $scope.PatientComContainer = true;
	        $scope.ComplainFormContainer = false;  // Com Edit
	        $scope.VisitFormContainer = false;  //// Visit Edit
	    });
	};

    //Add-Updtate Patient Action 
	$scope.AddUpdateUser = function () {
	    //if ($scope.user.firstname == "" || $scope.user.firstname == 'undefined') {
	    if (!$scope.user.firstname) {
	        //alert("Patient first name is required.");
	        $scope.alertError('Patient first name is required.');
	    }
	    else {
	        var patient = {
	            fna: $scope.user.firstname,
	            lna: $scope.user.lastname,
	            add: $scope.user.address,
	            email: $scope.user.email,
	            ph: $scope.user.phone,
	            active: (($scope.user.UserActive) ? "1" : "0")
	        };
	        var getUserAction = $scope.user.Action;
	      
	        if (getUserAction == "Update") {
	            patient.pid = $scope.user.patientid;
	            var getUserData = crudService.updateUser(patient);
	            //alert("Pat- update");
	            getUserData.then(function (response) {
	                var msg = response.data.msg;
	                //alert(msg);
	                $scope.alert(msg);	                
	                $scope.PatientFormContainer = false;
	                GetAllPatients();
	            }, function () {
	                //alert('Error in updating User record');
                     $scope.alertError($scope.error);
	            });

	        } else {
	            //Add Use Code Come Here
	            AddPatient(patient);
	        }	       
	    }
	}

    //Add-Updtate Complain Action 
	$scope.AddUpdateComplain = function () {
	    var complain = {
	        pid: $scope.user.patientid,
	        com: $scope.user.actualcomplain,
	        dia: $scope.user.diagnosis,
	        treat: $scope.user.treatment
	        };

	    var getUserAction = $scope.user.Action;
	    if (getUserAction == "Update") {
	            complain.cid = $scope.user.complainid;
	            var getUserData = crudService.updateComplain(complain);
	            //alert("Com- update");
	            getUserData.then(function (response) {
	                var msg = response.data.msg;
	                //alert(msg);
	                $scope.alert(msg);
	                $scope.ComplainFormContainer = false;
	                GetAllComplains(globalPatientId);
	            }, function () {
	                //alert('Error in updating User record');
	                $scope.alertError($scope.error);
	            });

	        } else {
	            //Add Use Code Come Here
	            AddComplain(complain);
	        }	       
	    }

    //Add-Updtate Visit Action 
	$scope.AddUpdateVisit = function () {
	    //alert(toDate($scope.user.visitdate));
	    var visit = {
	        pid: $scope.user.patientid,
	        vdesc: $scope.user.visitdesc,
	        vcost: $scope.user.visitcost,
	        vdate: toDate($scope.user.visitdate)
	    };
	    
	    var getUserAction = $scope.user.Action;
	    if (getUserAction == "Update") {
	        visit.vid = $scope.user.visitid;
	        var getUserData = crudService.updateVisit(visit);
	        //alert("Visit- update");
	        getUserData.then(function (response) {
	            var msg = response.data.msg;
	            //alert(msg);
	            $scope.alert(msg);
	            $scope.VisitFormContainer = false;
	            GetAllVisits(globalPatientId);
	        }, function () {
	            //alert('Error in updating User record');
	            $scope.alertError($scope.error);
	        });

	    } else {
	        //Add Use Code Come Here
	        AddVisit(visit);
	    }	   
	} 

    //Insert Patient
	function AddPatient(user) {
	    //http://localhost/FamilyDental/services/createPatient.php?fna=1&lna=2&ph=3&email=t&active=1;
	    var addUserData = crudService.addPatient(user);
	    addUserData.then(function (response) {
	        var msg = response.data.msg;
	        //$scope.visitid = parseInt(response.data.visitid) + 1;
	        //alert(msg);
	        $scope.alert(msg);
	        ClearPatientFields();
	        $scope.ComplainFormContainer = false;
	        $scope.PatientFormContainer = true;
	        $scope.VisitFormContainer = false;
	        GetAllPatients();
	    }, function () {
	        //alert('Error in adding User record');
	        $scope.alertError($scope.error);
	    });
	}

    //Insert Visit
	function AddVisit(user) {
	    //http://localhost/FamilyDental/services/createvisit.php?pid=1&vdesc=2&vcost=3
	    var addUserData = crudService.addVisit(user);
	    addUserData.then(function (response) {
	        var msg = response.data.msg;
	        //$scope.visitid = parseInt(response.data.visitid) + 1;
	        //alert(msg);
	        $scope.alert(msg);
	        ClearVisitFields();
	        $scope.ComplainFormContainer = false;
	        $scope.PatientFormContainer = false;
	        $scope.VisitFormContainer = true;
	        GetAllVisits(globalPatientId);
	    }, function () {
	        //alert('Error in adding User record');
	        $scope.alertError($scope.error);
	    });
	}

    //Insert Complain
	function AddComplain(user) {
	    //ClearVisitFields();
	   // $scope.user.Action = "Add";
	    var user = {
	        pid: $scope.user.patientid,
	        com: $scope.user.actualcomplain,
	        dia: $scope.user.diagnosis,
	        treat: $scope.user.treatment
	    };
	    //var getUserAction = $scope.user.Action;
	    //http://localhost/FamilyDental/services/createComplain.php?pid=1&com=2&dia=3&treat=t

	    var addUserData = crudService.addComplain(user);

	    addUserData.then(function (response) {
	        var msg = response.data.msg;
	        //$scope.visitid = parseInt(response.data.visitid) + 1;
	        //alert(msg);
	        $scope.alert(msg);
	        ClearComplainFields();
	        $scope.ComplainFormContainer = true;
	        $scope.PatientFormContainer = false;
	        $scope.VisitFormContainer = false;
	        GetAllComplains(globalPatientId);
	    }, function () {
	        //alert('Error in adding User record');
	        $scope.alertError($scope.error);
	    });
	}

    //Delete Patient Action 
	$scope.deletePatient = function (user) {
		//alert(user.id);
	    var ans = confirm($scope.delete);

	    //$scope.alertConfirm($scope.delete);
	    //var ans;
	    //if (jQuery('#deleteYes').data('clicked')) {
	    //    ans = true;
	    //} else {
	    //    ans = false;
	    //}      
	    
	    //$scope.ShowConfirm();

		if(ans) {
		    var delUserData = crudService.deleteUser(user.id);
		    delUserData.then(function (response) {
		        var msg = response.data.msg;
		        //alert(msg);
		        $scope.alert(msg);
		        GetAllPatients();
		        GetAllComplains(globalPatientId);
		        GetAllVisits(globalPatientId);
		        $scope.viewfirstname = "";

		    }, function () {
		        //alert('Error in adding User record');
		        $scope.alertError($scope.error);
		    });
		}
	}

    //Delete Complain Action 
	$scope.deleteComplain = function (user) {
	    //alert(user.id);
	    var ans = confirm($scope.delete);
	    if (ans) {
	        var delUserData = crudService.deleteComplain(user.id);
	        delUserData.then(function (response) {
	            var msg = response.data.msg;
	            //alert(msg);
	            $scope.alert(msg);
	            GetAllComplains(globalPatientId);
	        }, function () {
	            //alert('Error in adding User record');
	            $scope.alertError($scope.error);
	        });
	    }
	}

    //Delete Visit Action 
	$scope.deleteVisit= function (user) {
	    //alert(user.id);
	    var ans = confirm($scope.delete);
	    if (ans) {
	        var delUserData = crudService.deleteVisit(user.id);
	        delUserData.then(function (response) {
	            var msg = response.data.msg;
	            //alert(msg);
                $scope.alert(msg);
	            GetAllVisits(globalPatientId);
	        }, function () {
	            //alert('Error in adding User record');
	            $scope.alertError($scope.error);
	        });
	    }
	}

    // Hide Add / Update User Form
	$scope.closeFrmBtn = function () {
	    $scope.VisitFormContainer = false;
	    $scope.ComplainFormContainer = false;
	    $scope.PatientFormContainer = false;
	}
	$scope.Cancel = function () {
	    $scope.VisitFormContainer = false;
	    $scope.ComplainFormContainer = false;
	    $scope.PatientFormContainer = false;
	}
	$scope.sort = function(keyname){
        $scope.sortKey = keyname;   //set the sortKey to the param passed
        $scope.reverse = !$scope.reverse; //if true make it false and vice versa
    }
	$scope.activeChange = function() {
	    //var ret = (($scope.uActive) ? "1" : "0");
	    //$scope.search.active = ret;
	};
	$scope.reset = function(){
	    $scope.search = '';
	};
	function ClearVisitFields() {
	    $scope.user.visitdesc = "";
	    $scope.user.visitcost = "";
	    $scope.user.visitdate = "";
	}
	function ClearComplainFields() {
	    //$scope.user.patientid = "";
	    $scope.user.actualcomplain = "";
	    $scope.user.diagnosis = "";
	    $scope.user.treatment = "";
	}
	function ClearPatientFields() {
	    //$scope.user.patientid = "";
	    $scope.user.complainid = "";
	    $scope.user.firstname = "";
	    $scope.user.lastname = "";
	    $scope.user.address = "";
	    $scope.user.email = "";
	    $scope.user.phone = "";
	    $scope.user.UserActive = "";
	}
	function toDate(dateStr) {
	    var parts = dateStr.split("/");
	    return (parts[2]+'/'+parts[0] + '/'+parts[1]);
	}
	$scope.addPatientDetails = function () {
	    window.location.href = pageUrl + "addpatient.html";
	};

	$scope.viewPatientDetails = function () {
	    window.location.href = pageUrl + "viewpatient.html";
	};

	$scope.Home = function () {
	    window.location.href = pageUrl + "index.html";
	};

	$scope.OpenWindow = function (url) {
	    window.open("http://" + url, '_blank');
	}

});