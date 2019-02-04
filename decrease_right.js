//Parameters:

const StartingWidth = 30;
const EndingWidth = 4;
const Height = 40;
const Carrier = "3";


//Operation:

//Makes a StartingWidth x Height rectangle of plain knitting on the front bed with carrier Carrier.
//Uses an alternating-tucks cast-on.
/*
x
x
x
xx
xxx
xxxx
xxxxx  

*/


console.log(";!knitout-2");
console.log(";;Carriers: 1 2 3 4 5 6 7 8 9 10");


//Alternating tucks cast-on:

console.log("inhook " + Carrier);

let min = 1;
let max = min + StartingWidth - 1;
let acting_width = max;

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

for (let r = 0; r < Height; ++r) {
	if (r % 2 == 0) {
		for (let n = acting_width; n >= min; --n) {
			console.log("knit - f" + n + " " + Carrier);
		}
	} else {
		for (let n = min; n <= acting_width; ++n) {
			console.log("knit + f" + n + " " + Carrier);
		}
	}
	if (acting_width > EndingWidth){
		if (r % 2 == 1){
			console.log("xfer f" + acting_width + " b" + acting_width);
			console.log("rack -1");
			console.log("xfer b" + acting_width + " f" + (acting_width - 1));
			console.log("rack 0");
		}
		acting_width--;
	}
}

console.log("outhook " + Carrier);