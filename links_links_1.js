//Parameters:

const width = 28;//multiple of 4
const height = 40;//multiple of 4
const carrier = "3";
let min = 1;
let max = min + width - 1;

//Operation:

//Makes a width x height rectangle of links-links stitches on the front bed with carrier carrier.
//Uses an alternating-tucks cast-on.
//Each unit looks as following:

/*
xxxx----
xxxx----
----xxxx
----xxxx
*/

//Note:
//We start with squares on the front bed because the machine doesn't like making the first stitch with the back bed.

console.log(";!knitout-2");
console.log(";;Carriers: 1 2 3 4 5 6 7 8 9 10");


//Alternating tucks cast-on:

console.log("inhook " + carrier);

//we need to ensure that cast-on stitches below perled stitches are on back bed 
for (let n = max; n >= min; --n) {
	if ((max-n) % 2 == 0 ) {
		if ((max-n) % 8 < 4){
			console.log("tuck - f" + n + " " + carrier);
		} else {
			console.log("tuck - b" + n + " " + carrier);
		}
	}
}
for (let n = min; n <= max; ++n) {
	if ((max-n)%2 == 1) {
		if ((max-n) % 8 < 4){
			console.log("tuck + f" + n + " " + carrier);
		} else {
			console.log("tuck + b" + n + " " + carrier);
		}
	}
}

console.log("miss + b" + max + " " + carrier);

console.log("releasehook " + carrier);


let reversed = false; //every 4 rows, switch perled and knitted order
for (let r = 0; r < height; ++r) {

	let isFront = false;

	//every four stitches switch from knits to perls
	if (r % 4 === 0) { 
		reversed = !reversed;
		//every 4 rows, transfer stitches as needed to the front or back bed
	} 

	if (r % 2 == 0) {
		let counter = 0;
		for (let n = max; n >= min; --n) {
			counter++;

			if (reversed) {
				console.log("knit - "  + (isFront ? "b" : "f") + n + " " + carrier);
			} else {
				console.log("knit - "  + (isFront ? "f" : "b") + n + " " + carrier);
			}
			if (counter % 4 === 0) { isFront = !isFront;}
		}
	} else {
		let counter = 0;
		for (let n = min; n <= max; ++n) {
			counter++;

			if (reversed) {
				console.log("knit + "  + (isFront ? "b" : "f") + n + " " + carrier);
			} else {
				console.log("knit + "  + (isFront ? "f" : "b") + n + " " + carrier);
			}
			if (counter % 4 === 0) { isFront = !isFront;}
		}
	}

	if (r !== (height - 1)){ 
		if (r % 4 === 3){ //after four rows, transfer stitches from front bed to back and vise verse
			for (let n = min; n <= max; ++n) {
				if ((n-1) % 8 < 4){
					console.log("xfer " + (reversed ? "f" : "b") + n + " " + (reversed ? "b" : "f") + n);
				} else {
					console.log("xfer " + (reversed ? "b" : "f") + n + " " + (reversed ? "f" : "b") + n);
				}
			}
		}
	} else {
		//on the last row, bring any stitches on the back bed to the front
		for (let n = min; n <= max; ++n) {
			if ((n-1) % 8 >= 4){
				console.log("xfer f" + n + " b" + n);
			} 
		}
	}

}

console.log("outhook " + carrier);