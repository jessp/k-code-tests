const fs = require('fs');
let kCode = "";

//Parameters:

const startingWidth = 4;
const endingWidth = 30;
const height = 40;
const carrier = "3";


//Operation:

//Makes a swatch of plain knitting on the front bed with carrier carrier.
//Increases gradually from startingWidth in the right bottom corner to endingWidth.
//Uses an alternating-tucks cast-on.
/*
xxxxx
xxxxx
xxxxx
 xxxx
  xxx
   xx
    x  

*/


let min = startingWidth;
let max = min + endingWidth - 1;
let actingWidth = max - min; //variable to keep track of how wide the swatch is at each row


kCode += (";!knitout-2" + "\n");
kCode += (";;Carriers: 1 2 3 4 5 6 7 8 9 10" + "\n");


//Alternating tucks cast-on:

kCode += ("inhook " + carrier + "\n");

for (let n = max; n >= (actingWidth); --n) {
	if ((max-n) % 2 == 0) {
		kCode += ("tuck - f" + n + " " + carrier + "\n");
	}
}
for (let n = actingWidth; n <= max; ++n) {
	if ((max-n)%2 == 1) {
		kCode += ("tuck + f" + n + " " + carrier + "\n");
	}
}

kCode += ("miss + f" + max + " " + carrier + "\n");

kCode += ("releasehook " + carrier + "\n");


for (let r = 0; r < height; ++r) {
	if (r % 2 == 0) {
		//going towards the right, we just need to worry about knitting on the front bed
		for (let n = max; n >= actingWidth; --n) {
			kCode += ("knit - f" + n + " " + carrier + "\n");
		}
	} else {
		//otherwise...
		for (let n = actingWidth; n <= max; ++n) {
			//if we're stitching the first stitch, and we aren't yet at  the final width, tuck to secure the row
			if (n == actingWidth && (endingWidth - actingWidth) < endingWidth){
				kCode += ("tuck + f" + n + " " + carrier + "\n");
			} else {
				//otherwise, knit normally
				kCode += ("knit + f" + n + " " + carrier + "\n");
			}
		}
	}
	//decrease the actingWidth at the end of each row until we're at the full width
	if ((endingWidth - actingWidth) < endingWidth){
		actingWidth--;
	}
}

kCode += ("outhook " + carrier + "\n");

//write to file
fs.writeFile("./../knitout-backend-swg/examples/in/increase_left.knitout", kCode, function(err) {
    if(err) {
        return console.log(err);
    }

    console.log("The file was saved!");
}); 