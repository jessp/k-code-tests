//Parameters:

const width = 30;
const height = 40;
const carrier = "3";

//Operation:

//Makes a width x height rectangle of plain "interlock" knitting
// basically, rows alternate front/back on each needle.

//Doesn't require a cast-on.


console.log(";!knitout-2");
console.log(";;Carriers: 1 2 3 4 5 6 7 8 9 10");

let min = 1;
let max = min + width - 1;

function knitTwoRows() {
	for (let n = max; n >= min; --n) {
		let bed = ((max - n) % 2 == 0 ? 'f' : 'b');
		console.log("knit - " + bed + n + " " + carrier);
	}
	for (let n = min; n <= max; ++n) {
		let bed = ((max - n) % 2 == 0 ? 'b' : 'f');
		console.log("knit + " + bed + n + " " + carrier);
	}
}


console.log("x-stitch-number 63"); //in our table: "Knitting" for Polo

// Get carrier in:
console.log("inhook " + carrier);
knitTwoRows();
console.log("releasehook " + carrier);

// Finish the remaining rows:
for (let r = 2; r < height; r += 2) {
	knitTwoRows();
}

// Take carrier out:
console.log("outhook " + carrier);