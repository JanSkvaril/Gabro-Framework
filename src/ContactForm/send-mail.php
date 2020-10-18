<?php


$to      = 'mail@mail.com';
$subject = 'Message from website';
$message = $_POST['mailAdress']." <br> ". $_POST['mailText'];
$headers = 'Content-type:text/html;charset=UTF-8' . "\r\n".
'From: web@mail.cz' . "\r\n" .
    'Reply-To: web@mail.cz' . "\r\n" .
    'X-Mailer: PHP/' . phpversion();

mail($to, $subject, $message, $headers);

header('Content-type: application/json');
$response = array('succes' => 'true');
echo json_encode($response); 
?> 
