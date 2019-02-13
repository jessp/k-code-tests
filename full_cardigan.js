const fs = require('fs');
let kCode = "";

//Parameters:

const width = 30; //must be even
const height = 40;
const carrier = "3";

//Operation:

//Makes a width x height rectangle of full-cardigan knitting on the front bed with carrier carrier.
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
		//alternate between front knits and back tucks on alternating rows going towards the left
		for (let n = max; n >= min; --n) {
			if (n % 2 === 0){
				kCode += ("knit - f" + n + " " + carrier + "\n");
			} else {
				//knit rather than tuck on far edges to prevent error
				if (n == min){
					kCode += ("knit - b" + n + " " + carrier + "\n");
				} else {
					kCode += ("tuck - b" + n + " " + carrier + "\n");
				}
			}
		}
	} else {
		//alternate between back knits and front tucks on alternating rows going towards the right
		for (let n = min; n <= max; ++n) {
			if (n % 2 === 1){
				kCode += ("knit + b" + n + " " + carrier + "\n");
			} else {
				//knit rather than tuck on far edges to prevent error
				if (n == max){
					kCode += ("knit + f" + n + " " + carrier + "\n");
				} else {
					kCode += ("tuck + f" + n + " " + carrier + "\n");
				}
			}
		}
	}



}


kCode += ("outhook " + carrier + "\n");

//write to file
fs.writeFile("./../knitout-backend-swg/examples/in/full_cardigan.knitout", kCode, function(err) {
    if(err) {
        return console.log(err);
    }

    console.log("The file was saved!");
}); 