<?php
/**
* Simple example script using PHPMailer with exceptions enabled
* @package phpmailer
* @version $Id$
*/

require 'class.phpmailer.php';
function SendMail($to,$subject,$body){
try {
	$mail = new PHPMailer(true); //New instance, with exceptions enabled

//	$body             = file_get_contents('contents.html');
	$body             = preg_replace('/\\\\/','', $body); //Strip backslashes

	$mail->IsSMTP();                           // tell the class to use SMTP
	$mail->SMTPAuth   = true;                  // enable SMTP authentication
	$mail->Port       = 25;                    // set the SMTP server port
	$mail->Host       = "smtp.postmarkapp.com"; // SMTP server
	$mail->Username   = "06d8b334-a6e4-494c-9bdd-151c8c413a3d";     // SMTP server username
	$mail->Password   = "06d8b334-a6e4-494c-9bdd-151c8c413a3d";            // SMTP server password
	$mail->SMTPSecure = "tls";
	$mail->From       = "mailmanager@tataufo.com";
	$mail->FromName   = "tataUFO";

	$mail->AddAddress($to);

	$mail->Subject  = $subject;

	$mail->AltBody    = "To view the message, please use an HTML compatible email viewer!"; // optional, comment out and test
	$mail->WordWrap   = 80; // set word wrap

	$mail->MsgHTML($body);

	$mail->IsHTML(true); // send as HTML

	$mail->Send();
//	echo 'Message has been sent.';
} catch (phpmailerException $e) {
//	echo $e->errorMessage();
}
}
?>
