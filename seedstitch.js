const fs = require('fs');
let kCode = "";

/*
Not my code. From Textiles Lab at: https://github.com/textiles-lab/knitout-examples
Modified only to change carriers and to remove knitout writer
*/

kCode += (";!knitout-2" + "\n");
kCode += (";;Carriers: 1 2 3 4 5 6 7 8 9 10" + "\n");

// swatch variables
var height = 30;
var width = 41;
var carrier = '3';

// make sure the very first stitch in on the front bed,
// since the machine complains if its on the back
var front = width%2;

// bring in carrier using yarn inserting hook
kCode += ("inhook " + carrier + "\n");


//initial tuck cast-on
for (var s=width; s>0; s--) {
    if(s%2==front) {
    	kCode += ("tuck - f" + s + " " + carrier + "\n");
    }
}

//rib on way back, skip last of the tucks
for (var s=2; s<=width; s++) {
    if (s%2!=front) {
    	kCode += ("tuck + b" + s + " " + carrier + "\n");
    }
}

//lets knit an extra row to make sure stitches are definitely stable



// release the yarn inserting hook
kCode += ("releasehook " + carrier + "\n");


// knit until we have the right swatch height
var current_height = 0
while (current_height<height) {
	for (var s=width; s>0; s--) {
		if (s%2==front) {
			kCode += ("knit - f" + s + " " + carrier + "\n");
		}
		else {
			kCode += ("knit - b" + s + " " + carrier + "\n");
		}
	}


	for (var s=width; s>0; s--) {
		if (s%2==front) {
			kCode += ("xfer f" + s + " b" + s + "\n");
		}
		else {
			kCode += ("xfer b" + s + " f" + s + "\n");
		}
	}

	
	current_height++;

	if (current_height >= height) {
		break;
	}

	for (var s=1; s<=width; s++) {
		if (s%2==front) {
			kCode += ("knit + b" + s + " " + carrier + "\n");
		}
		else {
			kCode += ("knit + f" + s + " " + carrier + "\n");
		}
	}


	for (var s=1; s<=width; s++) {
		if (s%2==front) {
			kCode += ("xfer b" + s + " f" + s + "\n");
		}
		else {
			kCode += ("xfer f" + s + " b" + s + "\n");
		}
	}

	
	current_height++;
}

// bring the yarn out with the yarn inserting hook
kCode += ("outhook " + carrier + "\n");

//write to file
fs.writeFile("./../knitout-backend-swg/examples/in/seedstitch.knitout", kCode, function(err) {
    if(err) {
        return console.log(err);
    }

    console.log("The file was saved!");
}); 

