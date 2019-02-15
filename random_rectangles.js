const fs = require('fs');
let kCode = "";


//Parameters:

const width = 40;
const height = 40;
const startingCarrier = "3";
const carriers = ["3", "2", "1"];
const styles = ["knit", "perl", "waffle", "seed", "rib", "irishmoss"];


//Operation:

//Makes a width x height rectangle of knitting.
//The rectangle is sub-divided into random patterns and colours of random size.
//Uses an alternating-tucks cast-on.

let rects = [
{
	x: 0,
	y: 0,
	width: width,
	height: height,
	carrier: getRandomFromList(carriers),
	styles: getRandomFromList(styles)
}

];

generateRectangles(rects, rects[0], true);


//function to return a random entry from carrier or styles list
function getRandomFromList(theArray){
	return theArray[Math.floor(Math.random() *  theArray.length)];
}

//recursive function to subdivide rectangle
function generateRectangles(rectangleArray, prevRect, horz){
	//if we're dividing horizontally, ie. reducing width
	if (horz){
		subdivide(rectangleArray, prevRect, true);
	} else {
		subdivide(rectangleArray, prevRect, false);
	}
}


function subdivide(rectangleArray, prevRect, horz){
	let newRectangle = {
		x: 0,
		y: 0,
		width: 0,
		height: 0,
		carrier: getRandomFromList(carriers),
		styles: getRandomFromList(styles)
	};

	let dimensionA = horz ? "width" : "height"; //dimension we're changing with this slice
	let dimensionB = horz ? "height" : "width";
	let pointA = horz ? "x" : "y"; //starting point that changes in newRectangle
	let pointB = horz ? "y" : "x";

	//subdivide between 20% and 80% of direction
	let linePosition = Math.floor((Math.random() * prevRect[dimensionA] * 0.8) + (prevRect[dimensionA] * 0.2));

	newRectangle[pointA] = prevRect[pointA] + linePosition;
	newRectangle[pointB] = prevRect[pointB];
	newRectangle[dimensionB] = prevRect[dimensionB];
	newRectangle[dimensionA] = prevRect[dimensionA] - linePosition;
	if (newRectangle[dimensionA] + newRectangle[pointA] > 40 || newRectangle[dimensionB] + newRectangle[pointB] > 40){
		console.log(linePosition, "A", prevRect, "B", newRectangle);
	}
	rectangleArray.push(newRectangle);

	if (newRectangle[dimensionB] > 6 && Math.random() > 0.3){
		generateRectangles(rectangleArray, newRectangle, !horz);
	}

	prevRect[dimensionA] = linePosition;
	//if the rectangle is tall enough and our random function holds true, subdivide the rectangle further
	if (prevRect[dimensionB] > 6 && Math.random() > 0.3){

		generateRectangles(rectangleArray, prevRect, !horz);
	}


}

visualizeAndTest(width, height, rects);


function visualizeAndTest(width, height, rects){
	let startingArray = [];
	for (var i = 0; i < height; i++){
		startingArray.push(new Array(width).fill("x"));
	}

	for (var r = 0; r < rects.length; r ++){
		let rect = rects[r];
		for (var h = rect["y"]; h < (rect["y"] + rect["height"]); h++){
			for (var w = rect["x"]; w < (rect["x"] + rect["width"]); w++){
				startingArray[h][w] = rect["styles"][0];
			}
		}
	}

	for (var i = 0; i < height; i++){
		console.log(startingArray[i].join(" "));
	}
}