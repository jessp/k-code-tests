//Parameters:

const width = 30;
const height = 40;
const carrier = "3";

//Operation:
//Makes a tube with circumference of width * 2 and height of height/2


console.log(";!knitout-2");
console.log(";;Carriers: 1 2 3 4 5 6 7 8 9 10");


//Alternating tucks cast-on:

console.log("inhook " + carrier);

let min = 1;
let max = min + width - 1;

//cast-on on the front bed first...
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

//and then on the back bed
for (let n = max; n >= min; --n) {
	if ((max-n) % 2 == 0) {
		console.log("tuck - b" + n + " " + carrier);
	}
}
for (let n = min; n <= max; ++n) {
	if ((max-n)%2 == 1) {
		console.log("tuck + b" + n + " " + carrier);
	}
}

console.log("miss + f" + max + " " + carrier);

console.log("releasehook " + carrier);

for (let r = 0; r < height; ++r) {
	//essentially, knit going in only one way on each bed, so they only meet on the edges
	if (r % 2 == 0) {
		for (let n = max; n >= min; --n) {
			console.log("knit - f" + n + " " + carrier);
		}
	} else {
		for (let n = min; n <= max; ++n) {
			console.log("knit + b" + n + " " + carrier);
		}
	}
}

console.log("outhook " + carrier);