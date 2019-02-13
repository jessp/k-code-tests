const fs = require('fs');
let kCode = "";

//Parameters:

const width = 32;//multiple of 8
const height = 40;
const carrier = "3";

//Operation:

//Makes a width x height rectangle of links-links stitches on the front bed with carrier carrier.
//Uses an alternating-tucks cast-on.
//Each unit looks as following:

/*
xxxxxxxx
xxxx----
xxxx----
*/

//Note:
//We start with squares on the front bed because the machine doesn't like making the first stitch with the back bed.


kCode += (";!knitout-2" + "\n");
kCode += (";;Carriers: 1 2 3 4 5 6 7 8 9 10" + "\n");


//Alternating tucks cast-on:

kCode += ("inhook " + carrier + "\n");

let min = 1;
let max = min + width - 1;

//we need to ensure that cast-on stitches below perled stitches are on back bed 
for (let n = max; n >= min; --n) {
	if ((max-n) % 2 == 0 ) {
		if ((max-n) % 8 < 4){
			kCode += ("tuck - f" + n + " " + carrier + "\n");
		} else {
			kCode += ("tuck - b" + n + " " + carrier + "\n");
		}
	}
}
for (let n = min; n <= max; ++n) {
	if ((max-n)%2 == 1) {
		if ((max-n) % 8 < 4){
			kCode += ("tuck + f" + n + " " + carrier + "\n");
		} else {
			kCode += ("tuck + b" + n + " " + carrier + "\n");
		}
	}
}

kCode += ("miss + b" + max + " " + carrier + "\n");

kCode += ("releasehook " + carrier + "\n");


let reversed = true;//every 5th and 6th row, all stitches in a row are on the front bed
for (let r = 0; r < height; ++r) {

	let isFront = false;

	if (r % 6 === 5 || r % 6 === 4) { reversed = false; }
	else { reversed = true; }

	if (r % 2 == 0) {
		let counter = 0;
		for (let n = max; n >= min; --n) {
			counter++;

			if (reversed) {
				kCode += ("knit - "  + (isFront ? "b" : "f") + n + " " + carrier + "\n");
			} else {
				kCode += ("knit - f" + n + " " + carrier + "\n");
			}
			//every four stitches, alternate between front and back stitches
			if (counter % 4 === 0) { isFront = !isFront;} 
		}
	} else {
		let counter = 0;
		for (let n = min; n <= max; ++n) {
			counter++;

			if (reversed) {
				kCode += ("knit + "  + (isFront ? "f" : "b") + n + " " + carrier + "\n");
			} else {
				kCode += ("knit + f" + n + " " + carrier + "\n");
			}
			//every four stitches, alternate between front and back stitches
			if (counter % 4 === 0) { isFront = !isFront;}
		}
	}

	if (r !== (height - 1)){ 
		if (r % 6 === 3){ //after four rows, transfer relevent stitches from back bed to front
			for (let n = min; n <= max; ++n) {
				if ((n-1) % 8 < 4){
					kCode += ("xfer b" + n + " f" + n + "\n");
				} 
			}
		} else if (r % 6 === 5){
			for (let n = min; n <= max; ++n) {
				if ((n-1) % 8 < 4){
					kCode += ("xfer f" + n + " b" + n + "\n");
				} 
			}
		}
	} else {
		//on the last row, bring any stitches on the back bed to the front
		for (let n = min; n <= max; ++n) {
			if ((n-1) % 8 < 4){
				kCode += ("xfer b" + n + " f" + n + "\n");
			} 
		}
	}

}

kCode += ("outhook " + carrier + "\n");

//write to file
fs.writeFile("./../knitout-backend-swg/examples/in/links_links_2.knitout", kCode, function(err) {
    if(err) {
        return console.log(err);
    }

    console.log("The file was saved!");
}); 