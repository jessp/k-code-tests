const fs = require('fs');
let kCode = "";

//not my code, from https://github.com/textiles-lab/knitout-examples
//only removed references to knitout writer and changed carrier number

kCode += (";!knitout-2" + "\n");
kCode += (";;Carriers: 1 2 3 4 5 6 7 8 9 10" + "\n");

// swatch variables
var height = 40;
var width = 20;
var carrier = 3;

// make sure the very first stitch in on the front bed,
// since the machine complains if its on the back
var front = width%2;

// bring in carrier using yarn inserting hook
kCode += ("inhook " + carrier + "\n");

//perform the initial tuck cast on
for (var s=width; s>0; s--) {
	if(s%2==front) {
		kCode += ("tuck - f" + s + " " + carrier + "\n");
	}
	else {
		kCode += ("tuck - b" + s + " " + carrier + "\n");
	}
}

//knit the tucked on stitches, making sure to skip the one we just tucked
for (var s=2; s<=width; s++) {
	if (s%2==front) {
		kCode += ("knit + f" + s + " " + carrier + "\n");
	}
	else {
		kCode += ("knit + b" + s + " " + carrier + "\n");
	}
}

// release the yarn inserting hook
kCode += ("releasehook " + carrier + "\n");

//knit until our swatch is the right length
var current_height = 0;

while (current_height < height) {
	for (var s=width; s>0; s--) {
		if (s%2==front) {
			kCode += ("knit - f" + s + " " + carrier + "\n");
		}
		else {
			kCode += ("knit - b" + s + " " + carrier + "\n");
		}
	}
	current_height++;

	for (var s=1; s<=width; s++) {
		if (s%2==front) {
			kCode += ("knit + f" + s + " " + carrier + "\n");
		}
		else {
			kCode += ("knit + b" + s + " " + carrier + "\n");
		}
	}
	current_height++;
}

// bring the yarn out with the yarn inserting hook
kCode += ("outhook " + carrier + "\n");

//write to file
fs.writeFile("./../knitout-backend-swg/examples/in/rib1x1.knitout", kCode, function(err) {
    if(err) {
        return console.log(err);
    }

    console.log("The file was saved!");
}); 
