//Parameters:

const width = 30;
const height = 40;
const carrier = "3";

//Operation:
//Makes a tube not connected at one of the seams.
//The tube's circumference is 2 x width, and its height is height/2


console.log(";!knitout-2");
console.log(";;Carriers: 1 2 3 4 5 6 7 8 9 10");


//Alternating tucks cast-on:
//This is NOT the right cast-on

console.log("inhook " + carrier);

let min = 1;
let max = min + width - 1;

//cast on on the first bed using alternating tucks...
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
//and then on the back bed
for (let n = max; n >= min; --n) {
	if ((max-n) % 2 == 0) {
		console.log("tuck - b" + n + " " + carrier);
	}
}
for (let n = min; n <= max; ++n) {
	if ((max-n)%2 == 1) {
		console.log("tuck + b" + n + " " + carrier);
	}
}

console.log("miss + f" + max + " " + carrier);

console.log("releasehook " + carrier);

for (let r = 0; r < height ; ++r) {
	//every two rows, alternate from back bed to front bed, so they only meet on one side
	let side = (r % 4 < 2) ? "f" : "b"; 
	if (r % 2 == 0) {
		for (let n = max; n >= min; --n) {
			console.log("knit - " + side + n + " " + carrier);
		}
	} else {
		for (let n = min; n <= max; ++n) {
			console.log("knit + " + side + n + " " + carrier);
		}
	}
}


console.log("outhook " + carrier);