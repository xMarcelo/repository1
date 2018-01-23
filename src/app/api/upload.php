<?php
//header("Access-Control-Allow-Origin: *");
//header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
//header("Access-Control-Allow-Methods: PUT");
// if (array_key_exists('HTTP_X_FILE_NAME', $_SERVER) && array_key_exists('CONTENT_LENGTH', $_SERVER)) {
//     $fileName = $_SERVER['HTTP_X_FILE_NAME'];
//     $contentLength = $_SERVER['CONTENT_LENGTH'];
// } else throw new Exception("Error retrieving headers");
//
// //$path = '../file/fotos/';
// $path='http://localhost/projects/webpyme/src/assets/fotos';
//
// if (!$contentLength > 0) {
//     throw new Exception('No file uploaded!');
// }
//
// file_put_contents(
//     $path . $fileName,
//     file_get_contents("php://input")
// );
//
// chmod($path.$fileName, 0777);
// header('Access-Control-Allow-Origin: *');
// header("Access-Control-Allow-Methods: PUT");
// //define('PUBLIC_KEY', 'e21cc284848a3f5b0240');
// $tempPath = $_FILES['file']['tmp_name'];
// $fileName = $_FILES['file']['name'];
//
// $path='http://localhost/projects/webpyme/src/assets/fotos/';
//
// file_put_contents(
//     $path . $fileName,
//     file_get_contents("php://input")
// );
//
// chmod($path.$fileName, 0777);
//
//
// header('Access-Control-Allow-Origin: *');
//
// $tempPath = $_FILES['file']['tmp_name'];
// $actualName = $_FILES['file']['name'];
// $actualPath = dirname(__FILE__)."\\temp\\".$actualName;
// move_uploaded_file($tempPath, $actualPath);
// $ch = curl_init();
// // $post = [
// // 	'UPLOADCARE_STORE'=>1,
// // 	'file'=> curl_file_create($actualPath)
// // ];
// curl_setopt($ch, CURLOPT_URL, 'http://localhost/projects/webpyme/src/assets/fotos/');
// curl_setopt($ch, CURLOPT_POST, 1);
// curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
// //curl_setopt($ch, CURLOPT_POSTFIELDS, $post);
// $response = curl_exec($ch);
// echo ($response);
//
// header('Access-Control-Allow-Origin: *');
// $currentDir = getcwd();
//     $uploadDirectory = "http://localhost/projects/webpyme/src/assets/fotos/";
//
//     $errors = []; // Store all foreseen and unforseen errors here
//
//     $fileExtensions = ['jpeg','jpg','png']; // Get all the file extensions
//
//     $fileName = $_FILES['myfile']['name'];
//     $fileSize = $_FILES['myfile']['size'];
//     $fileTmpName  = $_FILES['myfile']['tmp_name'];
//     $fileType = $_FILES['myfile']['type'];
//
//     $uploadPath = $uploadDirectory . basename($fileName);
//     $didUpload = move_uploaded_file($fileName, $uploadPath);
//     if ($didUpload) {
//         echo "The file " . basename($fileName) . " has been uploaded";
//     } else {
//         echo "An error occurred somewhere. Try again or contact the admin";
//     }
//
//     $fileExtension = strtolower(end(explode('.',$fileName)));
//
//     if (isset($_POST['submit'])) {
//
//         if (! in_array($fileExtension,$fileExtensions)) {
//             $errors[] = "This file extension is not allowed. Please upload a JPEG or PNG file";
//         }
//
//         if ($fileSize > 2000000) {
//             $errors[] = "This file is more than 2MB. Sorry, it has to be less than or equal to 2MB";
//         }
//
//         if (empty($errors)) {
//             $didUpload = move_uploaded_file($fileTmpName, $uploadPath);
//
//             if ($didUpload) {
//                 echo "The file " . basename($fileName) . " has been uploaded";
//             } else {
//                 echo "An error occurred somewhere. Try again or contact the admin";
//             }
//         } else {
//             foreach ($errors as $error) {
//                 echo $error . "These are the errors" . "\n";
//             }
//         }
//     }


// header('Access-Control-Allow-Origin: *');
// //header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
// //include_once("db_connect.php");
// //foreach($_FILES['file']['name'] as $key=>$val){
//
// $upload_dir = "http://localhost/projects/webpyme/src/assets/fotos/";
// $upload_file = $upload_dir.$_FILES['file']['name'];
// $filename = $_FILES['file']['name'];
// $didUpload=move_uploaded_file($_FILES['file']['tmp_name'],$upload_file);
// if ($didUpload) {
//         echo "The file " . basename($filename) . " has been uploaded";
//     } else {
//         echo "An error occurred somewhere. Try again or contact the admin";
//     }
// echo 'File uploaded and saved in database successfully.';


header('Access-Control-Allow-Origin: *');
$target_dir = "a/";
$target_file = $target_dir . basename($_FILES["file"]["name"]);
$uploadOk = 1;
$imageFileType = strtolower(pathinfo($target_file,PATHINFO_EXTENSION));
// Check if image file is a actual image or fake image
//if(isset($_POST["submit"])) {
    $check = getimagesize($_FILES["file"]["tmp_name"]);
    if($check !== false) {
        echo "File is an image - " . $check["mime"] . ".";
        $uploadOk = 1;
    } else {
        echo "File is not an image.";
        $uploadOk = 0;
    }
//}

// Check if file already exists
if (file_exists($target_file)) {
    echo "Sorry, file already exists.";
    $uploadOk = 0;
}
// Check file size
if ($_FILES["file"]["size"] > 500000) {
    echo "Sorry, your file is too large.";
    $uploadOk = 0;
}
// Allow certain file formats
if($imageFileType != "jpg" && $imageFileType != "png" && $imageFileType != "jpeg"
&& $imageFileType != "gif" ) {
    echo "Sorry, only JPG, JPEG, PNG & GIF files are allowed.";
    $uploadOk = 0;
}
// Check if $uploadOk is set to 0 by an error
if ($uploadOk == 0) {
    echo "Sorry, your file was not uploaded.";
// if everything is ok, try to upload file
} else {
    if (move_uploaded_file($_FILES["file"]["tmp_name"], $target_file)) {
        echo $target_file;
        echo "The file ". basename( $_FILES["file"]["name"]). " has been uploaded.";
    } else {
        echo "Sorry, there was an error uploading your file.";
    }
}
?>
