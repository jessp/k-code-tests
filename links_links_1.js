//Parameters:

const Width = 28;//multiple of 4
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


let reversed = false;
for (let r = 0; r < Height; ++r) {

	let isFront = false;

	if (r % 4 === 0) { reversed = !reversed;}

	if (r % 2 == 0) {
		let counter = 0;
		for (let n = max; n >= min; --n) {
			counter++;

			if (reversed) {
				console.log("knit - "  + (isFront ? "f" : "b") + n + " " + Carrier);
			} else {
				console.log("knit - "  + (isFront ? "b" : "f") + n + " " + Carrier);
			}
			if (counter % 4 === 0) { isFront = !isFront;}
		}
	} else {
		let counter = 0;
		for (let n = min; n <= max; ++n) {
			counter++;

			if (reversed) {
				console.log("knit + "  + (isFront ? "f" : "b") + n + " " + Carrier);
			} else {
				console.log("knit + "  + (isFront ? "b" : "f") + n + " " + Carrier);
			}
			if (counter % 4 === 0) { isFront = !isFront;}
		}
	}
}

console.log("outhook " + Carrier);