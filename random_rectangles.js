const fs = require('fs');
let kCode = "";


//Parameters:

const width = 40;
const height = 40;
const carrier = "3";
const styles = ["knit", "perl", "waffle", "seed", "rib", "irishmoss", "cardigan"];//all possible styles

kCode += (";!knitout-2" + "\n");
kCode += (";;Carriers: 1 2 3 4 5 6 7 8 9 10" + "\n");

//Operation:

//Makes a width x height rectangle of knitting using carrier 3.
//The rectangle is sub-divided into random patterns of random size.
//Future work may be completed to also support random colours in this knit pattern.
//It's meant so demonstrate how to switch between different textures programmatically.
//Uses an alternating-tucks cast-on.
//We add a knitted border to eliminate issues with edges and cast-on

let rects = [
{
	x: 0,
	y: 0,
	width: width,
	height: height,
	carrier: carrier,
	styles: getRandomFromList(styles)
}

];

generateRectangles(rects, rects[0], true, carrier);
let knittableRectangles = convertToGrid(width, height, rects);
let patternedRectangles = knitToPatterns(knittableRectangles);
let patternedRectanglesWithMeta = addXfersAndCastOn(patternedRectangles, carrier, kCode);



//function to return a random entry from carrier or styles list
function getRandomFromList(theArray){
	return theArray[Math.floor(Math.random() *  theArray.length)];
}

//recursive function to subdivide rectangle
function generateRectangles(rectangleArray, prevRect, horz, car){
	//if we're dividing horizontally, ie. reducing width
	if (horz){
		subdivide(rectangleArray, prevRect, true, car);
	} else {
		subdivide(rectangleArray, prevRect, false, car);
	}
}


