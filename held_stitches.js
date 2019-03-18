const fs = require('fs');
let kCode = "";

//Parameters:

const width = 16;
const height = 80;//even to simplify code
const shortRowWidth = 6;
const heldRows = 6; //even to simplify code, six is the maximum
const plainKnittingRows = 8;
const carrier = "3";
const startShortRow = Math.floor(width/2 - shortRowWidth/2);

//Operation:

//Makes a width x height rectangle of plain knitting with a set of stitches held in the middle 
//on the front bed with carrier carrier.
//Creates series of bumps in the centre of the fabric.
//Uses an alternating-tucks cast-on.

/*

xxxxxxxx
xxxxxxxx
xxxxxxxx
  xxx
  xxx
  xxx
xxxxxxxx
xxxxxxxx
xxxxxxxx

*/


kCode += (";!knitout-2" + "\n");
kCode += (";;Carriers: 1 2 3 4 5 6 7 8 9 10" + "\n");


kCode += ("inhook " + carrier + "\n");

let min = 1;
let max = min + width - 1;

//alternating tucks cast-on
for (let n = max; n >= min; --n) {
	if ((max-n) % 2 == 0) {
		kCode += ("tuck - f" + n + " " + carrier + "\n");
	}
}
for (let n = min; n <= max; ++n) {
	if ((max-n)%2 == 1) {
		kCode += ("tuck + f" + n + " " + carrier + "\n");
	}
}

kCode += ("miss + f" + max + " " + carrier + "\n");

//release the hook from the carrier hook
kCode += ("releasehook " + carrier + "\n");

function knitNormally(numRows){
	var code = "";
	// Rows of plain knitting before held rows:
	for (let r = 0; r < numRows; ++r) {
		//every other row, change direction so we knit back and forth
		if (r % 2 == 0) {
			//we end on the right side (i.e., going in + direction), so we start by going towards the left (-))
			for (let n = max; n >= min; --n) {
				code += ("knit - f" + n + " " + carrier + "\n");
			}
		} else {
			for (let n = min; n <= max; ++n) {
				code += ("knit + f" + n + " " + carrier + "\n");
			}
		}
	}
	return code;
}

function knitHeldStitches(numRows){
	var code = "";
	//Knit held short rows
	for (let r = 0; r < numRows; ++r) {
		if (r % 2 == 0) {
			for (let n = (startShortRow + shortRowWidth); n >= startShortRow; --n) {
				code += ("knit - f" + n + " " + carrier + "\n");
			}
		} else {
			for (let n = startShortRow; n <= (startShortRow + shortRowWidth); ++n) {
				code += ("knit + f" + n + " " + carrier + "\n");
			}
		}
	}
	return code;
}



for (let r = 0; r < height - plainKnittingRows; r += (heldRows + plainKnittingRows)){
	kCode += knitNormally(plainKnittingRows);
	kCode += knitHeldStitches(heldRows);
}

kCode += knitNormally(plainKnittingRows);



//bring yarn carrier out of action
kCode += ("outhook " + carrier + "\n");

//write to file
fs.writeFile("./../knitout-backend-swg/examples/in/held_stitches.knitout", kCode, function(err) {
    if(err) {
        return console.log(err);
    }

    console.log("The file was saved!");
}); 
