/*
Not my code. From Textiles Lab at: https://github.com/textiles-lab/knitout-examples
Modified only to change carriers and to remove knitout writer
*/

console.log(";!knitout-2");
console.log(";;Carriers: 1 2 3 4 5 6 7 8 9 10");

// swatch variables
var height = 30;
var width = 41;
var carrier = '3';

// make sure the very first stitch in on the front bed,
// since the machine complains if its on the back
var front = width%2;

// bring in carrier using yarn inserting hook
console.log("inhook " + carrier);


//initial tuck cast-on
for (var s=width; s>0; s--) {
    if(s%2==front) {
    	console.log("tuck - f" + s + " " + carrier);
    }
    else {
    	console.log("tuck - b" + s + " " + carrier);
    }
}

//rib on way back, skip last of the tucks
for (var s=2; s<=width; s++) {
    if (s%2==front) {
    	console.log("knit + f" + s + " " + carrier);
    }
    else {
        console.log("knit + b" + s + " " + carrier);
    }
}

//lets knit an extra row to make sure stitches are definitely stable



// release the yarn inserting hook
console.log("releasehook " + carrier);


// knit until we have the right swatch height
var current_height = 0
while (current_height<height) {
	for (var s=width; s>0; s--) {
		if (s%2==front) {
			console.log("knit - f" + s + " " + carrier);
		}
		else {
			console.log("knit - b" + s + " " + carrier);
		}
	}


	for (var s=width; s>0; s--) {
		if (s%2==front) {
			console.log("xfer f" + s + " b" + s);
		}
		else {
			console.log("xfer b" + s + " f" + s);
		}
	}

	
	current_height++;

	if (current_height >= height) {
		break;
	}

	for (var s=1; s<=width; s++) {
		if (s%2==front) {
			console.log("knit + b" + s + " " + carrier);
		}
		else {
			console.log("knit + f" + s + " " + carrier);
		}
	}


	for (var s=1; s<=width; s++) {
		if (s%2==front) {
			console.log("xfer b" + s + " f" + s);
		}
		else {
			console.log("xfer f" + s + " b" + s);
		}
	}

	
	current_height++;
}

// bring the yarn out with the yarn inserting hook
console.log("outhook " + carrier);



