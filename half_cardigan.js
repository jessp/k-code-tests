const fs = require('fs');
let kCode = "";

//Parameters:

const width = 30;
const height = 40;
const carrier = "3";

//Operation:

//Makes a width x height rectangle of half-cardigan knitting on the front bed with carrier carrier.
//Uses an alternating-tucks cast-on.


kCode += (";!knitout-2" + "\n");
kCode += (";;Carriers: 1 2 3 4 5 6 7 8 9 10" + "\n");


//Alternating tucks cast-on:

kCode += ("inhook " + carrier + "\n");

let min = 1;
let max = min + width - 1;

//the knit alternates between knit front and tuck back in the first line
//so when we cast on, we want to make sure our tuck cast-on alternates tuck front/tuck back in the same order
for (let n = max; n >= min; --n) {
	if ((max-n) % 2 == 0) {
		kCode += ("tuck - f" + n + " " + carrier + "\n");
	}
}
for (let n = min; n <= max; ++n) {
	if ((max-n)%2 == 1) {
		kCode += ("tuck + b" + n + " " + carrier + "\n");
	}
}

kCode += ("miss + f" + max + " " + carrier + "\n");

kCode += ("releasehook " + carrier + "\n");

//note: we might have to knit a row of plain knitting here between the cast-on tucks and the knit tucks


for (let r = 0; r < height; ++r) {
	if (r % 2 == 0) {
		for (let n = max; n >= min; --n) {
			//alternate between front knits and back tucks on alternating rows going towards the left
			if (n % 2 === 0){
				kCode += ("knit - f" + n + " " + carrier + "\n");
			} else {
				kCode += ("tuck - b" + n + " " + carrier + "\n");
			}
		}
		//after the last row of stitches, transfer any stitches on the back bed to the front
		if (r === (height - 1)){
			for (let xf = max; n >= min; --xf) {
				if (xf % 2 === 0){
					kCode += ("xfer b" + xf + " f" + xf + "\n");
				}
			}
		}
	} else {
		for (let n = min; n <= max; ++n) {
			if (n % 2 === 1){
				//alternate between front knits and back knits on alternating rows going towards the left
				kCode += ("knit + b" + n + " " + carrier + "\n");
			} else {
				kCode += ("knit + f" + n + " " + carrier + "\n");
			}
		}
		//after the last row of stitches, transfer any stitches on the back bed to the front
		if (r === (height - 1)){
			for (let xf = min; xf <= max; ++xf) {
				if (xf % 2 === 1){
					kCode += ("xfer b" + xf + " f" + xf + "\n");
				}
			}
		}
	}
}


kCode += ("outhook " + carrier + "\n");

//write to file
fs.writeFile("./../knitout-backend-swg/examples/in/half_cardigan.knitout", kCode, function(err) {
    if(err) {
        return console.log(err);
    }

    console.log("The file was saved!");
}); 