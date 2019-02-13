const fs = require('fs');
let kCode = "";
/*
Not my code. From Textiles Lab at: https://github.com/textiles-lab/knitout-examples
Modified only to change width.
*/

//Parameters:

const Width = 16;
const Height = 40;
const Carrier = "3";

//Operation:

//Makes a Width x Height rectangle of plain knitting on the front bed with carrier Carrier.
//Uses an alternating-tucks cast-on.



kCode += (";!knitout-2" + "\n");
kCode += (";;Carriers: 1 2 3 4 5 6 7 8 9 10" + "\n");


kCode += ("inhook " + Carrier + "\n");

kCode += ("x-stitch-number 61"); //in our table: "Half / Wrap" for Po + "\n"lo

let min = 1;
let max = min + Width - 1;

//alternating tucks cast-on
for (let n = max; n >= min; --n) {
	if ((max-n) % 2 == 0) {
		kCode += ("tuck - f" + n + " " + Carrier + "\n");
	}
}
for (let n = min; n <= max; ++n) {
	if ((max-n)%2 == 1) {
		kCode += ("tuck + f" + n + " " + Carrier + "\n");
	}
}

kCode += ("miss + f" + max + " " + Carrier + "\n");

//release the hook from the carrier hook
kCode += ("releasehook " + Carrier + "\n");

// Rows of plain knitting:
for (let r = 0; r < Height; ++r) {
	//every other row, change direction so we knit back and forth
	if (r % 2 == 0) {
		//we end on the right side (i.e., going in + direction), so we start by going towards the left (-))
		for (let n = max; n >= min; --n) {
			kCode += ("knit - f" + n + " " + Carrier + "\n");
		}
	} else {
		for (let n = min; n <= max; ++n) {
			kCode += ("knit + f" + n + " " + Carrier + "\n");
		}
	}
}

//bring yarn carrier out of action
kCode += ("outhook " + Carrier + "\n");

//write to file
fs.writeFile("./../knitout-backend-swg/examples/in/small_rectangle.knitout", kCode, function(err) {
    if(err) {
        return console.log(err);
    }

    console.log("The file was saved!");
}); 
