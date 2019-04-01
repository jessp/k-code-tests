const fs = require('fs');
let kCode = "";
/*
Not my code. From Textiles Lab at: https://github.com/textiles-lab/knitout-examples
Modified only to change width.
*/

//Parameters:
const height = 80;
const width = 20;
const carrierA = "3";
const carrierB = "2";
const sideBorders = 4;
const bottomBorder = 20;
const heightOfPatch = 20;

//Operation:

//Knits a section of a knit area in alternating colours
//Demonstrates non-colourblocking use of multiple colours/carriers in a 
//contained section.



kCode += (";!knitout-2" + "\n");
kCode += (";;Carriers: 1 2 3 4 5 6 7 8 9 10" + "\n");


kCode += ("inhook " + carrierA + "\n");


let min = 1;
let max = min + width - 1;

//alternating tucks cast-on
for (let n = max; n >= min; --n) {
	if ((max-n) % 2 == 0) {
		kCode += ("tuck - f" + n + " " + carrierA + "\n");
	}
}
for (let n = min; n <= max; ++n) {
	if ((max-n)%2 == 1) {
		kCode += ("tuck + f" + n + " " + carrierA + "\n");
	}
}

kCode += ("miss + f" + max + " " + carrierA + "\n");

//release the hook from the carrierA hook
kCode += ("releasehook " + carrierA + "\n");

// Rows of plain knitting:
for (let r = 0; r < height; ++r) {
	if (r == bottomBorder){
		kCode += ("inhook " + carrierB + "\n");
	}
	//every other row, change direction so we knit back and forth
	if (r % 2 == 0) {
		//we end on the right side (i.e., going in + direction), so we start by going towards the left (-))
		for (let n = max; n >= min; --n) {
			if (r < bottomBorder || r > bottomBorder + heightOfPatch){
				kCode += ("knit - f" + n + " " + carrierA + "\n");
			} else {
				if (n % 4 < 2){
					kCode += ("knit - f" + n + " " + carrierA + "\n");
					// kCode += ("tuck - f" + n + " " + carrierB + "\n");
				} else {
					// kCode += ("tuck - f" + n + " " + carrierA + "\n");
					kCode += ("knit - f" + n + " " + carrierB + "\n");
				}
			}
		}
	} else {
		for (let n = min; n <= max; ++n) {
			if (r < bottomBorder || r > bottomBorder + heightOfPatch){
				kCode += ("knit + f" + n + " " + carrierA + "\n");
			} else {
				if (n % 4 < 2){
					kCode += ("knit + f" + n + " " + carrierA + "\n");
					// kCode += ("tuck + f" + n + " " + carrierB + "\n");
				} else {
					// kCode += ("tuck + f" + n + " " + carrierA + "\n");
					kCode += ("knit + f" + n + " " + carrierB + "\n");
				}
			}
		}
	}

	if (r == bottomBorder){
		//release the hook from the carrierB hook
		kCode += ("releasehook " + carrierB + "\n");
	}

	if (r == (bottomBorder + heightOfPatch)){
		kCode += ("outhook " + carrierB + "\n");
	}
}

//bring yarn carrierA out of action
kCode += ("outhook " + carrierA + "\n");

//write to file
fs.writeFile("./../knitout-backend-swg/examples/in/multi_colour_pattern.knitout", kCode, function(err) {
    if(err) {
        return console.log(err);
    }

    console.log("The file was saved!");
}); 
