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


kCode += (";!knitout-2" + "\n");
kCode += (";;Carriers: 1 2 3 4 5 6 7 8 9 10" + "\n");


//Alternating tucks cast-on:

kCode += ("inhook " + carrier + "\n");

let min = 1;
let max = endingWidth;
let actingWidth = startingWidth;

for (let n = actingWidth; n >= min; --n) {
	if ((max-n) % 2 == 0) {
		kCode += ("tuck - f" + n + " " + carrier + "\n");
	}
}
for (let n = min; n <= actingWidth; ++n) {
	if ((max-n)%2 == 1) {
		kCode += ("tuck + f" + n + " " + carrier + "\n");
	}
}

kCode += ("miss + f" + actingWidth + " " + carrier + "\n");

kCode += ("releasehook " + carrier + "\n");

//direction is important when tucking on an edge
for (let n = actingWidth; n >= min; --n) {
	kCode += ("knit - f" + n + " " + carrier + "\n");
}

for (let r = 0; r < height - 1; ++r) {
	if (r % 2 == 1) {
		//we'll increase the width before the row if it should increase
		if (actingWidth < endingWidth){
			actingWidth++;
		}
		for (let n = actingWidth; n >= min; --n) {
			//if we're at the beginning of a row, and we're still increasing width, tuck the first stitch
			if (n == actingWidth && actingWidth < endingWidth){
				kCode += ("tuck - f" + n + " " + carrier + "\n");
			} else {
				kCode += ("knit - f" + n + " " + carrier + "\n");
			}
		}
	} else {
		//we can count on knitting normally on the front bed when knitting towards the left
		for (let n = min; n <= actingWidth; ++n) {
			kCode += ("knit + f" + n + " " + carrier + "\n");
		}
	}
}

kCode += ("outhook " + carrier + "\n");

//write to file
fs.writeFile("./../knitout-backend-swg/examples/in/increase_right.knitout", kCode, function(err) {
    if(err) {
        return console.log(err);
    }

    console.log("The file was saved!");
}); 

