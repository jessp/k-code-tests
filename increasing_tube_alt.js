const fs = require('fs');
let kCode = "";

//Parameters:

const width = 16;
const height = 80;
const carrier = "3";

//Operation:
//Makes a widening tube
/*
xxxxxxxxx
xxxxxxxxx
xxxxxxxxx
 xxxxxxx
  xxxxx
*/


kCode += (";!knitout-2" + "\n");
kCode += (";;Carriers: 1 2 3 4 5 6 7 8 9 10" + "\n");


//Alternating tucks cast-on:

kCode += ("inhook " + carrier + "\n");

let min = 16;
let max = min + width - 1;

//cast-on on the front bed first...
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

//and then on the back bed
for (let n = max; n >= min; --n) {
	if ((max-n) % 2 == 0) {
		kCode += ("tuck - b" + n + " " + carrier + "\n");
	}
}
for (let n = min; n <= max; ++n) {
	if ((max-n)%2 == 1) {
		kCode += ("tuck + b" + n + " " + carrier + "\n");
	}
}

kCode += ("miss + f" + max + " " + carrier + "\n");

kCode += ("releasehook " + carrier + "\n");

var oldMin = min;
var oldMax = max;

for (let r = 0; r < height; ++r) {

	if (r % 4 === 0 && (min - 2 > 0) && r > 0){
		min = min - 2;
	}

	if (r % 4 === 1 && (min - 2 > 0) && r > 0){
		max = max + 2;
	}

	//essentially, knit going in only one way on each bed, so they only meet on the edges
	if (r % 2 == 0) {
		for (let n = max; n >= min; --n) {
			if (n < oldMin){
				if (n % 2 == 0){
					kCode += ("knit - f" + n + " " + carrier + "\n");
				}
			} else if (n > oldMax) {
				if (n % 2 == 1){
					kCode += ("knit - f" + n + " " + carrier + "\n");
				}
			}	else {
				kCode += ("knit - f" + n + " " + carrier + "\n");
			}
		}
	} else {
		for (let n = min; n <= max; ++n) {
			if (n < oldMin){
				if (n % 2 == 0){
					kCode += ("knit + b" + n + " " + carrier + "\n");
				}
			} else if (n > oldMax){
				if (n % 2 == 1){
					kCode += ("knit + b" + n + " " + carrier + "\n");
				}
			} else {
				kCode += ("knit + b" + n + " " + carrier + "\n");
			}
		}
	}
	if (r % 4 === 1){
		oldMin = min;
	}
	if (r % 4 === 2){
		oldMax = max;
	}
}

kCode += ("outhook " + carrier + "\n");

//write to file
fs.writeFile("./../knitout-backend-swg/examples/in/increasing_tube_alt.knitout", kCode, function(err) {
    if(err) {
        return console.log(err);
    }

    console.log("The file was saved!");
}); 