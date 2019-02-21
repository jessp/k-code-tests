const fs = require('fs');
let kCode = "";

//Parameters:

const width = 30;
const height = 30;//even to simplify code
const gapWidth = 12; //how many stitches we're holding width-wise; must be less than width/2 -1
const heldRowHeight = 6;//a factor of height for simplicity, even for simplicity
const carrier = "3";

//Operation:

//Makes a width x height rectangle of plain knitting with a set of stitches held in the middle 
//on the front bed with carrier carrier.
//Uses an alternating-tucks cast-on.

/*

xxxxxxxx
xxxxxxxx
xxxxxxxx
xxxxx
xxxxx
   xxxxx
   xxxxx
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

// Knit 2 rows of plain knitting before held rows:
for (let r = 0; r < 2; ++r) {
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

let tempMin;
let tempMax;

for (let r = 0; r < height; r++){
	//we will alternate between having a gap of held stitches on the left side and the right side
	//these variables will help us keep consistent code
	if (r % heldRowHeight < heldRowHeight/2){
		//if we're about to change the gap direction, our mins and maxes look slightly different
		if (r % heldRowHeight == heldRowHeight/2 - 1){
			tempMin = min;
			tempMax = max;
		} else {
			tempMin = gapWidth;
			tempMax = max;
		}
	} else {
		//if we're about to change the gap direction, our mins and maxes look slightly different
		if (r % heldRowHeight == heldRowHeight - 1){
			tempMin = min;
			tempMax = max;
		} else {
			tempMin = min;
			tempMax = width - gapWidth;
		}
	}
	if (r % 2 == 0) {
		//we end on the right side (i.e., going in + direction), so we start by going towards the left (-))
		for (let n = tempMax; n >= tempMin; --n) {
			kCode += ("knit - f" + n + " " + carrier + "\n");
		}
	} else {
		for (let n = tempMin; n <= tempMax; ++n) {
			kCode += ("knit + f" + n + " " + carrier + "\n");
		}
	}

}

// Knit 2 rows of plain knitting after held rows:
for (let r = 0; r < 2; ++r) {
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
fs.writeFile("./../knitout-backend-swg/examples/in/short_rows.knitout", kCode, function(err) {
    if(err) {
        return console.log(err);
    }

    console.log("The file was saved!");
}); 
