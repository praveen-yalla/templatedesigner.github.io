<?php
/*$img_file = $_FILES["img_file"]["name"];
$folderName = "images/";

// Generate a unique name for the image 
// to prevent overwriting the existing image
$filePath = $folderName. rand(10000, 990000). '_'. time().'.'.$ext;
move_uploaded_file( $_FILES["img_file"]["tmp_name"], $filePath)*/
$dir = "image/";
move_uploaded_file($_FILES["image"]["tmp_name"], $dir. $_FILES["image"]["name"]);

?>