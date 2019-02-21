const fs = require('fs');
let kCode = "";

//Parameters:

const width = 16;
const height = 40;//even to simplify code
const shortRowWidth = 6;
const heldRows = 10; //even to simplify code
const carrier = "3";
const startShortRow = Math.floor(width/2 - shortRowWidth/2);

//Operation:

//Variation on held_stitches where care isn't taken to ensure the knitting is continuous before and
//after the bridge.
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

// Rows of plain knitting before held rows:
for (let r = 0; r < height/2; ++r) {
	//every other row, change direction so we knit back and forth
	if (r % 2 == 0) {
		//we end on the right side (i.e., going in + direction), so we start by going towards the left (-))
		for (let n = max; n >= min; --n) {
			kCode += ("knit - f" + n + " " + carrier + "\n");
		}
	} else {
		for (let n = min; n <= max; ++n) {
			kCode += ("knit + f" + n + " " + carrier + "\n");
		}
	}
}

//Knit held short rows
for (let r = 0; r < heldRows; ++r) {
	if (r % 2 == 0) {
		for (let n = (startShortRow + shortRowWidth); n >= startShortRow; --n) {
			kCode += ("knit - f" + n + " " + carrier + "\n");
		}
	} else {
		for (let n = startShortRow; n <= (startShortRow + shortRowWidth); ++n) {
			kCode += ("knit + f" + n + " " + carrier + "\n");
		}
	}
}

// Rows of plain knitting after held rows:
for (let r = 0; r < height/2; ++r) {
	if (r % 2 == 0) {
		for (let n = max; n >= min; --n) {
			kCode += ("knit - f" + n + " " + carrier + "\n");
		}
	} else {
		for (let n = min; n <= max; ++n) {
			kCode += ("knit + f" + n + " " + carrier + "\n");
		}
	}
}



//bring yarn carrier out of action
kCode += ("outhook " + carrier + "\n");

//write to file
fs.writeFile("./../knitout-backend-swg/examples/in/held_stitches_alternate.knitout", kCode, function(err) {
    if(err) {
        return console.log(err);
    }

    console.log("The file was saved!");
}); 
