//Parameters:

const Width = 30;
const Height = 40;
const Carrier_A = "3";
const Carrier_B = "5";

//Operation:

//Makes a Width x Height rectangle of plain knitting on the front bed with carrier Carrier_A.
//Uses an alternating-tucks cast-on.


console.log(";!knitout-2");
console.log(";;Carriers: 1 2 3 4 5 6 7 8 9 10");


//Alternating tucks cast-on:

console.log("inhook " + Carrier_A);


let min = 1;
let max = min + Width - 1;

for (let n = max; n >= min; --n) {
	if ((max-n) % 2 == 0) {
		console.log("tuck - f" + n + " " + Carrier_A);
	}
}
for (let n = min; n <= max; ++n) {
	if ((max-n)%2 == 1) {
		console.log("tuck + f" + n + " " + Carrier_A);
	}
}

console.log("miss + f" + max + " " + Carrier_A);

console.log("releasehook " + Carrier_A);

console.log("inhook " + Carrier_B);


for (let r = 0; r < Math.min(Height/2); ++r) {


	if (r % 2 == 0) {
		for (let n = max; n >= min; --n) {
			console.log("knit - f" + n + " " + Carrier_A);
			// console.log("knit - f" + n + " " + Carrier_B);
		}
		for (let n = max; n >= min; --n) {
			// console.log("knit - f" + n + " " + Carrier_A);
			console.log("knit - b" + n + " " + Carrier_B);
		}
	} else {
		for (let n = min; n <= max; ++n) {
			console.log("knit + f" + n + " " + Carrier_A);
			// console.log("knit + f" + n + " " + Carrier_B);

		}
		for (let n = min; n <= max; ++n) {
			// console.log("knit + f" + n + " " + Carrier_A);
			console.log("knit + b" + n + " " + Carrier_B);

		}
	}
	if ( r === 1 ) {
		console.log("releasehook " + Carrier_B);
	}
}

console.log("outhook " + Carrier_A);

console.log("outhook " + Carrier_B);
