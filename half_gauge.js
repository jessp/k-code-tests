//Parameters:

const width = 33;//odd number so we have a knit rather than a miss on both ends
const height = 40;
const carrier = "3";

//Operation:

//Makes a width x height rectangle of plain knitting on the front bed with carrier carrier.
//The lower half of the fabric is full knit, the upper half is half guage.
//Uses an alternating-tucks cast-on.

/*
xxxxxxxxxxx
x x x x x x
x x x x x x
xxxxxxxxxxx
xxxxxxxxxxx
xxxxxxxxxxx
*/



console.log(";!knitout-2");
console.log(";;Carriers: 1 2 3 4 5 6 7 8 9 10");

//Alternating tucks cast-on:

console.log("inhook " + carrier);

let min = 1;
let max = min + width - 1;


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

//knit normally for the bottom half of the swatch
for (let r = 0; r < height/2; ++r) {
	if (r % 2 == 0) {
		for (let n = max; n >= min; --n) {
			console.log("knit - f" + n + " " + carrier);
		}
	} else {
		for (let n = min; n <= max; ++n) {
			console.log("knit + f" + n + " " + carrier);
		}
	}
}

//for the upper half of the fabric, alternate between knits and misses
for (let r = height/2; r < height; ++r) {
	//before the first row of half guage, transfer threads to be on missed needles
	//onto a neighbouring needle. Direction of racking shouldn't matter
	if (r === height/2){
		//remember, our transfering process involves moving transfering back and forth from the back to the front
		//carrier, and moving ("racking") the back carrier
		for (let n = max; n >= min; --n) {
			if (n % 2 === 0){
				console.log("xfer f" + n + " b" + n);
				console.log("rack 1");
				console.log("xfer b" + n + " f" + (n+1));
				console.log("rack 0");
			}
		}
	}
	if (r % 2 == 0) {
		for (let n = max; n >= min; --n) {
			if (n % 2 === 0){
				console.log("miss - f" + n + " " + carrier);
			} else {
				console.log("knit - f" + n + " " + carrier);
			}
		}
	} else {
		for (let n = min; n <= max; ++n) {
			if (n % 2 === 0){
				console.log("miss + f" + n + " " + carrier);
			} else {
				console.log("knit + f" + n + " " + carrier);
			}
		}
	}
}

console.log("outhook " + carrier);
