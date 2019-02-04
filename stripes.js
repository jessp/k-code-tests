//Parameters:

const Width = 30;
const Height = 40; //keep this number even
const Carrier_A = "3";
const Carrier_B = "4";
//look at entrelac

//Operation:

//Makes a Width x Height rectangle of plain knitting on the front bed with carrier Carrier.
//Uses an alternating-tucks cast-on.



console.log(";!knitout-2");
console.log(";;Carriers: 1 2 3 4 5 6 7 8 9 10");

//Alternating tucks cast-on:

console.log("inhook " + Carrier_A);

console.log("x-stitch-number 61"); //in our table: "Half / Wrap" for Polo

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


for (let n = max; n >= min; --n) {
	console.log("knit - f" + n + " " + Carrier_A);
}

console.log("releasehook " + Carrier_A);

for (let n = min; n <= max; ++n) {
	console.log("knit + f" + n + " " + Carrier_A);
}
for (let n = max; n >= min; --n) {
	console.log("knit - f" + n + " " + Carrier_A);
}

console.log("inhook " + Carrier_B);

for (let n = min; n <= max; ++n) {
	console.log("knit + f" + n + " " + Carrier_B);
}
console.log("releasehook " + Carrier_B);

for (let n = max; n >= min; --n) {
	console.log("knit - f" + n + " " + Carrier_B);
}
for (let n = min; n <= max; ++n) {
	console.log("knit + f" + n + " " + Carrier_B);
}


// Rows of plain knitting:
console.log("x-stitch-number 63"); //in our table: "Knitting" for Polo

let prev_carrier = Carrier_A;
let active_carrier = Carrier_A;

for (let r = 0; r < Height; ++r) {
	active_carrier = (r % 4 < 2) ? Carrier_A : Carrier_B;

	if (r % 2 == 0) {
		for (let n = max; n >= min; --n) {
			console.log("knit - f" + n + " " + active_carrier);
		}
	} else {
		for (let n = min; n <= max; ++n) {
			console.log("knit + f" + n + " " + active_carrier);
		}
	}
	prev_carrier = active_carrier;
}

console.log("outhook " + Carrier_B);


for (let n = max; n >= min; --n) {
	console.log("knit - f" + n + " " + Carrier_A);
}
for (let n = min; n <= max; ++n) {
	console.log("knit + f" + n + " " + Carrier_A);
}
for (let n = max; n >= min; --n) {
	console.log("knit - f" + n + " " + Carrier_A);
}


console.log("outhook " + Carrier_A);



