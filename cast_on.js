const fs = require('fs');
let kCode = "";

//Parameters:

const shortWidth = 20;//the narrower of the two widths
const wideWidth = 40;//the wider of the two widths
const shortRows = 29;//how many short rows we knit before switching to wide rows -- odd number so we're going towards right on transfer
const height = 60;
const carrier = "3";

//Operation:

//Makes a shortWidth x shortRows rectangle connected to a wideWidth x (height - shortRows) 
//rectangle of plain knitting on the front bed with carrier carrier.
//Uses an alternating-tucks cast-on.
/*
  
xxxxx
xxxxx
xxxxx
xxxxx
xx
xx
xx

*/


kCode += (";!knitout-2" + "\n");
kCode += (";;Carriers: 1 2 3 4 5 6 7 8 9 10" + "\n");


//Alternating tucks cast-on:

kCode += ("inhook " + carrier + "\n");

let min = 1;
let max = shortWidth - 1;

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


for (let r = 0; r < height; ++r) {
	//if we're not at the threshold between where we switch from short rows to long rows, knit normally
	if (r < shortRows || r > shortRows){
		if (r % 2 == 0) {
			for (let n = max; n >= min; --n) {
				kCode += ("knit - f" + n + " " + carrier + "\n");
			}
		} else {
			for (let n = min; n <= max; ++n) {
				kCode += ("knit + f" + n + " " + carrier + "\n");
			}
		}
	//if we're at the threshold between where we switch from short rows to wide rows...
	} else if (r === shortRows){
		//starting at "min" and going for the full width of the textile
		for (let n = min; n <= wideWidth - 1; ++n) {
			//if we're within the range of short width...
			if (n <= shortWidth){
				kCode += ("knit + f" + n + " " + carrier + "\n");
			} else {
				//otherwise knit on every other needle
				if (n % 2 === 0){
					kCode += ("knit + f" + n + " " + carrier + "\n");
				}
			}
			
		}
		//after the transition, set the acting width to wideWidth 
		max = wideWidth - 1;
	} 
}

//bring yarn carrier out of action
kCode += ("outhook " + carrier + "\n");


//write to file
fs.writeFile("./../knitout-backend-swg/examples/in/cast_on.knitout", kCode, function(err) {
    if(err) {
        return console.log(err);
    }

    console.log("The file was saved!");
}); 