const fs = require('fs');
let kCode = "";

//Parameters:

const startingWidth = 30;
const endingWidth = 30 - 4;
const height = 40;
const carrier = "3";


//Operation:

//Makes a swatch of plain knitting that gradually decreases on an angle on the left side on the front bed with carrier carrier.
//Uses an alternating-tucks cast-on.
/*
    x
    x
    x
   xx
  xxx
 xxxx
xxxxx  

*/


kCode += (";!knitout-2" + "\n");
kCode += (";;Carriers: 1 2 3 4 5 6 7 8 9 10" + "\n");


//Alternating tucks cast-on:

kCode += ("inhook " + carrier + "\n");

let min = 1;
let max = min + startingWidth - 1;
let actingWidth = min;

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

kCode += ("miss + f" + max + " " + carrier + "\n");

//release the yarn from the carrier hook
kCode += ("releasehook " + carrier + "\n");


for (let r = 0; r < height; ++r) {

	//if we should decrease the width
	if (actingWidth < endingWidth){
		//and we're going towards the right, we're going to attempt to secure some stitches
		if (r % 2 == 1){
			//first, transfer them to the back bed
			kCode += ("xfer f" + actingWidth + " b" + actingWidth + "\n");
			//then move the back bed right one space
			kCode += ("rack 1" + "\n");
			//then transfer the stitch back to the front
			kCode += ("xfer b" + actingWidth + " f" + (actingWidth + 1) + "\n");
			//and return the back bed to its starting position
			kCode += ("rack 0" + "\n");
			actingWidth++;
		}
	}

	//knit normally, alternating between back and front
	if (r % 2 == 0) {
		for (let n = max; n >= actingWidth; --n) {
			kCode += ("knit - f" + n + " " + carrier + "\n");
		}
	} else {
		for (let n = actingWidth; n <= max; ++n) {
			kCode += ("knit + f" + n + " " + carrier + "\n");
		}
	}
}

kCode += ("outhook " + carrier + "\n");

//write to file
fs.writeFile("./../knitout-backend-swg/examples/in/decrease_left.knitout", kCode, function(err) {
    if(err) {
        return console.log(err);
    }

    console.log("The file was saved!");
}); 