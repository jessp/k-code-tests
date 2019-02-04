//Parameters:

let rows_per_step = 2; //how many rows knitted at each step_width. Pretty sure this has to be a multiple of 2
let step_width = 4; //how many rows we decrease per step
let num_curves = 6; //number of triangles we want to make

const Width = 12;
const Height = Math.min(Width/step_width) * rows_per_step * num_curves;
const Carrier = "3";
//Operation:

//Makes a curving piece of joined fabric of plain knitting on the front bed with carrier Carrier.
//Uses an alternating-tucks cast-on.



console.log(";!knitout-2");
console.log(";;Carriers: 1 2 3 4 5 6 7 8 9 10");

//Alternating tucks cast-on:

console.log("inhook " + Carrier);

console.log("x-stitch-number 61"); //in our table: "Half / Wrap" for Polo

let min = 1;
let max = min + Width - 1;



for (let column = max; column >= min; --column) {
	if ((max - column) % 2 == 0) {
		console.log("tuck - f" + column + " " + Carrier);
	}
}
for (let column = min; column <= max; ++column) {
	if ((max - column)%2 == 1) {
		console.log("tuck + f" + column + " " + Carrier);
	}
}

console.log("miss + f" + max + " " + Carrier);

console.log("releasehook " + Carrier);


//direction is important, so let's start with a row knitting < to put us in the right direction
for (let column = max; column >= min; --column) {
	console.log("knit - f" + column + " " + Carrier);
}

for (let curve = 0; curve < num_curves; curve ++) {
	let steps = Math.min(Width/step_width);
	for (let step = 0; step < steps; step ++){
		let row_width = max - step * step_width;
		for (let row = 0; row < rows_per_step; row ++){
			if (row % 2 == 1) {
				for (let column = row_width; column >= min; --column) {
					console.log("knit - f" + column + " " + Carrier);
				}
			} else {
				for (let column = min; column <= row_width; ++column) {
					console.log("knit + f" + column + " " + Carrier);
				}
			}
		}
	}
}

console.log("outhook " + Carrier);