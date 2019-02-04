//Parameters:

const ShortWidth = 10;
const WideWidth = 30;
const ShortRows = 15;//odd number so we're going towards right on transfer
const Height = 40;
const Carrier = "3";

//Operation:

//Makes a StartingWidth x Height rectangle of plain knitting on the front bed with carrier Carrier.
//Uses an alternating-tucks cast-on.
/*
  
xxxxx
xxxxx
xxxxx
xxxxx
xx
xx
xx

*/


console.log(";!knitout-2");
console.log(";;Carriers: 1 2 3 4 5 6 7 8 9 10");


//Alternating tucks cast-on:

console.log("inhook " + Carrier);

let min = 1;
let max = ShortWidth - 1;

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
	if (r < ShortRows || r > ShortRows){
		if (r % 2 == 0) {
			for (let n = max; n >= min; --n) {
				console.log("knit - f" + n + " " + Carrier);
			}
		} else {
			for (let n = min; n <= max; ++n) {
				console.log("knit + f" + n + " " + Carrier);
			}
		}
	} else if (r === ShortRows){
		for (let n = 1; n <= WideWidth; ++n) {
			if (n > ShortWidth){
				if (n % 2 === 0){
					console.log("knit + f" + n + " " + Carrier);
				}
			} else {
				console.log("knit + f" + n + " " + Carrier);
			}
			
		}
		max = WideWidth;
	} 
}

console.log("outhook " + Carrier);


