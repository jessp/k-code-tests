
var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
var image = document.getElementById('source');

image.onload = function() {
	canvas.width = image.width;
	canvas.height = image.height;
	ctx.drawImage(image, 0, 0, image.width, image.height);
	var data=ctx.getImageData(0, 0, canvas.width, canvas.height);

	var pixels = data.data;
	var w = data.width;
	var h = data.height;
	var l = w * h;
	var pixArray = new Array(h);
	// console.log(pixels.length, l);
	let index = 0;
	for(var i = 0; i < pixels.length; i +=4) { 
		if ((index % w) === 0){
			pixArray[Math.floor(index/h)] = new Array(w);
		}

		pixArray[Math.floor(index/h)][index % w] = Math.round(pixels[i + 3]/255);
		index++;
    }
    console.log(JSON.stringify(pixArray));

}
