const fs = require('fs');
let kCode = "";

//Parameters:

const width = 16;
const height = 80;
const carrier = "3";

//Operation:
//Makes a tube that slants on an angle
/*
xxxxx 
 xxxxx
  xxxxx
   xxxxx
*/


kCode += (";!knitout-2" + "\n");
kCode += (";;Carriers: 1 2 3 4 5 6 7 8 9 10" + "\n");


//Alternating tucks cast-on:

kCode += ("inhook " + carrier + "\n");

let min = 2;
let max = min + width;

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

//carriage direction is important; we always want to be going towards where we're casting on new needles
//so we'll knit a plain line of stitches before we start stitching
for (let n = max; n >= min; --n) {
	if (n % 2 == 0){
		kCode += ("knit - f" + n + " " + carrier + "\n");
	}
}


for (let r = 0; r < height; ++r) {

	//essentially, knit going in only one way on each bed, so they only meet on the edges
	if (r % 2 == 1) {
		for (let n = max; n >= min; --n) {
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

	if (r % 4 == 3){
		//transfer needles to a new position on the front bed
		kCode += rack([min, max - 2, max - 4, max], "f", "+");
		//transfer needles to a new position on the back bed
		kCode += rack([min, max - 2, max - 4, max], "b", "+");
		min += 2;
		max += 2;
	} 
}

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

kCode += ("outhook " + carrier + "\n");

//write to file
fs.writeFile("./../knitout-backend-swg/examples/in/angled_tube_2.knitout", kCode, function(err) {
    if(err) {
        return console.log(err);
    }

    console.log("The file was saved!");
}); 