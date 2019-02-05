//Parameters:

const startingWidth = 30;
const endingWidth = 4;
const height = 40;
const carrier = "3";


//Operation:

//Makes a swatch of plain knitting that gradually decreases on an angle on the right side on the front bed with carrier carrier.
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


console.log(";!knitout-2");
console.log(";;Carriers: 1 2 3 4 5 6 7 8 9 10");

console.log("inhook " + carrier);

let min = 1;
let max = min + startingWidth - 1;
let actingWidth = max;

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

//release the yarn from the carrier hook
console.log("releasehook " + carrier);

for (let r = 0; r < height; ++r) {
	//knit normally, alternating between back and front
	if (r % 2 == 0) {
		for (let n = actingWidth; n >= min; --n) {
			console.log("knit - f" + n + " " + carrier);
		}
	} else {
		for (let n = min; n <= actingWidth; ++n) {
			console.log("knit + f" + n + " " + carrier);
		}
	}
	//if we should decrease the width
	if (actingWidth > endingWidth){
		//and we're going towards the right, we're going to attempt to secure some stitches
		if (r % 2 == 1){
			//first, transfer them to the back bed
			console.log("xfer f" + actingWidth + " b" + actingWidth);
			//then move the back bed left one space
			console.log("rack -1");
			//then transfer the stitch back to the front
			console.log("xfer b" + actingWidth + " f" + (actingWidth - 1));
			//and return the back bed to its starting position
			console.log("rack 0");
		}
		actingWidth--;
	}
}

console.log("outhook " + carrier);