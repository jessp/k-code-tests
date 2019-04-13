const fs = require('fs');
let kCode = "";

//Parameters:

const width = 16;
const height = 80;
const carrierA = "3";
const carrierB = "2";

//Operation:
//Makes a tube with circumference of width * 2 and height of height/2
//tube alternates between two colours


kCode += (";!knitout-2" + "\n");
kCode += (";;Carriers: 1 2 3 4 5 6 7 8 9 10" + "\n");


//Alternating tucks cast-on:

kCode += ("inhook " + carrierA + "\n");

let min = 1;
let max = min + width - 1;

//cast-on on the front bed first...
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

//and then on the back bed
for (let n = max; n >= min; --n) {
	if ((max-n) % 2 == 0) {
		kCode += ("tuck - b" + n + " " + carrierA + "\n");
	}
}
for (let n = min; n <= max; ++n) {
	if ((max-n)%2 == 1) {
		kCode += ("tuck + b" + n + " " + carrierA + "\n");
	}
}

kCode += ("miss + f" + max + " " + carrierA + "\n");

kCode += ("releasehook " + carrierA + "\n");

var carrier = carrierA;
for (let r = 0; r < height; ++r) {

	if (r % 2 === 0 && r > 1){
		carrier = carrier === carrierA ? carrierB : carrierA;
	}

	if (carrier === carrierB && r === 2){
		kCode += ("inhook " + carrierB + "\n");
	}

	//essentially, knit going in only one way on each bed, so they only meet on the edges
	if (r % 2 == 0) {
		for (let n = max; n >= min; --n) {
			kCode += ("knit - f" + n + " " + carrier + "\n");
		}
	} else {
		for (let n = min; n <= max; ++n) {
			kCode += ("knit + b" + n + " " + carrier + "\n");
		}
	}

	if (carrier === carrierB && r === 2){
		kCode += ("releasehook " + carrierB + "\n");
	}
}

kCode += ("outhook " + carrierA + "\n");
kCode += ("outhook " + carrierB + "\n");

//write to file
fs.writeFile("./../knitout-backend-swg/examples/in/two_colour_stripe_tube.knitout", kCode, function(err) {
    if(err) {
        return console.log(err);
    }

    console.log("The file was saved!");
}); 