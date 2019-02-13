const fs = require('fs');
let kCode = "";

//Parameters:

const width = 40;//multiple of 8
const height = 40;
const carrier = "3";

//Operation:

//Makes a width x height rectangle of links-links stitches on the front bed with carrier carrier.
//Uses an alternating-tucks cast-on.
//Each unit looks as following:

/*
xxxxxxx----
-xxxxxxx---
--xxxxxxx--
---xxxxxxx-
----xxxxxxx
---xxxxxxx-
--xxxxxxx--
-xxxxxxx---
xxxxxxx----

*/

kCode += (";!knitout-2" + "\n");
kCode += (";;Carriers: 1 2 3 4 5 6 7 8 9 10" + "\n");


let min = 1;
let max = min + width - 1;

//starting pattern as to which side of the fabric the yarn should be on
let side_of_fabric = ["f", "f", "f", "f", "b", "b", "b", "b"]; 


//Alternating tucks cast-on:

kCode += ("inhook " + carrier + "\n");

for (let n = max; n >= min; --n) {
	if ((max - n) % 2 == 0) {
		if (side_of_fabric[(n-1)%8] === "f"){
			kCode += ("tuck - b" + n + " " + carrier + "\n");
		} else {
			kCode += ("tuck - f" + n + " " + carrier + "\n");
		}
	}
}
for (let n = min; n <= max; ++n) {
	if ((max - n)%2 == 1) {
		if (side_of_fabric[(n-1)%8] === "f"){
			kCode += ("tuck + b" + n + " " + carrier + "\n");
		} else {
			kCode += ("tuck + f" + n + " " + carrier + "\n");
		}
	}
}

kCode += ("miss + f" + max + " " + carrier + "\n");

kCode += ("releasehook " + carrier + "\n");

//Create a function that moves a variable from one index of an array to another
Array.prototype.move = function(from, to) {
    this.splice(to, 0, this.splice(from, 1)[0]);
};

let is_reversed = false;
let previous_side_of_fabric = side_of_fabric; //keep track of the last knitted pattern, so we know what we need to transfer
for (let r = 0; r < height; ++r) {

	//transfer yarn from back bed to front and vise verse as needed before stitching the main part of the swatch
	if (r != 0){
		let counter = 0;
		for (let n = max; n >= min; --n) {
			if (side_of_fabric[counter % 8] !== previous_side_of_fabric[counter % 8]){
				if (side_of_fabric[counter % 8] == "f"){
					kCode += ("xfer b" + n + " f" + n + "\n");
				} else {
					kCode += ("xfer f" + n + " b" + n + "\n");
				}
			} 
			counter++;
		}
	}


	if (r % 4 === 0){
		//every four rows, we start shifting our pattern in the opposite direction, in order to achieve a zig-zag pattern
		is_reversed = !is_reversed;
	}

	if (r % 2 == 0) {
		let counter = 0;
		for (let n = max; n >= min; --n) {
			//use the side_of_fabric array to determine the side of the fabric we're on
			kCode += ("knit - " + side_of_fabric[counter%8] + n + " " + carrier + "\n");
			counter++;
		}
	} else {
		let counter = 0;
		for (let n = min; n <= max; ++n) {
			kCode += ("knit + " + side_of_fabric[7 - counter%8] + n + " " + carrier + "\n");
			counter++;
		}
	}

	//after the last row, transfer any stitches on the back bed forward
	if (r == height-1){
		let counter = 0;
		for (let n = max; n >= min; --n) {
			if (side_of_fabric[counter % 8] == "b"){
				kCode += ("xfer b" + n + " f" + n + "\n");
			} 
			counter++;
		}
	}

	previous_side_of_fabric = Array.from(side_of_fabric);//deep copy the array

	//shift the last unit to the front of the pattern array or vise verse
	//after each row, in order to create the zig zag pattern
	if (is_reversed){
		side_of_fabric.move(side_of_fabric.length-1, 0);
	} else {
		side_of_fabric.move(0, side_of_fabric.length-1);
	}
}



kCode += ("outhook " + carrier + "\n");


//write to file
fs.writeFile("./../knitout-backend-swg/examples/in/links_links_4.knitout", kCode, function(err) {
    if(err) {
        return console.log(err);
    }

    console.log("The file was saved!");
}); 