//Parameters:

const Width = 16;
const Height = 40;
const Carrier = "3";

//Operation:

//Makes a Width x Height rectangle of plain knitting on the front bed with carrier Carrier.
//Uses an alternating-tucks cast-on.



console.log(";!knitout-2");
console.log(";;Carriers: 1 2 3 4 5 6 7 8 9 10");


console.log("inhook " + Carrier);

console.log("x-stitch-number 61"); //in our table: "Half / Wrap" for Polo

let min = 1;
let max = min + Width - 1;

//alternating tucks cast-on
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

//release the hook from the carrier hook
console.log("releasehook " + Carrier);

// Rows of plain knitting:
for (let r = 0; r < Height; ++r) {
	//every other row, change direction so we knit back and forth
	if (r % 2 == 0) {
		//we end on the right side (i.e., going in + direction), so we start by going towards the left (-))
		for (let n = max; n >= min; --n) {
			console.log("knit - f" + n + " " + Carrier);
		}
	} else {
		for (let n = min; n <= max; ++n) {
			console.log("knit + f" + n + " " + Carrier);
		}
	}
}

//bring yarn carrier out of action
console.log("outhook " + Carrier);