$( document ).ready(function() {
	
	// SUBMIT FORM
    $("#userForm").submit(function(event) {
		// Prevent the form from submitting via the browser.
		event.preventDefault();
		ajaxPost();
	});
    
    
    function ajaxPost(){
    	
    	// PREPARE FORM DATA
    	var formData = {
    		firstname : $("#firstname").val(),
    		lastname :  $("#lastname").val()
    	}
    	
    	// DO POST
    	$.ajax({
			type : "POST",
			contentType : "application/json",
			url : "/create",
			data : JSON.stringify(formData),
			dataType : 'json',
			success : function(user) {
				$("#postResultDiv").html("<p>" +
					"Post Successfully! <br>" +
					"--> " + user.firstname + " " + user.lastname + "</p>");
			},
			error : function(e) {
				alert("Plz enter valid data!")
				console.log("ERROR: ", e);
			}
		});
    	
    	// Reset FormData after Posting
    	resetData();
 
    }
    
    function resetData(){
    	$("#firstname").val("");
    	$("#lastname").val("");
    }
})