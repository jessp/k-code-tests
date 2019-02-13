const fs = require('fs');
let kCode = "";

//not my code, from an old textiles lab file
//only changed carrier name and added a call to outhook

let min = 1;
let max = 20;

let carrier = "3";

kCode += (";!knitout-2" + "\n");

kCode += ("inhook " + carrier + "\n");

for (let n = max; n >= min; --n) {
	if ((max-n) % 2 == 0) {
		kCode += ("tuck - f" + n + " " + carrier + "\n");
	}
}
for (let n = min; n <= max; ++n) {
	if ((max-n)%2 == 1) {
		kCode += ("tuck + f" + n + " " + carrier + "\n");
	}
}

for (let n = max; n >= min; --n) {
	kCode += ("knit - f" + n + " " + carrier + "\n");
}

kCode += ("releasehook " + carrier + "\n");

let pattern = ['f', 'f', 'b', 'b'];

for (let n = min; n <= max; ++n) {
	if (pattern[(n-min)%pattern.length] === 'b') {
		kCode += ("xfer f" + n + " b" + n + "\n");
	}
}

let rows = 20;

for (let row = 0; row < rows; ++row) {
	if ((row % 2) === 0) {
		//knit to the right on even rows:
		for (let n = min; n <= max; ++n) {
			let bed = pattern[(n-min)%pattern.length];
			kCode += ("knit + " + bed + n + " " + carrier + "\n");
		}
	} else {
		//knit to the left on odd rows:
		for (let n = max; n >= min; --n) {
			let bed = pattern[(n-min)%pattern.length];
			kCode += ("knit - " + bed + n + " " + carrier + "\n");
		}
	}
}

kCode += ("outhook " + carrier + "\n");

//write to file
fs.writeFile("./../knitout-backend-swg/examples/in/rib2x2.knitout", kCode, function(err) {
    if(err) {
        return console.log(err);
    }

    console.log("The file was saved!");
}); 
