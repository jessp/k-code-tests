//Parameters:
let carrier = "3";
var height = 30;
var width = 41;

//Operation:

//Makes a rectangle of size width x height in plain knit.
//In the centre of the rectangle, there is a circle of stitches that are either  
//knits or perls depending on a random variable.

/*
  
xxxxxxxxxxxx
xxxx-x--xxxx
xx-xx-x-x-xx
xx--xx-x--xx
xxxx--x-xxxx
xxxxxxxxxxxx

*/

console.log(";!knitout-2");
console.log(";;Carriers: 1 2 3 4 5 6 7 8 9 10");

// bring in carrier using yarn inserting hook
console.log("inhook " + carrier);

let min = 1;
let max = min + width - 1;

let radius = Math.round((Math.floor(height/4) - 2)/2)*2; //radius of the circle, ensuring it's slightly smaller than half the area
let midX = Math.floor(width/2); //horizontal center of the circle
let midY = Math.floor(height/2); //vertical center of the circle


//initial tuck cast-on
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



console.log("miss + f" + max + " " + carrier);

//release the hook from the carrier hook
console.log("releasehook " + carrier);


//we need to calculate beforehand if stitches at any given index are knitted or perled
//since we need to be able to query previous rows so we know if we need to transfer to
//the front or back bed
var current_height = 0;
let random_indexes = [];
while (current_height < height) {
	let index_line = [];
	for (var s = min; s <= max; s++) {
		let outside_circle = (Math.pow((s - midX), 2) + Math.pow((current_height - midY), 2)) > Math.pow(radius, 2);
		if (outside_circle) {
			index_line.push("f");
		} else {
			let randomForB = (Math.random() > 0.5) ? "f" : "b";
			index_line.push(randomForB);
		}
	}
	random_indexes.push(index_line);
	current_height++;
}


//knit until we have the right swatch height
var current_height = 0;
while (current_height < height) {
	//after we've knitted the first row
	if (current_height > 0){
		for (let n = min; n <= max; ++n) {
			//are we switching from back bed to the front?
			if (random_indexes[current_height][n - 1] !== random_indexes[current_height - 1][n - 1]){ 
				let from_back = random_indexes[current_height][n - 1] === "b";
				//transfer to opposite beds as needed
				console.log("xfer " + (from_back ? "b" : "f") + n + " " + (from_back ? "f" : "b") +  n);
			}
		}
	}
	//every other row, change direction so we knit back and forth
	if (current_height % 2 == 0) {
		for (let n = max; n >= min; --n) {
			console.log("knit - " + random_indexes[current_height][n - 1] + n + " " + carrier);
		}
	} else {
		for (let n = min; n <= max; ++n) {
			console.log("knit + " + random_indexes[current_height][n - 1] + n + " " + carrier);
		}
	}

	current_height++;
}

// bring the yarn out with the yarn inserting hook
console.log("outhook " + carrier);




