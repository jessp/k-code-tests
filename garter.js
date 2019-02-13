const fs = require('fs');
let kCode = "";

/*
Not my code. From Textiles Lab at: https://github.com/textiles-lab/knitout-examples
Modified only to change carriers and to remove knitout-frontend
*/


kCode += (";!knitout-2" + "\n");
kCode += (";;Carriers: 1 2 3 4 5 6 7 8 9 10" + "\n");

// swatch variables
var height = 40;
var width = 41; //want to put first stich on the front bed, hack for now
var carrier = "3";

// bring in carrier using yarn inserting hook
kCode += ("inhook " + carrier + "\n");

var front = width%2;


// tuck on alternate needles to cast on
for (var s=width; s>0; s--) {
	if (s%2 == front) {
		kCode += ("tuck - f" + s + " " + carrier + "\n");
	}
	else {
		//k.miss("-", "f"+s, carrier);
	}
}
for (var s=1; s<=width; s++) {
	if (s%2 != front) {
		kCode += ("tuck + f" + s + " " + carrier + "\n");
	}
	else {
		//k.miss("+", "f"+s, carrier);
	}
}

// release the yarn inserting hook
kCode += ("releasehook " + carrier + "\n");


// knit some rows back and forth
for (var h=0; h<height; h++) {
	for (var s=width; s>0; s--) {
        kCode += ("knit - f" + s + " " + carrier + "\n");
	}
    for (var s=width; s>0; s--) {
        kCode += ("xfer f" + s + " b" + s + "\n");
	}
	for (var s=1; s<=width; s++) {
		kCode += ("knit + b" + s + " " + carrier + "\n");
	}
    for (var s=1; s<=width; s++) {
		kCode += ("xfer b" + s + " f" + s + "\n");
	}
}

// bring the yarn out with the yarn inserting hook
kCode += ("outhook " + carrier + "\n");

//write to file
fs.writeFile("./../knitout-backend-swg/examples/in/garter.knitout", kCode, function(err) {
    if(err) {
        return console.log(err);
    }

    console.log("The file was saved!");
}); 