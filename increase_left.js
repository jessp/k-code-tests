//Parameters:

const StartingWidth = 4;
const EndingWidth = 30;
const Height = 40;
const Carrier = "3";


//Operation:

//Makes a StartingWidth x Height rectangle of plain knitting on the front bed with carrier Carrier.
//Uses an alternating-tucks cast-on.
/*
xxxxx
xxxxx
xxxxx
 xxxx
  xxx
   xx
    x  

*/


console.log(";!knitout-2");
console.log(";;Carriers: 1 2 3 4 5 6 7 8 9 10");


//Alternating tucks cast-on:

console.log("inhook " + Carrier);

let min = StartingWidth;
let max = min + EndingWidth - 1;
let acting_width = max - min;

for (let n = max; n >= (acting_width); --n) {
	if ((max-n) % 2 == 0) {
		console.log("tuck - f" + n + " " + Carrier);
	}
}
for (let n = acting_width; n <= max; ++n) {
	if ((max-n)%2 == 1) {
		console.log("tuck + f" + n + " " + Carrier);
	}
}

console.log("miss + f" + max + " " + Carrier);

console.log("releasehook " + Carrier);

for (let r = 0; r < Height; ++r) {
	if (r % 2 == 0) {
		for (let n = max; n >= acting_width; --n) {
			console.log("knit - f" + n + " " + Carrier);
		}
	} else {
		for (let n = acting_width; n <= max; ++n) {
			if (n == acting_width && (EndingWidth - acting_width) < EndingWidth){
				console.log("tuck + f" + n + " " + Carrier);
			} else {
				console.log("knit + f" + n + " " + Carrier);
			}
		}
	}
	if ((EndingWidth - acting_width) < EndingWidth){
		acting_width--;
	}
}

console.log("outhook " + Carrier);