function subdivide(rectangleArray, prevRect, horz, car){
	let newRectangle = {
		x: 0,
		y: 0,
		width: 0,
		height: 0,
		carrier: car,
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
	//sanity test to ensure we're not generating poor rectangles
	if (newRectangle[dimensionA] + newRectangle[pointA] > 40 || newRectangle[dimensionB] + newRectangle[pointB] > 40){
		console.log(linePosition, "A", prevRect, "B", newRectangle);
	}
	rectangleArray.push(newRectangle);

	if (newRectangle[dimensionB] > 6 && Math.random() > 0.3){
		generateRectangles(rectangleArray, newRectangle, !horz, car);
	}

	prevRect[dimensionA] = linePosition;
	//if the rectangle is tall enough and our random function holds true, subdivide the rectangle further
	if (prevRect[dimensionB] > 6 && Math.random() > 0.3){

		generateRectangles(rectangleArray, prevRect, !horz, car);
	}


}

//a function that converts the rectangle to a grid
function convertToGrid(width, height, rects){
	let startingArray = [];
	for (var i = 0; i < height; i++){
		startingArray.push(new Array(width).fill("x"));
	}

	for (var r = 0; r < rects.length; r ++){
		let rect = rects[r];
		for (var h = rect["y"]; h < (rect["y"] + rect["height"]); h++){
			for (var w = rect["x"]; w < (rect["x"] + rect["width"]); w++){
				startingArray[h][w] = [rect["styles"][0], rect["carrier"]];
			}
		}
	}

	return startingArray;
}

//a function that converts the code to the stitches for each line
//this function doesn't handle transfers or other set-up
function knitToPatterns(rectangles){
	let patternedKnit = [];
	for (let row = 0; row < rectangles.length; row++){
		let direction = row % 2 === 0 ? "-" : "+";
		let thisRow = [];
		for (let column = 0; column < rectangles[row].length; column++){
			//we're going back and forth, so let's assign stitches like this
			let index = row % 2 === 0 ? (rectangles[row].length - column - 1) : column;

			//we add 1 to all indexes so we start on needle 2 with the border
			if (rectangles[row][index][0] == "k"){
				knitKnits(index + 2, rectangles[row][index][1], direction, thisRow);
			} else if (rectangles[row][index][0] == "p"){
				knitPerls(index + 2, rectangles[row][index][1], direction, thisRow);
			} else if (rectangles[row][index][0] == "w"){
				knitWaffle(index + 2, row, rectangles[row][index][1], direction, thisRow);
			} else if (rectangles[row][index][0] == "s"){
				knitSeed(index + 2, row, rectangles[row][index][1], direction, thisRow);
			} else if (rectangles[row][index][0] == "r"){
				knitRib(index + 2, row, rectangles[row][index][1], direction, thisRow);
			} else if (rectangles[row][index][0] == "i"){
				knitIrishMoss(index + 2, row, rectangles[row][index][1], direction, thisRow);
			} else if (rectangles[row][index][0] == "c"){
				knitCardigan(index + 2, row, rectangles[row][index][1], direction, thisRow);
			}
		}
		patternedKnit.push(thisRow);
	}
	return patternedKnit;
}



//a function that adds xfers to back or front based on our generated pattern
function addXfersAndCastOn(data, car, code){
	//create new variable for width with added knit border on left and right
	let totalWidth = data[0].length + 2;
	code += doCastOn(car, totalWidth);
	//transfer to the correct bed from the cast-on method
	for (let indx = data[0].length - 1; indx >= 0; indx--){
		if (data[0][indx][7] == "b"){
			let stitchIndex = data[0][indx].split(" ")[2].slice(1);
			code += ("xfer f" + stitchIndex + " b" + stitchIndex  + "\n");
		}
	}

	for (let row = 0; row < data[0].length; row++){
		let direction = row % 2 === 0 ? "-" : "+";
		var transferIndexes = new Array(totalWidth).fill(0);
		for (let col = 0; col < totalWidth; col++){
			//knit normally on the first and last row
			if (col === 0 || col === (totalWidth - 1)){
				let knitNum = row % 2 === 0 ? (totalWidth - col) : (col + 1);
				code += ("knit " + direction + " f" + knitNum + " " + car + "\n");
			} else {
				if (row < data[0].length-1){
					//remember that we're knitting back and forth, so we have to take that into account when comparing the next row of stitches
					let index = row % 2 === 0 ? (totalWidth - col - 2) : (col - 1);
					let nextRowIndex = row % 2 !== 0 ? (totalWidth - col - 2) : (col - 1);
					//check if we're transfering to the front or back of the fabric
					let sideOfFabric = data[row][index][7];
					let nextSideOfFabric = data[row + 1][nextRowIndex][7];

					if (sideOfFabric != nextSideOfFabric){
						let stitchIndex = data[row][index].split(" ")[2].slice(1);
						transferIndexes[col] = [nextSideOfFabric, stitchIndex];

						//we can't transfer a tucked loop from one side of the fabric to the other
						//so, instead we'll convert it to a knit, while keeping the other params the same.
						if (data[row][index].slice(0, 4) === "tuck") {
							data[row][index] = "knit" + data[row][index].slice(4);
						}
					}
				}
				code += data[row][col - 1] + "\n";
			}	
		}

		//write a line of transfers into the correct side of the fabric to the next row
		for (let indx = 0; indx < totalWidth; indx++){
			if (transferIndexes[indx] !== 0){
				let fromVariable = transferIndexes[indx][0] === "b" ? "f" : "b";
				code += ("xfer " + fromVariable + transferIndexes[indx][1] + " " + transferIndexes[indx][0] + transferIndexes[indx][1] + "\n");
			}
		}
	}

	//take carrier hook out of action
	code += ("outhook " + car + "\n");

	writeToFile(code)

}

function writeToFile(code){
	//write to file
	fs.writeFile("./../knitout-backend-swg/examples/in/random_rectangles3.knitout", code, function(err) {
	    if(err) {
	        return console.log(err);
	    }

	    console.log("The file was saved!");
	}); 
}


//Alternating tucks cast-on:
function doCastOn(carrier, width){
	var code = "";

	code += ("inhook " + carrier + "\n");

	//we need to ensure that cast-on stitches below perled stitches are on back bed 
	for (let n = width; n >= 1; --n) {
		if ((width-n) % 2 == 0 ) {
			if ((width-n) % 8 < 4){
				code += ("tuck - f" + n + " " + carrier + "\n");
			} else {
				code += ("tuck - f" + n + " " + carrier + "\n");
			}
		}
	}
	for (let n = 1; n <= width; ++n) {
		if ((width-n)%2 == 1) {
			if ((width-n) % 8 < 4){
				code += ("tuck + f" + n + " " + carrier + "\n");
			} else {
				code += ("tuck + f" + n + " " + carrier + "\n");
			}
		}
	}

	code += ("miss + b" + width + " " + carrier + "\n");

	code += ("releasehook " + carrier + "\n");

	for (let column = width; column > 0; column--) {
		code += ("knit - f" + column + " " + carrier + "\n");
	}
	for (let column = 1; column <= width; column++) {
		code += ("knit + f" + column + " " + carrier + "\n");
	}

	return code;
}


//fairly simple functions to change the knits, perls, and tucks required for each pattern
function knitKnits(column, carrier, direction, rowArray){
	rowArray.push("knit " + (direction) + " f" + column + " " + carrier);
}

function knitPerls(column, carrier, direction, rowArray){
	rowArray.push("knit " + (direction) + " b" + column + " " + carrier);
}

function knitWaffle(column, row, carrier, direction, rowArray){
	let order = [
		["f", "b", "b"],
		["f", "b", "b"],
		["f", "f", "f"],
		["f", "f", "f"]
	];

	rowArray.push("knit " + (direction) + " " + order[row % 4][column % 3] + column + " " + carrier);

}

function knitSeed(column, row, carrier, direction, rowArray){
	let order = [
		["f", "b"],
		["b", "f"],
	];

	rowArray.push("knit " + (direction) + " " + order[column % 2][row % 2] + column + " " + carrier);

}

function knitRib(column, row, carrier, direction, rowArray){

	let order = ["f", "f", "b", "b"];

	rowArray.push("knit " + (direction) + " " + order[column % 4] + column + " " + carrier);
}

function knitIrishMoss(column, row, carrier, direction, rowArray){
	let order = [
			["f", "f", "b", "b"],
			["b", "b", "f", "f"],
	];

	rowArray.push("knit " + (direction) + " " + order[row % 2][column % 4] + column + " " + carrier);
}

function knitCardigan(column, row, carrier, direction, rowArray){
	let order = [
			[["knit", "f"], ["knit", "b"]],
			[["knit", "f"], ["tuck", "b"]]
	];

	rowArray.push(order[row % 2][column % 2][0] + " " + (direction) + " " + order[row % 2][column % 2][1] + column + " " + carrier);
}