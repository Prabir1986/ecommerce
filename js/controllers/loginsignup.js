$(document).ready(function() {

        $('form#loginajax').on('submit', function (e) { debugger;
          
          e.preventDefault();
		  var email = $('#email').val();
		  var password = $('#password').val();
		  var method = $('#btn-login').val();
		  $.ajax({
            type: 'post',
            url: '/controllers/UserController.php',
           // data: $('form#loginajax').serialize(),
		    data: {email: email,password: password,method: method},
            success: function (response) { debugger;
              var res = jQuery.parseJSON(response);
				if (res.status == 1) {
					window.location.href ="/";
				}else{
				   $('#error').css('display','block');
				}
            }
          });

       });
	   
	   $('form#registerajax').on('submit', function (e) { debugger;
          $('#signupsuccess').css('display','none');
		  $('#signuperror').css('display','none');
          e.preventDefault();
		  var uname = $('#signupname').val();
		  var email = $('#signupemail').val();
		  var password = $('#signuppassword').val();
		  var confirmpwd = $('#confirmpassword').val();
		  var method = $('#btn-register').val();
		  if(password===confirmpwd){
			  $.ajax({
				type: 'post',
				url: '/controllers/UserController.php',
			   // data: $('form#loginajax').serialize(),
				data: {email: email,password: password,uname: uname,method: method},
				success: function (response) { debugger;
				  var res = jQuery.parseJSON(response);
					if (res.status == 1) {
					   /* $('#signupname').val('');
		                $('#signupemail').val('');
		                $('#signuppassword').val('');
		                $('#confirmpassword').val('');
					    $('#signupsuccess').css('display','block'); */
						window.location.href ="/";
						//$('#signupsuccess').html(res.value);
					}else{
					   $('#signuperror').css('display','block');
					   $('#signuperror').html(res.value);
					}
				}
			  });
          }else{
		     $('#signuperror').css('display','block');
		     $('#signuperror').html('<i class="glyphicon glyphicon-warning-sign"></i> &nbsp; Password mismatch !');
		  } 
		  return false;
       });

});