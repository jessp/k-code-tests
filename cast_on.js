//Parameters:

const shortWidth = 10;//the narrower of the two widths
const wideWidth = 30;//the wider of the two widths
const shortRows = 15;//how many short rows we knit before switching to wide rows -- odd number so we're going towards right on transfer
const height = 40;
const carrier = "3";

//Operation:

//Makes a shortWidth x shortRows rectangle connected to a wideWidth x (height - shortRows) 
//rectangle of plain knitting on the front bed with carrier carrier.
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

console.log("inhook " + carrier);

let min = 1;
let max = shortWidth - 1;

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

console.log("miss + f" + max + " " + carrier);

console.log("releasehook " + carrier);


for (let r = 0; r < height; ++r) {
	//if we're not at the threshold between where we switch from short rows to long rows, knit normally
	if (r < shortRows || r > shortRows){
		if (r % 2 == 0) {
			for (let n = max; n >= min; --n) {
				console.log("knit - f" + n + " " + carrier);
			}
		} else {
			for (let n = min; n <= max; ++n) {
				console.log("knit + f" + n + " " + carrier);
			}
		}
	//if we're at the threshold between where we switch from short rows to wide rows...
	} else if (r === shortRows){
		//starting at "min" and going for the full width of the textile
		for (let n = min; n <= wideWidth - 1; ++n) {
			//if we're within the range of short width...
			if (n <= shortWidth){
				console.log("knit + f" + n + " " + carrier);
			} else {
				//otherwise knit on every other needle
				if (n % 2 === 0){
					console.log("knit + f" + n + " " + carrier);
				}
			}
			
		}
		//after the transition, set the acting width to wideWidth 
		max = wideWidth - 1;
	} 
}

//bring yarn carrier out of action
console.log("outhook " + carrier);