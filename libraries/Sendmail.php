<?php
if (!defined('BASEPATH'))
	exit ('No direct script access allowed');
require_once 'PHPMailer/class.phpmailer.php';

class Sendmail {
	public function __construct() {
	}

	function SendMail($to, $subject, $body) {
		try {
			$mail = new PHPMailer(true); //New instance, with exceptions enabled
			$body = preg_replace('/\\\\/', '', $body); //Strip backslashes
			$mail->IsSMTP(); // tell the class to use SMTP
			$mail->SMTPAuth = true; // enable SMTP authentication
			$mail->Port = 25; // set the SMTP server port
			$mail->Host = "smtp.postmarkapp.com"; // SMTP server
			$mail->Username = "06d8b334-a6e4-494c-9bdd-151c8c413a3d"; // SMTP server username
			$mail->Password = "06d8b334-a6e4-494c-9bdd-151c8c413a3d"; // SMTP server password
			$mail->SMTPSecure = "tls";
			$mail->From = "mailmanager@tataufo.com";
			$mail->FromName = "tataUFO";
			$mail->AddAddress($to);
			$mail->Subject = $subject;
			$mail->AltBody = "To view the message, please use an HTML compatible email viewer!"; // optional, comment out and test
			$mail->WordWrap = 80; // set word wrap
			$mail->MsgHTML($body);
			$mail->IsHTML(true); // send as HTML
			$mail->Send();
		} catch (phpmailerException $e) {
		}
	}

}

// END Sendmail Class

/* End of file Sendmail.php */
/* Location: ./application/libraries/Sendmail.php */