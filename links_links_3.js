const fs = require('fs');
let kCode = "";

//Parameters:

const width = 36;//multiple of 6
const height = 42; //multiple of 6
const carrier = "3";

//Operation:

//Makes a width x height rectangle of links-links stitches on the front bed with carrier carrier.
//Uses an alternating-tucks cast-on.
//Each unit looks as following:

/*

x------x
xxxxxxxx
-xxxxxx-
-xxxxxx-
xxxxxxxx
x------x

*/



kCode += (";!knitout-2" + "\n");
kCode += (";;Carriers: 1 2 3 4 5 6 7 8 9 10" + "\n");


//Alternating tucks cast-on:

kCode += ("inhook " + carrier + "\n");

let min = 1;
let max = min + width - 1;

//we need to ensure that cast-on stitches below perled stitches are on back bed 
for (let n = max; n >= min; --n) {
	if ((max-n) % 2 == 0) {
		if ((max-n) % 6 === 0 || (max-n) % 6 === 5){
			kCode += ("tuck - f" + n + " " + carrier + "\n");
		} else {
			kCode += ("tuck - b" + n + " " + carrier + "\n");
		}
	}
}
for (let n = min; n <= max; ++n) {
	if ((max-n)%2 == 1) {
		if ((max-n) % 6 === 0 || (max-n) % 6 === 5){
			kCode += ("tuck + f" + n + " " + carrier + "\n");
		} else {
			kCode += ("tuck + b" + n + " " + carrier + "\n");
		}
	}
}

kCode += ("miss + f" + max + " " + carrier + "\n");

kCode += ("releasehook " + carrier + "\n");


let top_or_bottom_of_square = false; //on the top or bottom of each unit, the stitches are different
for (let r = 0; r < height; ++r) {

	if (r % 6 === 0 || r % 6 === 5) { top_or_bottom_of_square = true; }
	else { top_or_bottom_of_square = false; }

	if (r % 2 == 0) {
		let counter = 0;
		for (let n = max; n >= min; --n) {

			if (top_or_bottom_of_square) {
				//the first and sixth knit in each unit is treated differently
				if (counter % 6 === 0 || counter % 6 === 5){
					kCode += ("knit - f" + n + " " + carrier + "\n");
				} else {
					kCode += ("knit - b" + n + " " + carrier + "\n");
				}
			} else {
				if (counter % 6 === 0 || counter % 6 === 5){
					kCode += ("knit - b" + n + " " + carrier + "\n");
				} else {
					kCode += ("knit - f" + n + " " + carrier + "\n");
				}
			}
			counter++;
		}
	} else {
		let counter = 0;
		for (let n = min; n <= max; ++n) {

			if (top_or_bottom_of_square) {
				if (counter % 6 === 0 || counter % 6 === 5){
					kCode += ("knit + f" + n + " " + carrier + "\n");
				} else {
					kCode += ("knit + b" + n + " " + carrier + "\n");
				}
			} else {
				if (counter % 6 === 0 || counter % 6 === 5){
					kCode += ("knit + b" + n + " " + carrier + "\n");
				} else {
					kCode += ("knit + f" + n + " " + carrier + "\n");
				}
			}
			counter++;
		}
	}

	//transfer stitches to the front or back bed as needed
	if (r !== (height - 1)){
		if (r % 6 === 0){
			for (let n = min; n <= max; ++n) {
				if ((n-1) % 6 === 0 || (n-1) % 6 === 5){
					kCode += ("xfer f" + n + " b" + n + "\n");
				} else {
					kCode += ("xfer b" + n + " f" + n + "\n");
				}
			}
		} else if (r % 6 === 4){
			for (let n = min; n <= max; ++n) {
				if ((n-1) % 6 === 0 || (n-1) % 6 === 5){
					kCode += ("xfer b" + n + " f" + n + "\n");
				} else {
					kCode += ("xfer f" + n + " b" + n + "\n");
				}
			}
		}
	} else {
		//on the last row, move any stitches on the back bed to the front
		for (let n = min; n <= max; ++n) {
			if ((n-1) % 6 !== 0 && (n-1) % 6 !== 5){
				kCode += ("xfer b" + n + " f" + n + "\n");
			}
		}
	}
}

kCode += ("outhook " + carrier + "\n");

//write to file
fs.writeFile("./../knitout-backend-swg/examples/in/links_links_3.knitout", kCode, function(err) {
    if(err) {
        return console.log(err);
    }

    console.log("The file was saved!");
}); 