const fs = require('fs');
let kCode = "";
/*
Not my code. From Textiles Lab at: https://github.com/textiles-lab/knitout-examples
Modified only to change width.
*/

//Parameters:

const width = 24; //divisible by 4 and 6 for simplicity
const height = 24; //same as width
const carrier = "3";

//Operation:

//Makes a 5-sided (i.e. bottomless) cube-like structure.

/*


*        *       *
**     ****     **
***   ******   ***
**** ******** ****
******************
******************
******************
******************


*/



kCode += (";!knitout-2" + "\n");
kCode += (";;Carriers: 1 2 3 4 5 6 7 8 9 10" + "\n");


kCode += ("inhook " + carrier + "\n");


let min = 1;
let max = min + width - 1;

//cast-on on the front bed first...
for (let n = max; n >= min; --n) {
	if ((max-n) % 4 == 0) {
		kCode += ("tuck - f" + n + " " + carrier + "\n");
	}
}
for (let n = min; n <= max; ++n) {
	if ((max-n) % 4 == 2) {
		kCode += ("tuck + f" + n + " " + carrier + "\n");
	}
}

//and then on the back bed
for (let n = max; n >= min; --n) {
	if ((max-n) % 4 == 0) {
		kCode += ("tuck - b" + n + " " + carrier + "\n");
	}
}
for (let n = min; n <= max; ++n) {
	if ((max-n) % 4 == 2) {
		kCode += ("tuck + b" + n + " " + carrier + "\n");
	}
}

kCode += ("miss + f" + max + " " + carrier + "\n");

//release the hook from the carrier hook
kCode += ("releasehook " + carrier + "\n");


// Rows of plain knitting for the sides of the cubes
// Note, because we're knitting on both sides to make a sort of a tube
// height is really height/2.
for (let r = 0; r < height; ++r) {
	//essentially, knit going in only one way on each bed, so they only meet on the edges
	if (r % 2 === 0) {
		for (let n = max; n >= min; --n) {
			//knit on alternate needles so we can transfer using unused needles
			if (n % 2 === 0){
				kCode += ("knit - f" + n + " " + carrier + "\n");
			}
		}
	} else {
		for (let n = min; n <= max; ++n) {
			if (n % 2 === 0){
				kCode += ("knit + b" + n + " " + carrier + "\n");
			}
		}
	}
}

//we'll be updating our mins and maxes as we knit the peaks, so
//we'll declare some "var" variables here
var rightPeakMin = max/4 + max/2;
var rightPeakMax = max;

var middlePeakMin = max/4;
var middlePeakMax = max/4 + max/2;

var leftPeakMin = min;
var leftPeakMax = max/4;

//simple function to move a range of needles in a direction by transfering them to the opposing bed
function rack(needles, bed, direction){
	let secondBed = bed === "f" ? "b" : "f";

	let code = "";

	if (bed === "f"){
		code += ("rack " + (direction === "+" ? "-1" : "1") + "\n");
	} else {
		code += ("rack " + (direction === "+" ? "1" : "-1") + "\n");
	}

	for (var n = 0; n < needles.length; n++){
		code += ("xfer " + bed + needles[n] + " "  + secondBed + (needles[n] + (direction == "+" ? 1 : -1)) + "\n");
	}

	if (bed === "f"){
		code += ("rack " + (direction === "+" ? "1" : "-1") + "\n");
	} else {
		code += ("rack " + (direction === "+" ? "-1" : "1") + "\n");
	}

	for (var n = 0; n < needles.length; n++){
		code += ("xfer "  + secondBed + (needles[n] + (direction == "+" ? 1 : -1)) + " " + bed + (needles[n] + (direction == "+" ? 2 : -2)) + "\n");
	}

	code += ("rack 0" + "\n");

	return code;
}

function createNeedleArray(min, max){
	let newArray = [];
	for (var i = min; i <= max; i++){
		if (i % 2 === 0){
			newArray.push(i);
		}
	}
	return newArray;

}



//The peaks
for (let r = 0; r < height; ++r) {
	if (r % 6 === 0){

		let leftPeakNeedles = createNeedleArray(leftPeakMin, leftPeakMax);
		let rightPeakNeedles = createNeedleArray(rightPeakMin, rightPeakMax);


		kCode += rack(leftPeakNeedles, "f", "+");
		kCode += rack(rightPeakNeedles, "f", "-");
		kCode += rack(leftPeakNeedles, "b", "+");
		kCode += rack(rightPeakNeedles, "b", "-");

		middlePeakMin += 1;
		middlePeakMax -= 1;

		rightPeakMin = middlePeakMax + 1;
		rightPeakMax -= 2;

		leftPeakMax = middlePeakMin - 1;
		leftPeakMin += 2;
	}


	if (r % 2 === 0) {
		//right peak
		for (let n = rightPeakMax; n >= rightPeakMin; --n){
			if (n % 2 === 0){
				kCode += ("knit - f" + n + " " + carrier + "\n");
			}
		}

		//middle peak
		for (let n = middlePeakMax; n >= middlePeakMin; --n){
			if (n % 2 === 0){
				kCode += ("knit - f" + n + " " + carrier + "\n");
			}
		}

		//left peak
		for (let n = leftPeakMax; n >= leftPeakMin; --n){
			if (n % 2 === 0){
				kCode += ("knit - f" + n + " " + carrier + "\n");
			}
		}


	} else {
		//left peak
		for (let n = leftPeakMin; n <= leftPeakMax; ++n){
			if (n % 2 === 0){
				kCode += ("knit + b" + n + " " + carrier + "\n");
			}
		}

		// middle peak
		for (let n = middlePeakMin; n <= middlePeakMax; ++n){
			if (n % 2 === 0){
				kCode += ("knit + b" + n + " " + carrier + "\n");
			}
		}

		//right peak
		for (let n = rightPeakMin; n <= rightPeakMax; ++n){
			if (n % 2 === 0){
				kCode += ("knit + b" + n + " " + carrier + "\n");
			}
		}
	}
}

//bring yarn carrier out of action
kCode += ("outhook " + carrier + "\n");

//write to file
fs.writeFile("./../knitout-backend-swg/examples/in/five_sided_cube.knitout", kCode, function(err) {
    if(err) {
        return console.log(err);
    }

    console.log("The file was saved!");
}); 
