const fs = require('fs');
let kCode = "";

//Parameters:

const shortWidth = 20;
const wideWidth = 40;
const wideRows = 30;//even number so we're going towards right on transfer
const height = 60;
const carrier = "3";

//Operation:

//Makes a wideWidth x wideRows rectangle connected to a shortWidth x (height - wideRows) 
//rectangle of plain knitting on the front bed with carrier carrier.
//Uses an alternating-tucks cast-on.
/*
   xx
   xx
   xx  
xxxxx
xxxxx
xxxxx
xxxxx

*/


kCode += (";!knitout-2" + "\n");
kCode += (";;Carriers: 1 2 3 4 5 6 7 8 9 10" + "\n");

kCode += ("inhook " + carrier + "\n");

let min = 1;
let max = wideWidth - 1;

//Alternating tucks cast-on:
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
	if (r < wideRows || r > wideRows){
		if (r % 2 == 0) {
			for (let n = max; n >= min; --n) {
				kCode += ("knit - f" + n + " " + carrier + "\n");
			}
		} else {
			for (let n = min; n <= max; ++n) {
				kCode += ("knit + f" + n + " " + carrier + "\n");
			}
		}
	//if we're at the threshold between where we switch from wide rows to short rows...
	} else if (r === wideRows){
		//to cast off, continutally transfer stitches to the right. to do this, we do the following
		for (let row_index = min; row_index <= (wideWidth - shortWidth - 1); row_index++ ){
			let direc = row_index % 2 === 1 ? "-" : "+";
			//knit one course
			kCode += ("knit " + direc + " f" + row_index + " " + carrier + "\n");
			//transfer the stitch to the back bed
			kCode += ("xfer f" + row_index + " b" + row_index + "\n");
			//move the back carrier to the right
			kCode += ("rack 1" + "\n");
			//transfer the stitch back to the front bed, now one space to the right
			kCode += ("xfer b" + row_index + " f" + (row_index + 1) + "\n");
			//return the back bed to the neutral position
			kCode += ("rack 0" + "\n");
		}
		//after those operations, switch acting width to shortwidth
		min = wideWidth - shortWidth;
	} 
}

//bring yarn carrier out of action
kCode += ("outhook " + carrier + "\n");


//write to file
fs.writeFile("./../knitout-backend-swg/examples/in/cast_off.knitout", kCode, function(err) {
    if(err) {
        return console.log(err);
    }

    console.log("The file was saved!");
}); 