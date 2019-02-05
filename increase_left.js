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


console.log(";!knitout-2");
console.log(";;Carriers: 1 2 3 4 5 6 7 8 9 10");


//Alternating tucks cast-on:

console.log("inhook " + carrier);

for (let n = max; n >= (actingWidth); --n) {
	if ((max-n) % 2 == 0) {
		console.log("tuck - f" + n + " " + carrier);
	}
}
for (let n = actingWidth; n <= max; ++n) {
	if ((max-n)%2 == 1) {
		console.log("tuck + f" + n + " " + carrier);
	}
}

console.log("miss + f" + max + " " + carrier);

console.log("releasehook " + carrier);


for (let r = 0; r < height; ++r) {
	if (r % 2 == 0) {
		//going towards the right, we just need to worry about knitting on the front bed
		for (let n = max; n >= actingWidth; --n) {
			console.log("knit - f" + n + " " + carrier);
		}
	} else {
		//otherwise...
		for (let n = actingWidth; n <= max; ++n) {
			//if we're stitching the first stitch, and we aren't yet at  the final width, tuck to secure the row
			if (n == actingWidth && (endingWidth - actingWidth) < endingWidth){
				console.log("tuck + f" + n + " " + carrier);
			} else {
				//otherwise, knit normally
				console.log("knit + f" + n + " " + carrier);
			}
		}
	}
	//decrease the actingWidth at the end of each row until we're at the full width
	if ((endingWidth - actingWidth) < endingWidth){
		actingWidth--;
	}
}

console.log("outhook " + carrier);