
function enterPatientTriage()
{
	// load patient list 
	getPatientList();
}

function getPatientList()
{
	$.ajax(
		{
    		url : patientList_url,
    		type: "POST",
    		data : {key: api_key},
    		dataType: 'json',
    		success: function(response)
    		{
    			if(response.status == "1")
    			{
    				$.mobile.changePage("#patientlist_page", 
    				{
    					transition: "slide",
    					reverse: false,
   						changeHash: true
    				});
    			}
    			else
    			{
    				alert("Sorry, cannot load your patient list");
    			}
    		},
    		error: function (error)
    		{
    			alert("Sorry, failed to load patient list. Please check your network and try again later");
    		}
		});
}