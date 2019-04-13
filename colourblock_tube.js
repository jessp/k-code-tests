const fs = require('fs');
let kCode = "";

//Parameters:

const width = 16;
const height = 80; //even for convenience
const carrierA = "3";
const carrierB = "2";

//Operation:
//Makes a tube with circumference of width * 2 and height of height/2
//Bottom half is one colour, top half is another colour


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

//knit first half in yarn A
for (let r = 0; r < height/2; ++r) {

	//essentially, knit going in only one way on each bed, so they only meet on the edges
	if (r % 2 == 0) {
		for (let n = max; n >= min; --n) {
			kCode += ("knit - f" + n + " " + carrierA + "\n");
		}
	} else {
		for (let n = min; n <= max; ++n) {
			kCode += ("knit + b" + n + " " + carrierA + "\n");
		}
	}

}

kCode += ("outhook " + carrierA + "\n");

//bring in yarn B
kCode += ("inhook " + carrierB + "\n");

for (let r = 0; r < 4; ++r) {
	//essentially, knit going in only one way on each bed, so they only meet on the edges
	if (r % 2 == 0) {
		for (let n = max; n >= min; --n) {
			kCode += ("knit - f" + n + " " + carrierB + "\n");
		}
	} else {
		for (let n = min; n <= max; ++n) {
			kCode += ("knit + b" + n + " " + carrierB + "\n");
		}
	}
}

kCode += ("releasehook " + carrierB + "\n");

//knit second half in yarn B
for (let r = 0; r < height/2 - 4; ++r) {

	//essentially, knit going in only one way on each bed, so they only meet on the edges
	if (r % 2 == 0) {
		for (let n = max; n >= min; --n) {
			kCode += ("knit - f" + n + " " + carrierB + "\n");
		}
	} else {
		for (let n = min; n <= max; ++n) {
			kCode += ("knit + b" + n + " " + carrierB + "\n");
		}
	}
}

kCode += ("outhook " + carrierB + "\n");

//write to file
fs.writeFile("./../knitout-backend-swg/examples/in/colourblock_tube.knitout", kCode, function(err) {
    if(err) {
        return console.log(err);
    }

    console.log("The file was saved!");
}); 