const fs = require('fs');
let kCode = "";

//Parameters:

const width = 40;
const numDecreases = 24; //number of rows before we stop decreasing width
const height = 40;
const carrier = "3";
const numTransfer = 4;//number of stitches to transfer at a time

//Operation:
//Makes a tube that slowly decreases in radius towards the top, evenly decreasing in size on both sides.
//We accomplish this by knitting on every other needle on both sides, so we have a spare needle on the
//opposite bed to knit on.

/*
	   x
	   x
	   x
	  xxx
	 xxxxx
	xxxxxxx

*/


kCode += (";!knitout-2" + "\n");
kCode += (";;Carriers: 1 2 3 4 5 6 7 8 9 10" + "\n");


//Alternating tucks cast-on:

kCode += ("inhook " + carrier + "\n");

var min = 1;
var max = min + width - 1;

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

kCode += ("releasehook " + carrier + "\n");


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


for (let r = 0; r < height; ++r) {
	//every 4 rows (technically two since we're alternating between back bed and front bed)...
	if (r % 4 == 0 && r > 0 && max >= 3 && r < numDecreases){

		//transfer needles to a new position on the front bed
		let lastFourFrontNeedles = [...Array(4)].map((_, i) => max - i * 2);
		kCode += rack(lastFourFrontNeedles, "f", "-");
		let firstFourFrontNeedles = [...Array(4)].map((_, i) => min + i * 2 + 1);
		kCode += rack(firstFourFrontNeedles, "f", "+");

		//transfer needles to a new position on the back bed
		let lastFourBackNeedles = [...Array(4)].map((_, i) => max - i * 2);
		kCode += rack(lastFourBackNeedles, "b", "-");
		let firstFourBackNeedles = [...Array(4)].map((_, i) => min + i * 2 + 1);
		kCode += rack(firstFourBackNeedles, "b", "+");

		//decrease the width
		max = max - 2;
		min = min + 2;

	}

	//essentially, knit going in only one way on each bed, so they only meet on the edges
	if (r % 2 == 0) {
		for (let n = max; n >= min; --n) {
			//remember we're knitting on every other needle
			if (n % 2 == 0){
				kCode += ("knit - f" + n + " " + carrier + "\n");
			}
		}
	} else {
		for (let n = min; n <= max; ++n) {
			if (n % 2 == 0){
				kCode += ("knit + b" + n + " " + carrier + "\n");
			}
		}
	}
}

kCode += ("outhook " + carrier + "\n");

//write to file
fs.writeFile("./../knitout-backend-swg/examples/in/centered_cone.knitout", kCode, function(err) {
    if(err) {
        return console.log(err);
    }

    console.log("The file was saved!");
}); 