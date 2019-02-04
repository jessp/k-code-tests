//Parameters:

const Width = 36;//multiple of 6
const Height = 40;
const Carrier = "3";

//Operation:

//Makes a Width x Height rectangle of plain knitting on the front bed with carrier Carrier.
//Uses an alternating-tucks cast-on.


console.log(";!knitout-2");
console.log(";;Carriers: 1 2 3 4 5 6 7 8 9 10");


//Alternating tucks cast-on:

console.log("inhook " + Carrier);

let min = 1;
let max = min + Width - 1;

for (let n = max; n >= min; --n) {
	if ((max-n) % 2 == 0) {
		console.log("tuck - f" + n + " " + Carrier);
	}
}
for (let n = min; n <= max; ++n) {
	if ((max-n)%2 == 1) {
		console.log("tuck + f" + n + " " + Carrier);
	}
}

console.log("miss + f" + max + " " + Carrier);

console.log("releasehook " + Carrier);


let top_or_bottom_of_square = false;
for (let r = 0; r < Height; ++r) {

	if (r % 6 === 0 || r % 6 === 5) { top_or_bottom_of_square = true; }
	else { top_or_bottom_of_square = false; }

	if (r % 2 == 0) {
		let counter = 0;
		for (let n = max; n >= min; --n) {

			if (top_or_bottom_of_square) {
				if (counter % 6 === 0 || counter % 6 === 5){
					console.log("knit - f" + n + " " + Carrier);
				} else {
					console.log("knit - b" + n + " " + Carrier);
				}
			} else {
				if (counter % 6 === 0 || counter % 6 === 5){
					console.log("knit - b" + n + " " + Carrier);
				} else {
					console.log("knit - f" + n + " " + Carrier);
				}
			}
			counter++;
		}
	} else {
		let counter = 0;
		for (let n = min; n <= max; ++n) {

			if (top_or_bottom_of_square) {
				if (counter % 6 === 0 || counter % 6 === 5){
					console.log("knit + f" + n + " " + Carrier);
				} else {
					console.log("knit + b" + n + " " + Carrier);
				}
			} else {
				if (counter % 6 === 0 || counter % 6 === 5){
					console.log("knit + b" + n + " " + Carrier);
				} else {
					console.log("knit + f" + n + " " + Carrier);
				}
			}
			counter++;
		}
	}
}

console.log("outhook " + Carrier);