const fs = require('fs');
let kCode = "";

//Parameters:

const width = 30;
const height = 40; //keep this number even
const carrier1 = "3";
const carrier2 = "2";

//Operation:

//Makes a width x height rectangle of plain knitting on the front bed.
//Alternates in striped colours between carrier1 and carrier2.
//Uses an alternating-tucks cast-on.



let min = 1;
let max = min + width - 1;


kCode += (";!knitout-2" + "\n");
kCode += (";;Carriers: 1 2 3 4 5 6 7 8 9 10" + "\n");

//Alternating tucks cast-on with carrier 1:
kCode += ("inhook " + carrier1 + "\n");


for (let n = max; n >= min; --n) {
	if ((max-n) % 2 == 0) {
		kCode += ("tuck - f" + n + " " + carrier1 + "\n");
	}
}
for (let n = min; n <= max; ++n) {
	if ((max-n)%2 == 1) {
		kCode += ("tuck + f" + n + " " + carrier1 + "\n");
	}
}

kCode += ("miss + f" + max + " " + carrier1 + "\n");

kCode += ("releasehook " + carrier1 + "\n");

//knit one two lines with carrier1
for (let n = max; n >= min; --n) {
	kCode += ("knit - f" + n + " " + carrier1 + "\n");
}

for (let n = min; n <= max; ++n) {
	kCode += ("knit + f" + n + " " + carrier1 + "\n");
}

//load on carrier 2
kCode += ("inhook " + carrier2 + "\n");

//knit two rows with carrier 2 to put the thread into play
for (let n = max; n >= min; --n) {
	kCode += ("knit - f" + n + " " + carrier2 + "\n");
}
for (let n = min; n <= max; ++n) {
	kCode += ("knit + f" + n + " " + carrier2 + "\n");
}

//release yarn on carrier 2 from the carrier hook
kCode += ("releasehook " + carrier2 + "\n");

// Rows of plain knitting:
let active_carrier = carrier1;

for (let r = 0; r < height; ++r) {
	active_carrier = (r % 4 < 2) ? carrier1 : carrier2; //switch the active yarn every 2 rows

	if (r % 2 == 0) {
		for (let n = max; n >= min; --n) {
			kCode += ("knit - f" + n + " " + active_carrier + "\n");
		}
	} else {
		for (let n = min; n <= max; ++n) {
			kCode += ("knit + f" + n + " " + active_carrier + "\n");
		}
	}
}

//take carrier 2 out of play
kCode += ("outhook " + carrier2 + "\n");

//knit a few more lines with carrier 1 -- is this necessary?
for (let n = max; n >= min; --n) {
	kCode += ("knit - f" + n + " " + carrier1 + "\n");
}
for (let n = min; n <= max; ++n) {
	kCode += ("knit + f" + n + " " + carrier1 + "\n");
}
for (let n = max; n >= min; --n) {
	kCode += ("knit - f" + n + " " + carrier1 + "\n");
}

//take carrier 1 out of play
kCode += ("outhook " + carrier1 + "\n");


//write to file
fs.writeFile("./../knitout-backend-swg/examples/in/stripes.knitout", kCode, function(err) {
    if(err) {
        return console.log(err);
    }

    console.log("The file was saved!");
}); 
