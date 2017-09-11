app.service("crudService", function ($http) {
    //var serviceUrl = "http://localhost/FamilyDental/services/";
	//get All Users
	this.getUsers = function () {
	   return $http.get(serviceUrl + "viewUsers.php");
    };
    //For Edit Patient Button Clicked 
	this.getPatient = function() {
		var response = $http({
			method	: "POST",
			url: serviceUrl + "getPatient.php"			
		});
		return response;
	};
    //For Edit Complain Button Clicked 
	this.getComplain = function (pid) {
	    var response = $http({
	        method: "POST",
	        url: serviceUrl + "getComplain.php",
	        params: {
	            pid: pid
	        }
	    });
	    return response;
	};
    //For Edit Visit Button Clicked 
	this.getVisit = function (pid) {
	    var response = $http({
	        method: "POST",
	        url: serviceUrl + "getVisit.php",
	        params: {
	            pid: pid
	        }
	    });
	    return response;
	};

	this.getComplainVisit = function (patientId) {
	    var response = $http({
	        method: "POST",
	        url: serviceUrl + "getComplainVisit.php",
	        params: {
	            pid: patientId
	        }
	    });
	    return response;
	};

	this.updateUser = function (user) {
		var response = $http({
			method : "POST",
			url : serviceUrl + "updateUser.php",
			params : user
		});

		return response;
	};

	this.updateComplain = function (user) {
	    var response = $http({
	        method: "POST",
	        url: serviceUrl + "updateComplain.php",
	        params: user
	    });

	    return response;
	};

	this.updateVisit = function (user) {
	    var response = $http({
	        method: "POST",
	        url: serviceUrl + "updateVisit.php",
	        params: user
	    });

	    return response;
	};

	//this.addUser = function (user) {
	//	var response = $http({
	//		method  : "POST",
	//		url		: serviceUrl + "createUser.php",
	//		params : user
	//	});
	//	return response;
	//};

	this.deleteUser = function (id) {
		var response = $http({
			method  : "POST",
			url		: serviceUrl + "deleteUser.php",
			params : { pid : id}
		});
		return response;
	};

	this.deleteComplain = function (id) {
	    var response = $http({
	        method: "POST",
	        url: serviceUrl + "deleteComplain.php",
	        params: { cid: id }
	    });
	    return response;
	};

	this.deleteVisit = function (id) {
	    var response = $http({
	        method: "POST",
	        url: serviceUrl + "deleteVisit.php",
	        params: { vid: id }
	    });
	    return response;
	};

	this.addVisit = function (user) {
	    //Add Use Code Come Here
	    var response = $http({
	        method: "POST",
	        url: serviceUrl + "createVisit.php",
	        params: user
	    });
	    return response;
	};

	this.addComplain = function (user) {
	    //Add Use Code Come Here
	    var response = $http({
	        method: "POST",
	        url: serviceUrl + "createComplain.php",
	        params: user
	    });
	    return response;
	};

	this.addPatient = function (user) {
	    //Add Use Code Come Here
	    var response = $http({
	        method: "POST",
	        url: serviceUrl + "createPatient.php",
	        params: user
	    });
	    return response;
	};

});