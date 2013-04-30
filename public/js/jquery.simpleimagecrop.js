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
 
 (function($) {


	$.fn.extend({ 

            simpleImageCrop: function(options) {
                //SETTINGS LIST AND THE DEFAULT VALUES--------------------------------------------
                var defaults = {
					maxPreviewImageWidth: 700,
					maxPreviewImageHeight: 700,
                    newImageHeight: 300,
                    newImageWidth: 400,
					imageDestination: 'test2.jpg',
					phpScriptLocation: 'simpleImageCrop.php',
					successMessage: 'The image has been cropped!',
					warningMessage: 'Warning: Selected area is too small. The image will be blurry.'
                };
				// -------------------------------------------------------------------------------
                
                var options = $.extend(defaults, options);
            
            return this.each(function() {
			
				var o = options;
       
				// IF JAVASCRIPT IS ENABLE SHOW THE CONTENT --------------------------------------
				$('#crop_container').removeClass('hidden');
				$('#crop_preview').removeClass('hidden');
				// -------------------------------------------------------------------------------
				
				// SOME BASIC VARIABLES ----------------------------------------------------------
				var image = $('#image_to_crop');
				var cropArea = $('#crop_box');
				var resize = $('#resize_icon');
				var cropPreview = $('#crop_preview');
				var imagePath = $(image).attr("src");
				var imageHeight = $(image).height();
				var imageWidth = $(image).width();
				var resizeState = false;
				var mouseMoveState = false;
				var aspectRatio = imageWidth / imageHeight;
				var previewImageWidth = o.maxPreviewImageWidth;
				var previewImageHeight = previewImageWidth / aspectRatio;
				// -------------------------------------------------------------------------------
				
				// RESIZE THE IMAGE BASED ON THE MAXIMUM WIDTH ALLOWED, OR HEIGHT IF TOO LARGE ---
				if (previewImageHeight <= o.maxPreviewImageHeight) {
					$(image).css( "width", previewImageWidth );
					$(image).css( "height", previewImageHeight );
				} else {
					previewImageHeight = o.maxPreviewImageHeight;
					previewImageWidth = o.maxPreviewImageHeight * aspectRatio;
					$(image).css( "width", previewImageWidth );
					$(image).css( "height", o.maxPreviewImageHeight );
				}
				// -------------------------------------------------------------------------------
				
				// DISABLE IMAGE DRAGGING --------------------------------------------------------
				$(image).on('dragstart', function(event) { event.preventDefault(); });
				$('#image_preview').on('dragstart', function(event) { event.preventDefault(); });
				// -------------------------------------------------------------------------------
				
				// SET THE CROP PREVIEW IMAGE SOURCE ---------------------------------------------
				$('#image_preview').attr( "src", imagePath );
				// -------------------------------------------------------------------------------
				
				// SET THE DIMENSIONS OF THE CROP PREVIEW DIV ------------------------------------
				$(cropPreview).css( "width", o.newImageWidth );
				$(cropPreview).css( "height", o.newImageHeight );
				// -------------------------------------------------------------------------------
				
				// CALCULATE THE ASPECT RATIO OF THE ORIGINAL IMAGE AND THE SHOWN ONE ------------
				var dimensionsDifferenceHeight = imageHeight / previewImageHeight;
				var dimensionsDifferenceWidth = imageWidth / previewImageWidth;
				// -------------------------------------------------------------------------------
				
				// SET THE DIMENSIONS OF THE CROP CONTAINER --------------------------------------
				$('#crop_container').css( "width", previewImageWidth );
				$('#crop_container').css( "height", previewImageHeight + 42 ); // adding 42 to make space for the crop button
				// -------------------------------------------------------------------------------
				
				// INITIALIZE THE CROP BOX DIMENSIONS --------------------------------------------
				var cropAspectRatio = o.newImageWidth / o.newImageHeight;
				var initialCropBoxWidth = 400;
				var initialCropBoxHeight = 400 / cropAspectRatio;
				$(cropArea).css( "width", initialCropBoxWidth);
				$(cropArea).css( "height", initialCropBoxHeight);
				// -------------------------------------------------------------------------------
				
				// INITIALIZE THE CROP PREVIEW IMAGE ZOOM AS WELL AS THE POSITION ----------------
				$("#image_preview").css( "width", o.newImageWidth / initialCropBoxWidth * previewImageWidth);
				$("#image_preview").css( "height", o.newImageHeight / initialCropBoxHeight * previewImageHeight);
	
				$("#image_preview").css( "margin-left", -parseFloat($(cropArea).css("left"), 10) * (parseFloat($("#image_preview").css("width"), 10) / previewImageWidth));
				$("#image_preview").css( "margin-top", -parseFloat($(cropArea).css("top"), 10) * (parseFloat($("#image_preview").css("height"), 10) / previewImageHeight));
				// -------------------------------------------------------------------------------
				
				// SOME MORE VARIABLES WE ARE GOING TO USE ---------------------------------------
				var resizeClickPositionX = 0;
				var resizeClickPositionY = 0;
				var offsetLeft;
				var offsetTop;
				var initialCropBoxPositionX;
				var initialCropBoxPositionY;
				// -------------------------------------------------------------------------------
				
				// WHEN CROP BOX CLICKED ALLOW MOVING OF THE BOX ---------------------------------
				$(cropArea).on("mousedown", function(a){
				
					initialCropBoxPositionX = a.pageX; // save the position (x-coordinate) where the box is clicked so we can calculate for how many pixels a box should be moved
					initialCropBoxPositionY = a.pageY; // save the position (y-coordinate) where the box is clicked so we can calculate for how many pixels a box should be moved
					a.originalEvent.preventDefault(); // this is just a fix for the cursor to be shown properly in Chrome
					offsetLeft = parseFloat($(cropArea).css("left"), 10); // save the previous hroziontal position to calculate the new values when moved
					offsetTop = parseFloat($(cropArea).css("top"), 10); // save the previous vertical position to calculate the new values when moved
					mouseMoveState = true;
					
				});
				// -------------------------------------------------------------------------------
				
				// MOVE THE BOX ON MOUSEMOVE IF MOUSEDOWN ----------------------------------------
				 $(document).on("mousemove", function(e){

					if (mouseMoveState) {
						var moveRight = offsetLeft + (e.pageX - initialCropBoxPositionX); // calculates a new horiontal position
						var moveDown = offsetTop + (e.pageY - initialCropBoxPositionY); // calculates a new vertical position
						
						if (((previewImageHeight - parseFloat($(cropArea).css("height"), 10)) > moveDown) && (moveDown > 0)) { // a check is made to be sure the crop box is not going off image while dragging	
							$(cropArea).css( "top", moveDown ); // move the box vertically
							$("#image_preview").css( "margin-top", -moveDown * (parseFloat($("#image_preview").css("height"), 10) / previewImageHeight)); // move the crop preview along
						}
						
						if (((previewImageWidth - parseFloat($(cropArea).css("width"), 10)) > moveRight) && (moveRight > 0)) { // a check is made to be sure the crop box is not going off image while dragging
							$(cropArea).css( "left", moveRight ); // move the box horizontally
							$("#image_preview").css( "margin-left", -moveRight * (parseFloat($("#image_preview").css("width"), 10) / previewImageWidth)); // move the crop preview along
						}
					}
						
				});
				// -------------------------------------------------------------------------------
				
				// STOP MOVING ON CLICK RELEASE --------------------------------------------------
				$(document).mouseup(function(){
				
					if (mouseMoveState) {
					$(cropArea).unbind('mousemove');
					mouseMoveState = false;
					}
					
				}); 
				// -------------------------------------------------------------------------------

				// ENABLE RESIZING WHEN USER CLICKS ON THE RESIZE ICON ---------------------------
				resize.mousedown(function(b){
				
					resizeState = true;
					initialCropBoxHeight = parseFloat($(cropArea).css("height"), 10);
					initialCropBoxWidth = parseFloat($(cropArea).css("width"), 10);
					resizeClickPositionX = b.pageX; // save the position (x-coordinate) where the resize icon is clicked so we can calculate for how many pixels a box should be resized
					resizeClickPositionY = b.pageY; // save the position (y-coordinate) where the resize icon is clicked so we can calculate for how many pixels a box should be resized
					$("#crop_container").css( "cursor", 'se-resize'); // change the curson
					$(cropArea).css( "cursor", 'se-resize'); // change the cursor
					return false;
					
				});
				// -------------------------------------------------------------------------------
			
				// RESIZE THE BOX ON MOUSEMOVE IF MOUSEDOWN --------------------------------------
				$(document).mousemove(function(f){
				
					if (resizeState) {
						var resizeHorizontal = initialCropBoxWidth + (f.pageX - resizeClickPositionX); // calculate new width
						var resizeVertical = initialCropBoxHeight + (f.pageX - resizeClickPositionX) / cropAspectRatio; // calculate new height
						
						if ((parseFloat($(cropArea).css("height"), 10) + parseFloat($(cropArea).css("top"), 10) + 2) < previewImageHeight && (parseFloat($(cropArea).css("width"), 10) + parseFloat($(cropArea).css("left"), 10) + 2) < previewImageWidth && (parseFloat($(cropArea).css("width"), 10) > 40 || ((f.pageX - resizeClickPositionX) > 0))) {
							$(cropArea).css( "height", resizeVertical);
							$(cropArea).css( "width", resizeHorizontal);
							
							// ADJUST CROP PREVIEW WHILE RESIZING --------------------------------
							$("#image_preview").css( "width", o.newImageWidth / resizeHorizontal * previewImageWidth);
							$("#image_preview").css( "height", o.newImageHeight / resizeVertical * previewImageHeight);
							$("#image_preview").css( "margin-left", -parseFloat($(cropArea).css("left"), 10) * (parseFloat($("#image_preview").css("width"), 10) / previewImageWidth));
							$("#image_preview").css( "margin-top", -parseFloat($(cropArea).css("top"), 10) * (parseFloat($("#image_preview").css("height"), 10) / previewImageHeight));
							// -------------------------------------------------------------------
							
						} else if((f.pageX - resizeClickPositionX) < 0 && parseFloat($(cropArea).css("width"), 10) > 40) {
							$(cropArea).css( "height", resizeVertical);
							$(cropArea).css( "width", resizeHorizontal);
							
							// ADJUST CROP PREVIEW WHILE RESIZING --------------------------------
							$("#image_preview").css( "width", o.newImageWidth / resizeHorizontal * previewImageWidth);
							$("#image_preview").css( "height", o.newImageHeight / resizeVertical * previewImageHeight);
							$("#image_preview").css( "margin-left", -parseFloat($(cropArea).css("left"), 10) * (parseFloat($("#image_preview").css("width"), 10) / previewImageWidth));
							$("#image_preview").css( "margin-top", -parseFloat($(cropArea).css("top"), 10) * (parseFloat($("#image_preview").css("height"), 10) / previewImageHeight));
							// -------------------------------------------------------------------
							
						}
				
						// CHECK IF SELECTED AREA IS TOO SMALL AND NOTIFY THE USER ---------------
						if ((parseFloat($(cropArea).css("height"), 10) * dimensionsDifferenceHeight) < o.newImageHeight || (parseFloat($(cropArea).css("width"), 10) * dimensionsDifferenceWidth) < o.newImageWidth) {
							$(cropArea).css("background-color", "#DB2C2C");
							$(cropArea).css("border-color", "#FFFFFF");
							$('#crop_message').html(o.warningMessage);
							$('#crop_message').css("visibility", "visible");
						} else {
							$(cropArea).css("background-color", "#FFFFFF");
							$(cropArea).css("border-color", "#186ab5");
							$('#crop_message').css("visibility", "hidden");
						}
						//------------------------------------------------------------------------
					}
					
				});
				// -------------------------------------------------------------------------------
			
				// STOP RESIZING ON CLICK RELEASE ------------------------------------------------
				$(document).mouseup(function() {
				
					if (resizeState) {
						resizeState = false;
						$("#crop_container").css( "cursor", 'auto'); // reset to initial cursor type
						$(cropArea).css( "cursor", 'move'); // reset to initial cursor type
					}
					
				}); 
				// -------------------------------------------------------------------------------
			
				// SEND DATA TO PHP SCRIPT WHEN CROP BUTTON IS CLICKED ---------------------------
				$('#crop_button').click(function() {
				
					var x = parseFloat($(cropArea).css("left"), 10) * dimensionsDifferenceWidth; // x-coordinate of the crop selection
					var y = parseFloat($(cropArea).css("top"), 10) * dimensionsDifferenceHeight; // y-coordinate of the crop selection
					var w = parseFloat($(cropArea).css("width"), 10) * dimensionsDifferenceWidth; // width of the crop selection
					var h = parseFloat($(cropArea).css("height"), 10) * dimensionsDifferenceHeight; // height of the crop selestion
			
					$.ajax({
						url: o.phpScriptLocation,
						data: {x: x, y: y, w: w, h: h, dimension_x: o.newImageWidth, dimension_y: o.newImageHeight, image_path: imagePath, image_destination: o.imageDestination}, 
						type: 'post',
						success: function() {
							$('#crop_message').html(o.successMessage);
							$('#crop_message').css("visibility", "visible");
						}
					});
					
				}); 
				// -------------------------------------------------------------------------------
            });
        }
	
	});

    })(jQuery);