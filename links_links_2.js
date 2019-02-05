//Parameters:

const width = 32;//multiple of 8
const height = 40;
const carrier = "3";

//Operation:

//Makes a width x height rectangle of links-links stitches on the front bed with carrier carrier.
//Uses an alternating-tucks cast-on.
//Each unit looks as following:

/*
xxxxxxxx
xxxx----
xxxx----
*/


console.log(";!knitout-2");
console.log(";;Carriers: 1 2 3 4 5 6 7 8 9 10");


//Alternating tucks cast-on:

console.log("inhook " + carrier);

let min = 1;
let max = min + width - 1;

//we need to ensure that cast-on stitches below perled stitches are on back bed 
for (let n = max; n >= min; --n) {
	if ((max-n) % 2 == 0 ) {
		if ((max-n) % 8 < 4){
			console.log("tuck - b" + n + " " + carrier);
		} else {
			console.log("tuck - f" + n + " " + carrier);
		}
	}
}
for (let n = min; n <= max; ++n) {
	if ((max-n)%2 == 1) {
		if ((max-n) % 8 < 4){
			console.log("tuck + b" + n + " " + carrier);
		} else {
			console.log("tuck + f" + n + " " + carrier);
		}
	}
}

console.log("miss + f" + max + " " + carrier);

console.log("releasehook " + carrier);


let reversed = true;
for (let r = 0; r < height; ++r) {

	let isFront = false;

	if (r % 6 === 5 || r % 6 === 4) { reversed = false; }
	else { reversed = true; }

	if (r % 2 == 0) {
		let counter = 0;
		for (let n = max; n >= min; --n) {
			counter++;

			if (reversed) {
				console.log("knit - "  + (isFront ? "f" : "b") + n + " " + carrier);
			} else {
				console.log("knit - f" + n + " " + carrier);
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
				console.log("knit + f" + n + " " + carrier);
			}
			if (counter % 4 === 0) { isFront = !isFront;}
		}
	}

	if (r !== (height - 1)){ 
		if (r % 6 === 3){ //after four rows, transfer relevent stitches from back bed to front
			for (let n = min; n <= max; ++n) {
				if ((n-1) % 8 >= 4){
					console.log("xfer b" + n + " f" + n);
				} 
			}
		} else if (r % 6 === 5){
			for (let n = min; n <= max; ++n) {
				if ((n-1) % 8 >= 4){
					console.log("xfer f" + n + " b" + n);
				} 
			}
		}
	} else {
		//on the last row, bring any stitches on the back bed to the front
		for (let n = min; n <= max; ++n) {
			if ((n-1) % 8 >= 4){
				console.log("xfer b" + n + " f" + n);
			} 
		}
	}

}

console.log("outhook " + carrier);