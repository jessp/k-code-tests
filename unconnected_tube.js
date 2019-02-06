//Parameters:

const width = 30;
const height = 40;
const carrier1 = "3";
const carrier2 = "2";

//Operation:

//Makes two pieces of fabric knitted independently knitted on the front bed with carrier1
//and knitted on the back bed with carrier 2.
//Each rectangle is width x height/2.
//Uses an alternating-tucks cast-on.


console.log(";!knitout-2");
console.log(";;Carriers: 1 2 3 4 5 6 7 8 9 10");



let min = 1;
let max = min + width - 1;

//Alternating tucks cast-on on front bed with carrier 1
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


//Alternating tucks cast-on on back bed with carrier 2
console.log("inhook " + carrier2);

for (let n = max; n >= min; --n) {
	if ((max-n) % 2 == 0) {
		console.log("tuck - b" + n + " " + carrier2);
	}
}
for (let n = min; n <= max; ++n) {
	if ((max-n)%2 == 1) {
		console.log("tuck + b" + n + " " + carrier2);
	}
}

console.log("miss + f" + max + " " + carrier2);

console.log("releasehook " + carrier2);


for (let r = 0; r < Math.min(height/2); ++r) {


	if (r % 2 == 0) {
		//we'll write a line on the front bed and back bed going in the same direction for each row
		for (let n = max; n >= min; --n) {
			console.log("knit - f" + n + " " + carrier1);
		}
		for (let n = max; n >= min; --n) {
			console.log("knit - b" + n + " " + carrier2);
		}
	} else {
		for (let n = min; n <= max; ++n) {
			console.log("knit + f" + n + " " + carrier1);

		}
		for (let n = min; n <= max; ++n) {
			console.log("knit + b" + n + " " + carrier2);

		}
	}
}

console.log("outhook " + carrier1);

console.log("outhook " + carrier2);
