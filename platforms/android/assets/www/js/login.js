
var login_url = "http://clinic.evocare.co/api/authenticate";
var register_url = "http://clinic.evocare.co/api/register";

// when login button was clicked
$('#login_submit') .click(function()
{
	// get username and password from 
	var username = $('#login_username').val();
	var password = $('#login_password').val();

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
    		url : login_url,
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
    				//navigate to main page
    				$.mobile.changePage("#main_page", 
    				{
    					transition: "pop",
    					reverse: false,
   						changeHash: false
    				})

    				// delete username and password data
    				$('#login_username').val('');
    				$('#login_password').val('');
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
	var firstname = $('#signup_firstname').val();
	var lastname = $('#signup_lastname').val();
	var email = $('#signup_email').val();
	var password = $('#signup_password').val();
	var password_confirm = $('#signup_password_confirm').val();
	var dateOfBirth = $('#signup_birthday').val()

	if(!firstname.trim())
	{
		alert("Plase input your firstname");
		return;
	}

	if(!lastname.trim())
	{
		alert("Please input your lastname");
		return;
	}

	if(!email.trim())
	{
		alert("Please input your Email address");
		return;
	}

	if(!IsEmail(email))
	{
		alert("Invalidate Email address");
		return;
	}

	if(!password.trim())
	{
		alert("Please input your password");
		return;
	}

	if(!password_confirm.trim())
	{
		alert("Please confirm your password");
		return;
	}

	if(password != password_confirm)
	{
		alert("Password doesn't match");
		return;
	}

	if(!dateOfBirth.trim())
	{
		alert("Please input your birthday");
		return;
	}

	// only check if the input date is number or not. This need to be improved later.
	if(isNaN(dateOfBirth))
	{
		alert("Invalidate date format");
		return;
	}

	else
	{
		var registerData = {firstname: firstname, lastname: lastname, email: email,
							 password: password, password_confirm: password_confirm, dateOfBirth: dateOfBirth};

		$.ajax(
		{
    		url : register_url,
    		type: "POST",
    		data : registerData,
    		dataType: 'json',
    		success: function(response)
    		{
    			// registration failed 
    			if(response.status == "100")
    			{
    				alert(response.message);	
    				return;
    			}

    			if(response.status == "101")
    			{
    				alert(response.message);
    			}

    			// registration successful
    			if(response.status == "1")
    			{
    				alert(response.message);

    				//navigate to login page
    				$.mobile.changePage("#login_page", 
    				{
    					transition: "slide",
    					reverse: false,
   						changeHash: false
    				})

    				// clean the register form 
    				$('#signup_firstname').val('');
    				$('#signup_lastname').val('');
    				$('#signup_email').val('');
    				$('#signup_password').val('');
    				$('#signup_password_confirm').val('');
    				$('#signup_birthday').val('');
    			}
    		},
    		error: function (error)
    		{
    			alert("Sorry, please check your network and try again later :(");
    		}
		});

	}

})

function IsEmail(email) 
{
  var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
  return regex.test(email);
}

