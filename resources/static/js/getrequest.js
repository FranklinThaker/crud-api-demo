function resetData(){
	$("#firstname").val("");
	$("#lastname").val("");
	$("postResultDiv").val("");
	$("getResultDiv").val("");
}

// DO update
function UpdateByID(x){
	// PREPARE FORM DATA
	var formData = {
		firstname : $("#firstname").val(),
		lastname :  $("#lastname").val()
	}

	$.ajax({
		type : "PUT",
		contentType: "application/json",
		url : "/update/" + x,
		data : JSON.stringify(formData),
		dataType : 'json',
			
		success: function(result){
			$('#getResultDiv ul').empty();	
			alert("Data updated!");
			console.log("Updated: ", result);
			resetData();		
						
		},
		error : function(e) {
			$("#getResultDiv").html("<strong>Error</strong>");
			console.log("ERROR: ", e);
		}
	});	
}
// DO delete
function deleteByID(x){
	$.ajax({
		type : "DELETE",
		url : "/delete/" + x,
		
		success: function(result){
			$('#getResultDiv ul').empty();	
			alert("Data deleted!");
			console.log("Deleted: ", result);
			resetData();	
			
		},
		error : function(e) {
			$("#getResultDiv").html("<strong>Error</strong>");
			console.log("ERROR: ", e);
		}
	});	
}


$( document ).ready(function() {	

	// GET REQUEST all
	$("#findAll").click(function(event){
		event.preventDefault();
		ajaxGet();
	});
	
	// DO GET
	function ajaxGet(){
		$.ajax({
			type : "GET",
			url : "/findAll",
			success: function(result){
				console.log(result);
				$('#getResultDiv').empty();
				
				result.forEach(element => {
					var deleteId = element._id;
					$('#getResultDiv').append(element.fname + " " + element.lname + '<button value="'+deleteId+'" onclick="deleteByID(this.value)">delete</button><br>');		
				
				});				
				
				console.log("Success: ", result);
			},
			error : function(e) {
				$("#getResultDiv").html("<strong>Error</strong>");
				console.log("ERROR: ", e);
			}
		});	
	}

	// GET REQUEST single id
	$("#find").click(function(event){
		event.preventDefault();
		if(document.getElementById("fname").value==""){
			alert('Enter search field data...')
		}
		else{
		ajaxGetOneID();
	}
	});
	
	// DO GET
	function ajaxGetOneID(){
		$.ajax({

			type : "GET",
			url : "/find/" + $("#fname").val(),
			
			success: function(result){
				$('#getResultDiv ul').empty();
				var deleteId = result._id;	
				//$('#getResultDiv .list-group').append(result.fname + " " + result.lname + "<br>");		
				  $('#getResultDiv').append(result.fname + " " + result.lname + '<button value="'+deleteId+'" onclick="deleteByID(this.value)">delete</button><br><button value="'+deleteId+'" onclick="UpdateByID(this.value)">Update</button>');		
				
				console.log("Success: ", result);
				document.getElementById("firstname").value = result.fname;
				document.getElementById("lastname").value = result.lname;
				
			},
			error : function(e) {
				$("#getResultDiv").html("<strong>Error</strong>");
				console.log("ERROR: ", e);
			}
		});	
	}

	
	


})