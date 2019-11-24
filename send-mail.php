<?php
//$to      = 'jan.skvaril@gabros.cz';

$to      = 'jan.skvaril@gabros.cz';
$subject = 'Zprava ze stránky';
$message = $_POST['mailAdress']." <br> ". $_POST['mailText'];
$headers = 'Content-type:text/html;charset=UTF-8' . "\r\n".
'From: web@gabros.cz' . "\r\n" .
    'Reply-To: web@gabros.cz' . "\r\n" .
    'X-Mailer: PHP/' . phpversion();

mail($to, $subject, $message, $headers);

header('Content-type: application/json');
$response = array('succes' => 'true');
echo json_encode($response); 
?> 
