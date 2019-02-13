//draw an image on a canvas element
//convert it to a array of arrays representing if a pixel or stitch should be knitted or perled at each index in each row

//create a canvas document
var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
var image = document.getElementById('source');//get image from img tag with id "source" from convertToArray.html

image.onload = function() {
	canvas.width = image.width;
	canvas.height = image.height;
	ctx.drawImage(image, 0, 0, image.width, image.height);
	var data=ctx.getImageData(0, 0, canvas.width, canvas.height); //get the pixel values

	var pixels = data.data;
	var w = data.width; //data is formatted here in a particular way
	var h = data.height;
	var l = w * h;
	var pixArray = new Array(h);
	let index = 0;
	for(var i = 0; i < pixels.length; i +=4) { //we increment by 4 since data is stored sequentially as r, g, b, r, g, b etc.
		if ((index % w) === 0){ //if we reach the end of a row, start a new row
			pixArray[Math.floor(index/h)] = new Array(w);
		}

		//since the square is either black or white, we can set it to either 1 or 0 by dividing it by 255
		pixArray[Math.floor(index/h)][index % w] = Math.round(pixels[i + 3]/255);
		index++; //go to next pixel in the array
    }
    console.log(JSON.stringify(pixArray));

}
