<?php
// contact.php - receives POST and appends to messages.txt
header('Content-Type: application/json');

$name = isset($_POST['name']) ? trim($_POST['name']) : '';
$email = isset($_POST['email']) ? trim($_POST['email']) : '';
$message = isset($_POST['message']) ? trim($_POST['message']) : '';

if(!$name || !$email || !$message){
  echo json_encode(['success' => false, 'error' => 'All fields are required.']);
  exit;
}

// sanitize basic
$entry = sprintf("[%s] Name: %s | Email: %s | Message: %s\n", date('Y-m-d H:i:s'), strip_tags($name), filter_var($email, FILTER_SANITIZE_EMAIL), strip_tags($message));

$file = __DIR__ . '/messages.txt';
$ok = file_put_contents($file, $entry, FILE_APPEND | LOCK_EX);

if($ok === false){
  echo json_encode(['success' => false, 'error' => 'Could not save message.']);
  exit;
}

// Optionally you can send an email (uncomment & configure) - mail() may not work on all hosts
// mail('your@email.com', 'New contact', $entry);

echo json_encode(['success' => true]);
