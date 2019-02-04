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

let min = 1;
let max = EndingWidth;
let acting_width = StartingWidth;

for (let n = acting_width; n >= min; --n) {
	if ((max-n) % 2 == 0) {
		console.log("tuck - f" + n + " " + Carrier);
	}
}
for (let n = min; n <= acting_width; ++n) {
	if ((max-n)%2 == 1) {
		console.log("tuck + f" + n + " " + Carrier);
	}
}

console.log("miss + f" + acting_width + " " + Carrier);

console.log("releasehook " + Carrier);

//direction is important when tucking on an edge
for (let n = acting_width; n >= min; --n) {
	console.log("knit - f" + n + " " + Carrier);
}

for (let r = 0; r < Height - 1; ++r) {
	if (r % 2 == 1) {
		if (acting_width < EndingWidth){
			acting_width++;
		}
		for (let n = acting_width; n >= min; --n) {
			if (n == acting_width && acting_width < EndingWidth){
				console.log("tuck - f" + n + " " + Carrier);
			} else {
				console.log("knit - f" + n + " " + Carrier);
			}
		}
	} else {
		for (let n = min; n <= acting_width; ++n) {
			console.log("knit + f" + n + " " + Carrier);
		}
	}
}

console.log("outhook " + Carrier);