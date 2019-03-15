const fs = require('fs');
let kCode = "";

//Not my code, from the Textiles Lab repo https://github.com/textiles-lab/knitout-examples
//only changed to remove knitout writer and to change the carrier

//Parameters:

const width = 30;
const height = 40;
const carrier = "3";

//Operation:

//Makes a width x height rectangle of plain "interlock" knitting
// basically, rows alternate front/back on each needle.

//Doesn't require a cast-on.


kCode += (";!knitout-2" + "\n");
kCode += (";;Carriers: 1 2 3 4 5 6 7 8 9 10" + "\n");

let min = 1;
let max = min + width - 1;

function knitTwoRows() {
	for (let n = max; n >= min; --n) {
		let bed = ((max - n) % 2 == 0 ? 'f' : 'b');
		kCode += ("knit - " + bed + n + " " + carrier + "\n");
	}
	for (let n = min; n <= max; ++n) {
		let bed = ((max - n) % 2 == 0 ? 'b' : 'f');
		kCode += ("knit + " + bed + n + " " + carrier + "\n");
	}
}

// Get carrier in:
kCode += ("inhook " + carrier + "\n");
knitTwoRows();
kCode += ("releasehook " + carrier + "\n");

// Finish the remaining rows:
for (let r = 2; r < height; r += 2) {
	knitTwoRows();
}

// Take carrier out:
kCode += ("outhook " + carrier + "\n");

//write to file
fs.writeFile("./../knitout-backend-swg/examples/in/interlock.knitout", kCode, function(err) {
    if(err) {
        return console.log(err);
    }

    console.log("The file was saved!");
}); 