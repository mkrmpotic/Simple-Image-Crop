Simple Image Crop Plugin
========================
*A lightweight jQuery GUI with PHP backend for efficient image cropping.*

About
-----
Although cropping an image using PHP can be done with only a few lines of code, it can be a very complicated process for the average user of your web application. The Simple Image Crop script collects data (image dimensions, crop area coordinates, etc.) from the GUI and sends them to the PHP script which then actually crops an image based on that data.

Demo
----
Visit a [Demo page](http://www.marinkrmpotic.com/simpleimagecrop).

Installation
------------
First extract the package you downloaded and upload the files to your server. If you organize the files from the package differently than they were by default you will have to adapt the file paths. After that is done, you have to include the necessary javascript and css file, as well as the jQuery library in the head part of your page:
```html
<link rel="stylesheet" type="text/css" href="style/jquery.simpleimagecrop.css" media="all">
<script src="//ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js"></script>
<script src="js/jquery.simpleimagecrop.js"></script>
```
Then put the following code in the head part as well, and modify the values to suit your needs:
```html
<script type="text/javascript">
    $(window).load(function() {
        $('body').simpleImageCrop({
            maxPreviewImageWidth: 700,
            maxPreviewImageHeight: 700,
            newImageHeight: 300,
            newImageWidth: 400,
            imageDestination: 'test2', // destination from the folder where the php script is located (without extension). if the same as the source file the image will be overwritten.
            phpScriptLocation: 'simpleImageCrop.php',
            successMessage: 'The image has been cropped!',
            warningMessage: 'Warning: Selected area is too small. The image will be blurry.'
        })         
    });  
</script>
```
Finally, put the following code in the body of your page and modify the image source with the image you want to crop (test.jpg in the example below):
```html
<div id="crop_container" class="hidden">
    <div id="crop_box">
        <div id="resize_icon"></div>
    </div>
    <div id="crop_message">Leave this text here</div>
    <img id="image_to_crop" src="test.jpg" alt="">    
    <div id="crop_button">
        <img src="img/cut_icon.png" alt="Crop">
    </div>
</div>
 
<!-- div below can be put apart from the crop container -->
<div id="crop_preview" class="hidden">
    <div id="preview_message">Preview</div>
    <img id="image_preview" alt="Crop Preview">   
</div>
```
That's it! :) Be sure not to change the element IDs from the code above as they are being used by javascript. 

License
-------
The Simple Image Crop plugin is licensed under the MIT License. See the [LICENSE file](https://github.com/mkrmpotic/Simple-Image-Crop/blob/master/LICENSE) for details.

Author
------
Marin Krmpotić - me@marinkrmpotic.com - [Personal Website](http://www.marinkrmpotic.com) - [Facebook](http://facebook.com/krmpoticmarin)
