<?php
session_start();
require_once("classmodel/class.user.php");
 
    $user = new USER();
	if($user->is_loggedin()!="")
	{
		$user->redirect('/');
	}
	if($_POST)
	{
	
		if($_POST['method']=="Sign In"){	
			$umail = strip_tags($_POST['email']);
			$upass = strip_tags($_POST['password']);
				
			if($user->doLogin('',$umail,$upass))
			{
				echo json_encode(array("status"=>1));
				//$login->redirect('mens.html');
			}
			else
			{
			   echo json_encode(array("status"=>0));
				//$error = "Wrong Details !";
			}
		}	
	
		if($_POST['method']=="Sign Up"){
				$uname = strip_tags($_POST['uname']);
				$umail = strip_tags($_POST['email']);
				$upass = strip_tags($_POST['password']);	
				
				if(strlen($upass) < 6){
					$error = "Password must be atleast 6 characters";
                    echo json_encode(array("status"=>0,"value"=>$error));					
				}
				else
				{
					try
					{
						$stmt = $user->runQuery("SELECT user_name, user_email FROM users WHERE user_name=:uname OR user_email=:umail");
						$stmt->execute(array(':uname'=>$uname, ':umail'=>$umail));
						$row=$stmt->fetch(PDO::FETCH_ASSOC);
							
						if($row['user_name']==$uname) {
							$error = "sorry username already taken !";
							$status = 0;
						}
						else if($row['user_email']==$umail) {
							$error = "sorry email id already taken !";
							$status = 0;
						}
						else
						{
							if($user->register($uname,$umail,$upass)){	
							    $error = "Registration Completed Successfully !";
								$status = 1;
							}
						}
					}
					catch(PDOException $e)
					{
					    $status = 0;
						$error = $e->getMessage();
					}
					echo json_encode(array("status"=>$status,"value"=>$error));	
				}	
		}
       		
	}
  