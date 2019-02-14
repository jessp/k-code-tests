const fs = require('fs');
let kCode = "";

//Parameters:

const width = 33;//odd number so we have a knit rather than a miss on both ends
const height = 40;
const carrier = "3";

//Operation:

//Makes a width x height rectangle of plain knitting on the front bed with carrier carrier.
//The lower half of the fabric is full knit, the upper half is half guage.
//Uses an alternating-tucks cast-on.

/*
xxxxxxxxxxx
x x x x x x
x x x x x x
xxxxxxxxxxx
xxxxxxxxxxx
xxxxxxxxxxx
*/



kCode += (";!knitout-2" + "\n");
kCode += (";;Carriers: 1 2 3 4 5 6 7 8 9 10" + "\n");

//Alternating tucks cast-on:

kCode += ("inhook " + carrier + "\n");

let min = 1;
let max = min + width - 1;


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

kCode += ("releasehook " + carrier + "\n");

//knit normally for the bottom half of the swatch
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

//for the upper half of the fabric, alternate between knits and misses
for (let r = height/2; r < height; ++r) {
	//before the first row of half guage, transfer threads to be on missed needles
	//onto a neighbouring needle. Direction of racking shouldn't matter
	if (r === height/2){
		//remember, our transfering process involves moving transfering back and forth from the back to the front
		//carrier, and moving ("racking") the back carrier

		//transfer from front bed to back
		for (let n = max; n >= min; --n) {
			if (n % 2 === 0){
				kCode += ("xfer f" + n + " b" + n + "\n");
			}
		}

		kCode += ("rack 1" + "\n"); //move back bed one over

		//move from back bed to front in new position
		for (let n = max; n >= min; --n) {
			if (n % 2 === 0){
				kCode += ("xfer b" + n + " f" + (n+1) + "\n");
			}
		}

		kCode += ("rack 0" + "\n"); //return racking to initial position

	}
	if (r % 2 == 0) {
		for (let n = max; n >= min; --n) {
			if (n % 2 === 0){
				kCode += ("miss - f" + n + " " + carrier + "\n");
			} else {
				kCode += ("knit - f" + n + " " + carrier + "\n");
			}
		}
	} else {
		for (let n = min; n <= max; ++n) {
			if (n % 2 === 0){
				kCode += ("miss + f" + n + " " + carrier + "\n");
			} else {
				kCode += ("knit + f" + n + " " + carrier + "\n");
			}
		}
	}
}

kCode += ("outhook " + carrier + "\n");

//write to file
fs.writeFile("./../knitout-backend-swg/examples/in/half_gauge.knitout", kCode, function(err) {
    if(err) {
        return console.log(err);
    }

    console.log("The file was saved!");
}); 
