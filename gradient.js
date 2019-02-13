const fs = require('fs');
let kCode = "";

//Parameters:
let stripesNum = 4; //number of knit stripes
let columnPos = calculateIndexPosition(stripesNum);//create an array representing if stitches at each index is a knit or perl
let min = 1; //start at needle 1
let max = columnPos.length; //the total width, or "max" is equal to the length of columnPos
let carrier = "3";
let height = 20;

//Operation:

//Makes a max x height rectangle of knitting with carrier carrier.
//It goes in increasingly larger ribs.
//Uses an alternating-tucks cast-on.
/*
x-xx--xxx---
x-xx--xxx---
x-xx--xxx---
x-xx--xxx---
x-xx--xxx---
*/

kCode += (";!knitout-2" + "\n");
kCode += (";;Carriers: 1 2 3 4 5 6 7 8 9 10" + "\n");


kCode += ("inhook " + carrier + "\n");
//Alternating tucks cast-on:
for (let n = max; n >= min; --n) {
	if ((max-n) % 2 == 0) {
		if (columnPos[n - 1] === 0) {
			kCode += ("tuck - f" + n + " " + carrier + "\n");
		} else{
			kCode += ("tuck - b" + n + " " + carrier + "\n");
		}
	}
}
for (let n = min; n <= max; ++n) {
	if ((max-n)%2 == 1) {
		if (columnPos[n - 1] === 0) {
			kCode += ("tuck + f" + n + " " + carrier + "\n");
		} else{
			kCode += ("tuck + b" + n + " " + carrier + "\n");
		}
	}
}

kCode += ("miss + f" + max + " " + carrier + "\n");

//release the yarn from the carrier hook
kCode += ("releasehook " + carrier + "\n");

var current_height = 0;

//knit for the full height of the garment
while (current_height < height) {
	//right to left
	for (let s=max; s>0; s--) {
		//our column indexes start from 0 so we need to subtract 1
		if (columnPos[s - 1] === 0) {
			//knit back side
			kCode += ("knit - f" + s + " " + carrier + "\n");
		}
		else {
			//knit front side
			kCode += ("knit - b" + s + " " + carrier + "\n");
		}
	}
	current_height++;

	//left to right
	for (let s=1; s<=max; s++) {
		if (columnPos[s - 1] === 0) {
			kCode += ("knit + f" + s + " " + carrier + "\n");
		}
		else {
			kCode += ("knit + b" + s + " " + carrier + "\n");
		}
	}
	current_height++;
}

//transfer any stitches on the back bed onto the front bed
for (let s=1; s<=max; s++) {
	if (columnPos[s - 1] === 1) {
		kCode += ("xfer b" + s + " f" + s + "\n");
	}
}

kCode += ("outhook " + carrier + "\n");


//are we at the front or back of the fabric? 0 can equal front, 1 can equal back
function calculateIndexPosition(numStripes){
	let array = [];
	for (let n = 1; n <= numStripes; ++n){
		let newArray = new Array(n * 2);//at each stripe index, create a new array of length n
		newArray.fill(0);//fill the array at 0, representing front
		newArray.fill(1,newArray.length/2);//fill the latter half of the array with 1, representing back
		array = array.concat(newArray);//add "newArray" to the array
	}
	return array;
}

//write to file
fs.writeFile("./../knitout-backend-swg/examples/in/gradient.knitout", kCode, function(err) {
    if(err) {
        return console.log(err);
    }

    console.log("The file was saved!");
}); 