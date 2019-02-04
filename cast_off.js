//Parameters:

const ShortWidth = 10;
const WideWidth = 30;
const WideRows = 16;//even number so we're going towards right on transfer
const Height = 40;
const Carrier = "3";

//Operation:

//Makes a StartingWidth x Height rectangle of plain knitting on the front bed with carrier Carrier.
//Uses an alternating-tucks cast-on.
/*
   xx
   xx
   xx  
xxxxx
xxxxx
xxxxx
xxxxx

*/


console.log(";!knitout-2");
console.log(";;Carriers: 1 2 3 4 5 6 7 8 9 10");


//Alternating tucks cast-on:

console.log("inhook " + Carrier);

let min = 1;
let max = WideWidth - 1;

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
	if (r < WideRows || r > WideRows){
		if (r % 2 == 0) {
			for (let n = max; n >= min; --n) {
				console.log("knit - f" + n + " " + Carrier);
			}
		} else {
			for (let n = min; n <= max; ++n) {
				console.log("knit + f" + n + " " + Carrier);
			}
		}
	} else if (r === WideRows){
		for (let row_index = min; row_index <= (WideWidth - ShortWidth - 1); row_index++ ){
			let direc = row_index % 2 === 1 ? "-" : "+";
			console.log("knit " + direc + " f" + row_index + " " + Carrier);
			console.log("xfer f" + row_index + " b" + row_index);
			console.log("rack 1");
			console.log("xfer b" + row_index + " f" + (row_index + 1));
			console.log("rack 0");

		}
		min = WideWidth - ShortWidth;
	} 
}

console.log("outhook " + Carrier);


