const fs = require('fs');
let kCode = "";
/*
Not my code. From Textiles Lab at: https://github.com/textiles-lab/knitout-examples
Modified only to change width.
*/

//Parameters:

const width = 20;
const carrierA = "3";
const carrierB = "2";

//Operation:

//just figuring out what knitting two carriers together does



kCode += (";!knitout-2" + "\n");
kCode += (";;Carriers: 1 2 3 4 5 6 7 8 9 10" + "\n");


kCode += ("inhook " + carrierA + "\n");


let min = 1;
let max = min + width - 1;

//alternating tucks cast-on
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

//release the hook from the carrier hook
kCode += ("releasehook " + carrierA + "\n");

kCode += knitRows(4, carrierA);

kCode += ("inhook " + carrierB + "\n");

kCode += knitRows(4, carrierB);

//release the hook from the carrier hook
kCode += ("releasehook " + carrierB + "\n");

kCode += knitRows(20, carrierA + " " + carrierB);

kCode += ("outhook " + carrierA + "\n");
kCode += ("outhook " + carrierB + "\n");


function knitRows(height, carrier){
	let code = "";
	for (let r = 0; r < height; ++r) {
		//every other row, change direction so we knit back and forth
		if (r % 2 == 0) {
			//we end on the right side (i.e., going in + direction), so we start by going towards the left (-))
			for (let n = max; n >= min; --n) {
				code += ("knit - f" + n + " " + carrier + "\n");
			}
		} else {
			for (let n = min; n <= max; ++n) {
				code += ("knit + f" + n + " " + carrier + "\n");
			}
		}
	}
	return code;
}


//write to file
fs.writeFile("./../knitout-backend-swg/examples/in/knit_together.knitout", kCode, function(err) {
    if(err) {
        return console.log(err);
    }

    console.log("The file was saved!");
}); 
