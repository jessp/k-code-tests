/*
Not my code. From Textiles Lab at: https://github.com/textiles-lab/knitout-examples
Modified only to change carriers and to remove knitout-frontend
*/


console.log(";!knitout-2")
console.log(";;Carriers: 1 2 3 4 5 6 7 8 9 10")

// swatch variables
var height = 40;
var width = 41; //want to put first stich on the front bed, hack for now
var carrier = "3";

// bring in carrier using yarn inserting hook
console.log("inhook " + carrier);

var front = width%2;


// tuck on alternate needles to cast on
for (var s=width; s>0; s--) {
	if (s%2 == front) {
		console.log("tuck - f" + s + " " + carrier);
	}
	else {
		//k.miss("-", "f"+s, carrier);
	}
}
for (var s=1; s<=width; s++) {
	if (s%2 != front) {
		console.log("tuck + f" + s + " " + carrier);
	}
	else {
		//k.miss("+", "f"+s, carrier);
	}
}

// release the yarn inserting hook
console.log("releasehook " + carrier);


// knit some rows back and forth
for (var h=0; h<height; h++) {
	for (var s=width; s>0; s--) {
        console.log("knit - f" + s + " " + carrier);
	}
    for (var s=width; s>0; s--) {
        console.log("xfer f" + s + " b" + s);
	}
	for (var s=1; s<=width; s++) {
		console.log("knit + b" + s + " " + carrier);
	}
    for (var s=1; s<=width; s++) {
		console.log("xfer b" + s + " f" + s);
	}
}

// bring the yarn out with the yarn inserting hook
console.log("outhook " + carrier);


