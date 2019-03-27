const fs = require('fs');
let kCode = "";

//Parameters:

const width = 16;
const height = 80;
const carrierA = "3";
const carrierB = "2";
const carrierC = "1";

//Operation:
//Makes a tube with circumference of width * 2 and height of height/2


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

kCode += ("miss + f" + max + " " + carrierA + "\n");

kCode += ("releasehook " + carrierA + "\n");

//carrierB
kCode += ("inhook " + carrierB + "\n");


//and then on the back bed
for (let n = Math.min(max/2); n >= min; --n) {
	if ((max-n) % 2 == 0) {
		kCode += ("tuck - b" + n + " " + carrierB + "\n");
	}
}
for (let n = min; n <= Math.min(max/2); ++n) {
	if ((max-n)%2 == 1) {
		kCode += ("tuck + b" + n + " " + carrierB + "\n");
	}
}

kCode += ("miss + f" + max + " " + carrierB + "\n");

kCode += ("releasehook " + carrierB + "\n");


//carrierC
kCode += ("inhook " + carrierC + "\n");

//and then on the back bed
for (let n = max; n >= Math.min(max/2); --n) {
	if ((max-n) % 2 == 0) {
		kCode += ("tuck - b" + n + " " + carrierC + "\n");
	}
}
for (let n = Math.min(max/2); n <= max; ++n) {
	if ((max-n)%2 == 1) {
		kCode += ("tuck + b" + n + " " + carrierC + "\n");
	}
}

kCode += ("miss + f" + max + " " + carrierC + "\n");

kCode += ("releasehook " + carrierC + "\n");



var carrier = carrierA;
let carriers = [carrierA, carrierB, carrierC];
let carrierIndex = 0;

for (let r = 0; r < height; ++r) {

	if (r % 3 === 0){
		carrier = carriers[carrierIndex%3];
		carrierIndex++;
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
}

kCode += ("outhook " + carrierA + "\n");
kCode += ("outhook " + carrierB + "\n");
kCode += ("outhook " + carrierC + "\n");

//write to file
fs.writeFile("./../knitout-backend-swg/examples/in/tube_D.knitout", kCode, function(err) {
    if(err) {
        return console.log(err);
    }

    console.log("The file was saved!");
}); 