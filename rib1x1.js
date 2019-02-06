//not my code, from https://github.com/textiles-lab/knitout-examples
//only removed references to knitout writer and changed carrier number

console.log(";!knitout-2");
console.log(";;Carriers: 1 2 3 4 5 6 7 8 9 10");

// swatch variables
var height = 40;
var width = 20;
var carrier = 3;

// make sure the very first stitch in on the front bed,
// since the machine complains if its on the back
var front = width%2;

// bring in carrier using yarn inserting hook
console.log("inhook " + carrier);

//perform the initial tuck cast on
for (var s=width; s>0; s--) {
	if(s%2==front) {
		console.log("tuck - f" + s + " " + carrier);
	}
	else {
		console.log("tuck - b" + s + " " + carrier);
	}
}

//knit the tucked on stitches, making sure to skip the one we just tucked
for (var s=2; s<=width; s++) {
	if (s%2==front) {
		console.log("knit + f" + s + " " + carrier);
	}
	else {
		console.log("knit + b" + s + " " + carrier);
	}
}

// release the yarn inserting hook
console.log("releasehook " + carrier);

//knit until our swatch is the right length
var current_height = 0;

while (current_height < height) {
	for (var s=width; s>0; s--) {
		if (s%2==front) {
			console.log("knit - f" + s + " " + carrier);
		}
		else {
			console.log("knit - b" + s + " " + carrier);
		}
	}
	current_height++;

	for (var s=1; s<=width; s++) {
		if (s%2==front) {
			console.log("knit + f" + s + " " + carrier);
		}
		else {
			console.log("knit + b" + s + " " + carrier);
		}
	}
	current_height++;
}

// bring the yarn out with the yarn inserting hook
console.log("outhook " + carrier);
