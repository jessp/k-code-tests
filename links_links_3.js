//Parameters:

const width = 36;//multiple of 6
const height = 42; //multiple of 6
const carrier = "3";

//Operation:

//Makes a width x height rectangle of links-links stitches on the front bed with carrier carrier.
//Uses an alternating-tucks cast-on.
//Each unit looks as following:

/*

x------x
xxxxxxxx
-xxxxxx-
-xxxxxx-
xxxxxxxx
x------x

*/



console.log(";!knitout-2");
console.log(";;Carriers: 1 2 3 4 5 6 7 8 9 10");


//Alternating tucks cast-on:

console.log("inhook " + carrier);

let min = 1;
let max = min + width - 1;

//we need to ensure that cast-on stitches below perled stitches are on back bed 
for (let n = max; n >= min; --n) {
	if ((max-n) % 2 == 0) {
		if ((max-n) % 6 === 0 || (max-n) % 6 === 5){
			console.log("tuck - f" + n + " " + carrier);
		} else {
			console.log("tuck - b" + n + " " + carrier);
		}
	}
}
for (let n = min; n <= max; ++n) {
	if ((max-n)%2 == 1) {
		if ((max-n) % 6 === 0 || (max-n) % 6 === 5){
			console.log("tuck + f" + n + " " + carrier);
		} else {
			console.log("tuck + b" + n + " " + carrier);
		}
	}
}

console.log("miss + f" + max + " " + carrier);

console.log("releasehook " + carrier);


let top_or_bottom_of_square = false; //on the top or bottom of each unit, the stitches are different
for (let r = 0; r < height; ++r) {

	if (r % 6 === 0 || r % 6 === 5) { top_or_bottom_of_square = true; }
	else { top_or_bottom_of_square = false; }

	if (r % 2 == 0) {
		let counter = 0;
		for (let n = max; n >= min; --n) {

			if (top_or_bottom_of_square) {
				//the first and sixth knit in each unit is treated differently
				if (counter % 6 === 0 || counter % 6 === 5){
					console.log("knit - f" + n + " " + carrier);
				} else {
					console.log("knit - b" + n + " " + carrier);
				}
			} else {
				if (counter % 6 === 0 || counter % 6 === 5){
					console.log("knit - b" + n + " " + carrier);
				} else {
					console.log("knit - f" + n + " " + carrier);
				}
			}
			counter++;
		}
	} else {
		let counter = 0;
		for (let n = min; n <= max; ++n) {

			if (top_or_bottom_of_square) {
				if (counter % 6 === 0 || counter % 6 === 5){
					console.log("knit + f" + n + " " + carrier);
				} else {
					console.log("knit + b" + n + " " + carrier);
				}
			} else {
				if (counter % 6 === 0 || counter % 6 === 5){
					console.log("knit + b" + n + " " + carrier);
				} else {
					console.log("knit + f" + n + " " + carrier);
				}
			}
			counter++;
		}
	}

	//transfer stitches to the front or back bed as needed
	if (r !== (height - 1)){
		if (r % 6 === 0){
			for (let n = min; n <= max; ++n) {
				if ((n-1) % 6 === 0 || (n-1) % 6 === 5){
					console.log("xfer f" + n + " b" + n);
				} else {
					console.log("xfer b" + n + " f" + n);
				}
			}
		} else if (r % 6 === 4){
			for (let n = min; n <= max; ++n) {
				if ((n-1) % 6 === 0 || (n-1) % 6 === 5){
					console.log("xfer b" + n + " f" + n);
				} else {
					console.log("xfer f" + n + " b" + n);
				}
			}
		}
	} else {
		//on the last row, move any stitches on the back bed to the front
		for (let n = min; n <= max; ++n) {
			if ((n-1) % 6 !== 0 && (n-1) % 6 !== 5){
				console.log("xfer b" + n + " f" + n);
			}
		}
	}
}

console.log("outhook " + carrier);