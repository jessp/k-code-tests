//Parameters:

let charArray = require('./char.js'); //import an array representing a black and white shape (e.g., 0 === bg, 1 === fg)
let width = charArray[0].length; //get the width of the first entry in the array to determine the width of the knit
let height = charArray.length; //get the height based on how many entries in the array they are in
let carrier = "3";

//Operation:

//Makes a rectangle of 1x1 rib background with a character in perls in the center
/*
  
xxxxxxxxxxxx
xxxx----xxxx
xx--xxxx--xx
xx--xxxx--xx
xxxx----xxxx
xxxxxxxxxxxx

*/


console.log(";!knitout-2");
console.log(";;Carriers: 1 2 3 4 5 6 7 8 9 10");

console.log("inhook " + carrier);

let min = 1;
let max = min + width - 1;

//Alternating tucks cast-on:
for (let n = max; n >= min; --n) {
	if ((max-n) % 2 == 0) {
		console.log("tuck - f" + n + " " + carrier);
	}
}
for (let n = min; n <= max; ++n) {
	if ((max-n)%2 == 1) {
		console.log("tuck + f" + n + " " + carrier);
	}
}

console.log("releasehook " + carrier);

//knit X lines * 2 (forward and back) at the beginning and end
function knitLines(multiple, min, max){
	for (let r = 0; r < (multiple*2); ++r) {
		if (r % 2 == 0) {
			for (let n = max; n >= min; --n) {
				console.log("knit - f" + n + " " + carrier);
			}
		} else {
			for (let n = min; n <= max; ++n) {
				console.log("knit + f" + n + " " + carrier);
			}
		}
	}
}


knitLines(2, min, max);

console.log("");
console.log(";start main");

for (let r = 0; r < height; ++r) {
	console.log(" ");
	
	let charIndexes = getAllIndexes(charArray[r], 1); //find out which indices in this row should be perled

	if (r === 0){
		//on first row of character, we can just send perls from front to back since we know 
		//we're starting from the two rows of front knits
		for (var perls = 0; perls < charIndexes.length; perls++){
			console.log("xfer f" + charIndexes[perls] + " b" + charIndexes[perls]);
		}
	} else {
		//get array indicating which stitches in the previously knitted row are perled
		let past = getAllIndexes(charArray[r - 1], 1); 
		//figure out which of the perls in the current row are preceeded by front-bed knits at the same index
		//in the previous row
		let newPerls = charIndexes
                 .filter(x => !past.includes(x));

        //if the yarn was on the front bed before at the same index
        //transfer it to the back
        for (var perls = 0; perls < newPerls.length; perls++){
			console.log("xfer f" + newPerls[perls] + " b" + newPerls[perls]);
		}

		//if there were perls on the previous row
        let oldPerls = past
                 .filter(x => !charIndexes.includes(x));

        //figure out which of the perls in the previous row should now be on the front bed
		//in the current row
        for (var perls = 0; perls < oldPerls.length; perls++){
			console.log("xfer b" + oldPerls[perls] + " f" + oldPerls[perls]);
		}

		
	}

	if (r % 2 == 0) {
		for (let n = max; n >= min; --n) {
			//if the given row is part of the character, perl the stitched...
			if (charIndexes.includes(n)){
				console.log("knit - b" + n + " " + carrier);
			//otherwise, knit them
			} else {
				console.log("knit - f" + n + " " + carrier);
			}
		}
	} else {
		for (let n = min; n <= max; ++n) {
			//same logic goes on the way back
			if (charIndexes.includes(n)){
				console.log("knit + b" + n + " " + carrier);
			} else {
				console.log("knit + f" + n + " " + carrier);
			}
		}
	}
}

//figure out if any rows end on the back bed (perled)...
let lastCharIndexes = getAllIndexes(charArray[height - 1], 1);

console.log("");
console.log(";end border");

//...so we can bring them forward onto the front bed
for (var perls = 0; perls < lastCharIndexes.length; perls++){
	console.log("xfer b" + lastCharIndexes[perls] + " f" + lastCharIndexes[perls]);
}

//knit two final lines on the front bed
knitLines(2, min, max);


console.log("outhook " + carrier);

//get indexes that should be perled
//go through all values in arr, and figure out which equal val --- these should be perled
function getAllIndexes(arr, val) {
    var indexes = [], i;
    for(i = 0; i < arr.length; i++){
        if (arr[i] === val){
            indexes.push(i);
        }
    }
    return indexes;
}