//Parameters:

const width = 30;
const height = 40; //keep this number even
const carrier1 = "3";
const carrier2 = "2";

//Operation:

//Makes a width x height rectangle of plain knitting on the front bed.
//Alternates in striped colours between carrier1 and carrier2.
//Uses an alternating-tucks cast-on.



let min = 1;
let max = min + width - 1;


console.log(";!knitout-2");
console.log(";;Carriers: 1 2 3 4 5 6 7 8 9 10");

//Alternating tucks cast-on with carrier 1:
console.log("inhook " + carrier1);


for (let n = max; n >= min; --n) {
	if ((max-n) % 2 == 0) {
		console.log("tuck - f" + n + " " + carrier1);
	}
}
for (let n = min; n <= max; ++n) {
	if ((max-n)%2 == 1) {
		console.log("tuck + f" + n + " " + carrier1);
	}
}

console.log("miss + f" + max + " " + carrier1);

console.log("releasehook " + carrier1);

//knit one two lines with carrier1
for (let n = max; n >= min; --n) {
	console.log("knit - f" + n + " " + carrier1);
}

for (let n = min; n <= max; ++n) {
	console.log("knit + f" + n + " " + carrier1);
}

//load on carrier 2
console.log("inhook " + carrier2);

//knit two rows with carrier 2 to put the thread into play
for (let n = max; n >= min; --n) {
	console.log("knit - f" + n + " " + carrier2);
}
for (let n = min; n <= max; ++n) {
	console.log("knit + f" + n + " " + carrier2);
}

//release yarn on carrier 2 from the carrier hook
console.log("releasehook " + carrier2);

// Rows of plain knitting:
let active_carrier = carrier1;

for (let r = 0; r < height; ++r) {
	active_carrier = (r % 4 < 2) ? carrier1 : carrier2; //switch the active yarn every 2 rows

	if (r % 2 == 0) {
		for (let n = max; n >= min; --n) {
			console.log("knit - f" + n + " " + active_carrier);
		}
	} else {
		for (let n = min; n <= max; ++n) {
			console.log("knit + f" + n + " " + active_carrier);
		}
	}
}

//take carrier 2 out of play
console.log("outhook " + carrier2);

//knit a few more lines with carrier 1 -- is this necessary?
for (let n = max; n >= min; --n) {
	console.log("knit - f" + n + " " + carrier1);
}
for (let n = min; n <= max; ++n) {
	console.log("knit + f" + n + " " + carrier1);
}
for (let n = max; n >= min; --n) {
	console.log("knit - f" + n + " " + carrier1);
}

//take carrier 1 out of play
console.log("outhook " + carrier1);



