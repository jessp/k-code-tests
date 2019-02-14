const fs = require('fs');
let kCode = "";


//Parameters:

const width = 6;
//no height, we'll determine height by numHoles
const carrier = "3";
const numHoles = 8;
let diameter = 1;//first hole diameter
let centre = Math.floor(width/2);


//Operation:

//Makes a width x height rectangle of plain knitting on the front bed with carrier carrier.
//Contains numHoles holes/slits of increasing size going up the fabric.
//This is an experiment to see the effect of creating holes via transferring right.
//Uses an alternating-tucks cast-on.



/*
xxxxx
xx xx
xx xx
xx xx
xxxxx
xxxxx
xx xx
xx xx
xxxxx
xx xx
xxxxx
*/



kCode += (";!knitout-2" + "\n");
kCode += (";;Carriers: 1 2 3 4 5 6 7 8 9 10" + "\n");

//Alternating tucks cast-on:

kCode += ("inhook " + carrier + "\n");

let min = 1;
let max = min + width - 1;

kCode += ("miss + f" + max + " " + carrier + "\n");

kCode += ("releasehook " + carrier + "\n");

function knitCourse(numTimes){
	for (var i = 0; i <= numTimes; i++){
		for (let n = max; n >= min; --n) {
			kCode += ("knit - f" + n + " " + carrier + "\n");
		}
		for (let n = min; n <= max; ++n) {
			kCode += ("knit + f" + n + " " + carrier + "\n");
		}
	}
}

while (diameter < numHoles){
	knitCourse(3);

	let currentLength = 0; //variable to keep track of where we are in the current diameter
	while (currentLength < diameter){
		for (let n = max; n >= min; --n) {
			kCode += ("knit - f" + n + " " + carrier + "\n");
		}
		if (currentLength < diameter){
			kCode += ("xfer f" + (centre)  + " b" + centre  + "\n");
			kCode += ("rack 1" + "\n"); //move back bed one over
			kCode += ("xfer b" + (centre)  + " f" + (centre + 1) + "\n");
			kCode += ("rack 0" + "\n"); //return racking to initial position
			currentLength++;
		} 
		for (let n = min; n <= max; ++n) {
			kCode += ("knit + f" + n + " " + carrier + "\n");
		}
		if (currentLength < diameter){
			kCode += ("xfer f" + (centre)  + " b" + centre  + "\n");
			kCode += ("rack 1" + "\n"); //move back bed one over
			kCode += ("xfer b" + (centre)  + " f" + (centre + 1) + "\n");
			kCode += ("rack 0" + "\n"); //return racking to initial position
			currentLength++;
		} 
	}
	diameter++;
}

kCode += ("outhook " + carrier + "\n");

//write to file
fs.writeFile("./../knitout-backend-swg/examples/in/slit_in_centre.knitout", kCode, function(err) {
    if(err) {
        return console.log(err);
    }

    console.log("The file was saved!");
}); 
