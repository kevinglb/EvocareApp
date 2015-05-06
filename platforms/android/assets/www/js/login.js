// when login button was clicked
$('#login_submit') .click(function()
{
	// get username and password from 
	var username = $('#login_username').val();
	var password = $('#login_password').val()

	// check whether username or password is empty
	if(!username.trim() || !password.trim())
	{
		alert("Username and Password cannot be empty");
	}
	else
	{
		var loginData = {username: username, password: password}; 
		$.ajax(
		{
    		url : "http://securion.systems/api/authenticate",
    		type: "POST",
    		data : loginData,
    		dataType: 'json',
    		success: function(response)
    		{
    			// login failed (Wrong username or password)
    			if(response.status == "403")
    			{
    				alert(response.message);	
    			}

    			// login successful
    			if(response.status == "1")
    			{
    				alert(response.message);

    				//navigate to main page
    				$.mobile.changePage("#main_page", 
    				{
    					transition: "pop",
    					reverse: false,
   						changeHash: false
    				})
    			}
    		},
    		error: function (error)
    		{
    			alert("Sorry, please check your network and try again later :(");
    		}
		});

	}
})

// when sign up button was clicked 
$('#signup_submit').click(function()
{
	// get user sign up info from input text fields
	var username = $('#signup_username').val();
	var email = $ ('#signup_email').val();

})