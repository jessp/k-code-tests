//Parameters:

const Width = 40;//multiple of 8
const Height = 40;
const Carrier = "3";

//Operation:

//Makes a Width x Height rectangle of plain knitting on the front bed with carrier Carrier.
//Uses an alternating-tucks cast-on.


console.log(";!knitout-2");
console.log(";;Carriers: 1 2 3 4 5 6 7 8 9 10");


//Alternating tucks cast-on:

console.log("inhook " + Carrier);

let min = 1;
let max = min + Width - 1;

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

Array.prototype.move = function(from, to) {
    this.splice(to, 0, this.splice(from, 1)[0]);
};

let top_or_bottom_of_square = false;
let side_of_fabric = ["f", "f", "f", "f", "b", "b", "b", "b"];
let is_reversed = false;
for (let r = 0; r < Height; ++r) {
	if (r % 4 === 0){
		is_reversed = !is_reversed;
	}

	if (r % 2 == 0) {
		let counter = 0;
		for (let n = max; n >= min; --n) {
			console.log("knit - " + side_of_fabric[counter%8] + n + " " + Carrier);
			counter++;
		}
	} else {
		let counter = 0;
		for (let n = min; n <= max; ++n) {
			console.log("knit + " + side_of_fabric[7 - counter%8] + n + " " + Carrier);
			counter++;
		}
	}

	if (is_reversed){
		side_of_fabric.move(side_of_fabric.length-1, 0);
	} else {
		side_of_fabric.move(0, side_of_fabric.length-1);
	}
}

console.log("outhook " + Carrier);