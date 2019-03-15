const fs = require('fs');
let kCode = "";

//Parameters:

const width = 36;
const carrier = "3";

let rowsPerStep = 2; //how many rows knitted at each stepWidth. Pretty sure this has to be a multiple of 2
let stepWidth = 4; //how many rows we decrease per step
let numCurves = 6; //number of triangles we want to make
const height = Math.min(width/stepWidth) * rowsPerStep * numCurves; //calculate the height based on other parameters


//Operation:

//Makes a curving piece of joined fabric made of plain knitting on the front bed with carrier carrier.
//Uses an alternating-tucks cast-on.

/*
In DAT viewer appears as:

xxx
xxx
xxxx
xxxx
xxxxx
xxxxx
xxx
xxx
xxxx
xxxx
xxxxx
xxxxx
xxx
xxx
xxxx
xxxx
xxxxx
xxxxx

(repeated according to num curves)

*/


kCode += (";!knitout-2" + "\n");
kCode += (";;Carriers: 1 2 3 4 5 6 7 8 9 10" + "\n");

kCode += ("inhook " + carrier + "\n");


let min = 1;
let max = min + width - 1;

//alternating tucks cast-on
for (let column = max; column >= min; --column) {
	if ((max - column) % 2 == 0) {
		kCode += ("tuck - f" + column + " " + carrier + "\n");
	}
}
for (let column = min; column <= max; ++column) {
	if ((max - column)%2 == 1) {
		kCode += ("tuck + f" + column + " " + carrier + "\n");
	}
}

kCode += ("miss + f" + max + " " + carrier + "\n");

//release the hook from the carrier hook
kCode += ("releasehook " + carrier + "\n");


//direction is important, so let's start with a row knitting towards the left to put us in the correct direction
for (let column = max; column >= min; --column) {
	kCode += ("knit - f" + column + " " + carrier + "\n");
}

//for each curved segment...
for (let curve = 0; curve < numCurves; curve ++) {
	//calculate how many times we have to decrease the width by stepWidth
	let steps = Math.min(width/stepWidth);
	//for each change in width...
	for (let step = 0; step < steps; step ++){
		//calculate the width of the row based on how many "steps" we're at in the curve
		let rowWidth = max - step * stepWidth;
		//knit back and forth stepWidth times at each given width
		for (let row = 0; row < rowsPerStep; row ++){
			//direction is important, so we want to start our first row in the curve going right (+)
			if (row % 2 == 1) {
				for (let column = rowWidth; column >= min; --column) {
					kCode += ("knit - f" + column + " " + carrier + "\n");
				}
			} else {
				for (let column = min; column <= rowWidth; ++column) {
					kCode += ("knit + f" + column + " " + carrier + "\n");
				}
			}
		}
	}
}

//bring yarn carrier out of action
kCode += ("outhook " + carrier + "\n");

//write to file
fs.writeFile("./../knitout-backend-swg/examples/in/curved_fabric.knitout", kCode, function(err) {
    if(err) {
        return console.log(err);
    }

    console.log("The file was saved!");
}); 