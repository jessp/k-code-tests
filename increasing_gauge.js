const fs = require('fs');
let kCode = "";

//Parameters:

const width = 32;//we won't fuss about even vs odd, and instead just knit a regular stitch on the right by default
//we won't do height here, instead we'll just knit until we can't increase the gauge any more
const carrier = "3";
const rowsPerGauge = 4; //number of rows we'll knit before decreasing the gauge, should be even since we're going forward and back
let gaugeWidth = 1; //number of knit stitches + misses

let min = 1;
let max = min + width - 1;

//Operation:

//Makes a width x height rectangle of plain knitting on the front bed with carrier carrier.
//Does series of rows of knits at increasing gauge.
//This file is an experiment to test the effect.

/*
xxxxxxxxxxx
x   x   xxx
x   x   xxx
xxxxxxxxxxx
x  x  x  xx
x  x  x  xx
xxxxxxxxxxx
x x x x x x
x x x x x x
xxxxxxxxxxx
xxxxxxxxxxx
xxxxxxxxxxx
*/



kCode += (";!knitout-2" + "\n");
kCode += (";;Carriers: 1 2 3 4 5 6 7 8 9 10" + "\n");

//Alternating tucks cast-on:

kCode += ("inhook " + carrier + "\n");

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

kCode += ("releasehook " + carrier + "\n");

let currentHeight = 0;

while (width / gaugeWidth > 1){ //we'll stop when we can only do one guage thing in a row

	//knit to right
	for (let n = max; n >= min; --n) {
		if (n % gaugeWidth === 0 || n === min || n === max){//we'll knit normally for the first and last stitch
			kCode += ("knit - f" + n + " " + carrier + "\n");
		} else {
			kCode += ("miss - f" + n + " " + carrier + "\n");
		}
	}
	//knit to left
	for (let n = min; n <= max; ++n) {
		if (n % gaugeWidth === 0 || n === min || n === max){//we'll knit normally for the first and last stitch
			kCode += ("knit + f" + n + " " + carrier + "\n");
		} else {
			kCode += ("miss + f" + n + " " + carrier + "\n");
		}
	}
	currentHeight ++;
	if (currentHeight % (rowsPerGauge) === 0){
		//knit regular rows between guage transitions
		for (let n = max; n >= min; --n) {
			kCode += ("knit - f" + n + " " + carrier + "\n");
		}
		for (let n = min; n <= max; ++n) {
			kCode += ("knit + f" + n + " " + carrier + "\n");
		}

		gaugeWidth ++; //increase guageWidth

		//while we're not on the last row...
		if (width / gaugeWidth > 1) {
			//transfer stitches to adjacent needles before gauged segments
			for (let n = max; n >= min; --n) {
				if (n % gaugeWidth !== 0 & n !== min & n !== max){
					kCode += ("xfer f" + n + " b" + n + "\n");
					kCode += ("rack 1" + "\n");
					kCode += ("xfer b" + n + " f" + (n+1) + "\n");
					kCode += ("rack 0" + "\n");
				}
			}
		}
	}
}


kCode += ("outhook " + carrier + "\n");

//write to file
fs.writeFile("./../knitout-backend-swg/examples/in/increasing_gauge.knitout", kCode, function(err) {
    if(err) {
        return console.log(err);
    }

    console.log("The file was saved!");
}); 
