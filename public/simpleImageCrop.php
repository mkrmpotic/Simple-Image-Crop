<?php

/**
 * Simple Image Crop
 * http://marinkrmpotic.com
 *
 * ::version
 * 0.8.5 (04/26/2013)
 * 
 * ::copyright
 * Copyright (C) 2013 Marin Krmpotic.
 *
 * ::license
 * Licensed under the MIT License.
 */

if (isset($_POST['x']) && !empty($_POST['x']) 
&& isset($_POST['y']) && !empty($_POST['y']) 
&& isset($_POST['w']) && !empty($_POST['w']) 
&& isset($_POST['h']) && !empty($_POST['h']) 
&& isset($_POST['dimension_x']) && !empty($_POST['dimension_y']) 
&& isset($_POST['image_path']) && !empty($_POST['image_path']) 
&& isset($_POST['image_destination']) && !empty($_POST['image_destination'])) {

$dest = imagecreatetruecolor($_POST['dimension_x'], $_POST['dimension_y']);
$fileType = pathinfo($_POST['image_path'], PATHINFO_EXTENSION);

	switch ($fileType) {
		case "jpg":
		case "jpeg":
			$src = imagecreatefromjpeg($_POST['image_path']);
			imagecopyresampled($dest, $src, 0, 0, $_POST['x'], $_POST['y'], $_POST['dimension_x'], $_POST['dimension_y'], $_POST['w'], $_POST['h']);
			imagejpeg($dest, $_POST['image_destination'] . '.jpg', 100);
			imagedestroy($dest);
			imagedestroy($src);
			break;
		case "png":
			$src = imagecreatefrompng($_POST['image_path']);
			imagecopyresampled($dest, $src, 0, 0, $_POST['x'], $_POST['y'], $_POST['dimension_x'], $_POST['dimension_y'], $_POST['w'], $_POST['h']);
			imagepng($dest, $_POST['image_destination']. '.png');
			imagedestroy($dest);
			imagedestroy($src);
			break;
		case "gif":
			$src = imagecreatefromgif($_POST['image_path']);
			imagecopyresampled($dest, $src, 0, 0, $_POST['x'], $_POST['y'], $_POST['dimension_x'], $_POST['dimension_y'], $_POST['w'], $_POST['h']);
			imagegif($dest, $_POST['image_destination']. '.gif');
			imagedestroy($dest);
			imagedestroy($src);
			break;
	}
}

?>