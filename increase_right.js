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


console.log(";!knitout-2");
console.log(";;Carriers: 1 2 3 4 5 6 7 8 9 10");


//Alternating tucks cast-on:

console.log("inhook " + carrier);

let min = 1;
let max = endingWidth;
let actingWidth = startingWidth;

for (let n = actingWidth; n >= min; --n) {
	if ((max-n) % 2 == 0) {
		console.log("tuck - f" + n + " " + carrier);
	}
}
for (let n = min; n <= actingWidth; ++n) {
	if ((max-n)%2 == 1) {
		console.log("tuck + f" + n + " " + carrier);
	}
}

console.log("miss + f" + actingWidth + " " + carrier);

console.log("releasehook " + carrier);

//direction is important when tucking on an edge
for (let n = actingWidth; n >= min; --n) {
	console.log("knit - f" + n + " " + carrier);
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
				console.log("tuck - f" + n + " " + carrier);
			} else {
				console.log("knit - f" + n + " " + carrier);
			}
		}
	} else {
		//we can count on knitting normally on the front bed when knitting towards the left
		for (let n = min; n <= actingWidth; ++n) {
			console.log("knit + f" + n + " " + carrier);
		}
	}
}

console.log("outhook " + carrier);