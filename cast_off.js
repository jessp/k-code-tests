//Parameters:

const shortWidth = 10;
const wideWidth = 30;
const wideRows = 16;//even number so we're going towards right on transfer
const height = 40;
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


console.log(";!knitout-2");
console.log(";;Carriers: 1 2 3 4 5 6 7 8 9 10");

console.log("inhook " + carrier);

let min = 1;
let max = wideWidth - 1;

//Alternating tucks cast-on:
for (let n = max; n >= min; --n) {
	if ((max-n) % 2 == 0) {
		console.log("tuck - f" + n + " " + carrier);
	}
}
for (let n = min; n <= max; ++n) {
	if ((max-n)%2 == 1) {
		console.log("tuck + f" + n + " " + carrier);
	}
}

console.log("miss + f" + max + " " + carrier);

console.log("releasehook " + carrier);

for (let r = 0; r < height; ++r) {
	//if we're not at the threshold between where we switch from short rows to long rows, knit normally
	if (r < wideRows || r > wideRows){
		if (r % 2 == 0) {
			for (let n = max; n >= min; --n) {
				console.log("knit - f" + n + " " + carrier);
			}
		} else {
			for (let n = min; n <= max; ++n) {
				console.log("knit + f" + n + " " + carrier);
			}
		}
	//if we're at the threshold between where we switch from wide rows to short rows...
	} else if (r === wideRows){
		//to cast off, continutally transfer stitches to the right. to do this, we do the following
		for (let row_index = min; row_index <= (wideWidth - shortWidth - 1); row_index++ ){
			let direc = row_index % 2 === 1 ? "-" : "+";
			//knit one course
			console.log("knit " + direc + " f" + row_index + " " + carrier);
			//transfer the stitch to the back bed
			console.log("xfer f" + row_index + " b" + row_index);
			//move the back carrier to the right
			console.log("rack 1");
			//transfer the stitch back to the front bed, now one space to the right
			console.log("xfer b" + row_index + " f" + (row_index + 1));
			//return the back bed to the neutral position
			console.log("rack 0");
		}
		//after those operations, switch acting width to shortwidth
		min = wideWidth - shortWidth;
	} 
}

//bring yarn carrier out of action
console.log("outhook " + carrier);