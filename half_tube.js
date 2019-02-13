const fs = require('fs');
let kCode = "";

//Parameters:

const width = 30;
const height = 40;
const carrier = "3";

//Operation:
//Makes a tube not connected at one of the seams.
//The tube's circumference is 2 x width, and its height is height/2


kCode += (";!knitout-2" + "\n");
kCode += (";;Carriers: 1 2 3 4 5 6 7 8 9 10" + "\n");


//Alternating tucks cast-on:
//This is NOT the right cast-on

kCode += ("inhook " + carrier + "\n");

let min = 1;
let max = min + width - 1;

//cast on on the first bed using alternating tucks...
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

for (let r = 0; r < height ; ++r) {
	//every two rows, alternate from back bed to front bed, so they only meet on one side
	let side = (r % 4 < 2) ? "f" : "b"; 
	if (r % 2 == 0) {
		for (let n = max; n >= min; --n) {
			kCode += ("knit - " + side + n + " " + carrier + "\n");
		}
	} else {
		for (let n = min; n <= max; ++n) {
			kCode += ("knit + " + side + n + " " + carrier + "\n");
		}
	}
}


kCode += ("outhook " + carrier + "\n");

//write to file
fs.writeFile("./../knitout-backend-swg/examples/in/half_tube.knitout", kCode, function(err) {
    if(err) {
        return console.log(err);
    }

    console.log("The file was saved!");
}); 