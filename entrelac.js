/*
Not my code. From Textiles Lab at: https://github.com/textiles-lab/knitout-examples
Modified only to change carriers and to remove top couple lines
*/

const fs = require('fs');
let kCode = "";

let height = 19; //height of square
let width = Math.floor(height/2); //width of each square
let reps = 2; //how many squares in each row
let repeats = 1; //each repeat is a pair of square rows
let padding = 15;
let Carrier = 3;
let Carrier2 = 2;
let min = 1;
let max = min + (2*reps+1)*(width);

let xfer_inside = true; //if true, slant rows inside the squares

kCode += (";!knitout-2" + "\n");
kCode += (";;Carriers: 1 2 3 4 5 6 7 8 9 10" + "\n");

kCode += ("inhook " + Carrier + "\n");

kCode += ("x-stitch-number " + 67 + "\n");

for (let n = max; n >= min; --n) {
	if ((max-n) % 2 == 0) {
		kCode += ("tuck - f" + n + " " + Carrier + "\n");
	}
}
for (let n = min; n <= max; ++n) {
	if ((max-n)%2 == 1) {
		kCode += ("tuck + f" + n + " " + Carrier + "\n");
	} else if (n === max) {
		kCode += ("miss + f" + n + " " + Carrier + "\n");
	}
}

kCode += ("x-stitch-number " + 95); //might be better than 6 + "\n"8?
for (let n = max; n >= min; --n) {
	kCode += ("knit - f" + n + " " + Carrier + "\n");
}
kCode += ("releasehook " + Carrier + "\n");
for (let row = 0; row < padding; row += 2) {
	for (let n = min; n <= max; ++n) {
		kCode += ("knit + f" + n + " " + Carrier + "\n");
	}
	for (let n = max; n >= min; --n) {
		kCode += ("knit - f" + n + " " + Carrier + "\n");
	}
}

if (Carrier2) {
	kCode += ("inhook " + Carrier2 + "\n");
	for (let n = min; n <= max; ++n) {
		kCode += ("knit + f" + n + " " + Carrier2 + "\n");
	}
	kCode += ("releasehook " + Carrier2 + "\n");
	for (let n = max; n >= min; --n) {
		kCode += ("knit - f" + n + " " + Carrier2 + "\n");
	}
	for (let n = min; n <= max; ++n) {
		kCode += ("knit + f" + n + " " + Carrier2 + "\n");
	}
}

//knit a right-leaning square:
// ----------->
//      x x o <-- this tip is not knit because the next square is expected to overlap
//    x x x
//  x x x
//  ^   ^   ^
//  min mid max
function rightSquare(min) {
	for (let row = 0; row < height; ++row) {
		let step = Math.floor(row/2);
		let left = min+step;
		let right = min+step+width-1;
		if (row + 1 === width) right -= 1;
		if (row % 2 === 0) {
			if (xfer_inside && row > 0) {
				kCode += ("rack -1" + "\n");
				for (let n = left-1; n <= right-1; ++n) {
					kCode += ("xfer f" + n + " b" + (n+1) + "\n");
				}
				kCode += ("rack 0" + "\n");
				for (let n = left-1; n <= right; ++n) {
					kCode += ("xfer b" + n + " f" + n + "\n");
				}
			}
			for (let n = left; n <= right; ++n) {
				kCode += ("knit + f" + n + " " + Carrier + "\n");
			}
		} else {
			for (let n = right; n >= left; --n) {
				if (xfer_inside && n == left) {
					kCode += ("split - f" + n + " b" + n + " " + Carrier + "\n");
				} else {
					kCode += ("knit - f" + n + " " + Carrier + "\n");
				}
			}
		}
	}
}

// ------->
//  x x o <-- this tip is not knit because the next square is expected to overlap
//  x x
//  x
//  ^   ^
//  min max
function rightTriangle(min) {
	for (let row = 0; row < height; ++row) {
		let step = Math.floor(row/2);
		let left = min;
		let right = min+step;
		if (row + 1 === height) right -= 1;
		if (row % 2 === 0) {
			for (let n = left; n <= right; ++n) {
				kCode += ("knit + f" + n + " " + Carrier + "\n");
			}
		} else {
			for (let n = right; n >= left; --n) {
				kCode += ("knit - f" + n + " " + Carrier + "\n");
			}
		}
	}
}

//knit a left-leaning square:
// <---------
//  o x x     <-- this tip is not knit because the next square is expected to overlap
//    x x x
//      x x x
//  ^   ^   ^
//  min mid max
function leftSquare(max) {
	let C = (Carrier2 ? Carrier2 : Carrier);
	for (let row = 0; row < height; ++row) {
		let step = Math.floor(row/2);
		let left = max-step-(width-1);
		let right = max-step;
		if (row + 1 === width) left += 1;
		if (row % 2 === 0) {
			if (xfer_inside && row > 0) {
				kCode += ("rack 1" + "\n");
				for (let n = right+1; n >= left+1; --n) {
					kCode += ("xfer f" + n + " b" + (n-1) + "\n");
				}
				kCode += ("rack 0" + "\n");
				for (let n = right+1; n >= left; --n) {
					kCode += ("xfer b" + n + " f" + n + "\n");
				}
			}

			for (let n = right; n >= left; --n) {
				kCode += ("knit - f" + n + " " + C + "\n");
			}
		} else {
			for (let n = left; n <= right; ++n) {
				if (xfer_inside && n == right) {
					kCode += ("split - f" + n + " b" + n + " " + C + "\n");
				} else {
					kCode += ("knit + f" + n + " " + C + "\n");
				}
			}
		}
	}
}

// <---------
//  o x x     <-- this tip is not knit because the next square is expected to overlap
//    x x
//      x
//  ^   ^
//  mid max
function leftTriangle(max) {
	let C = (Carrier2 ? Carrier2 : Carrier);
	for (let row = 0; row < height; ++row) {
		let step = Math.floor(row/2);
		let left = max-step;
		let right = max;
		if (row + 1 === height) left += 1;
		if (row % 2 === 0) {
			for (let n = right; n >= left; --n) {
				kCode += ("knit - f" + n + " " + C + "\n");
			}
		} else {
			for (let n = left; n <= right; ++n) {
				kCode += ("knit + f" + n + " " + C + "\n");
			}
		}
	}
}

for (let cr = 0; cr < repeats; ++cr) {
	rightTriangle(min);
	for (let rep = 0; rep < reps; ++rep) {
		rightSquare(min + (2*rep+1)*width);
	}
	kCode += ("knit + f" + max + " " + Carrier + "\n");
	if (Carrier2) {
		for (let n = max; n >= min; --n) {
			kCode += ("knit - f" + n + " " + Carrier + "\n");
		}
	}

	leftTriangle(min + (2*reps+1)*width);
	for (let rep = reps-1; rep >= 0; --rep) {
		leftSquare(min + (2*rep+2)*width);
	}
	if (Carrier2) {
		kCode += ("knit - f" + min + " " + Carrier2 + "\n");

		for (let n = min; n <= max; ++n) {
			kCode += ("knit + f" + n + " " + Carrier2 + "\n");
		}
	} else {
		kCode += ("knit - f" + min + " " + Carrier + "\n");
	}
}

if (Carrier2) {
	kCode += ("outhook " + Carrier2 + "\n");
}


for (let row = 0; row < padding; row += 2) {
	for (let n = min; n <= max; ++n) {
		kCode += ("knit + f" + n + " " + Carrier + "\n");
	}
	for (let n = max; n >= min; --n) {
		kCode += ("knit - f" + n + " " + Carrier + "\n");
	}
}
for (let n = min; n <= max; ++n) {
	kCode += ("knit + f" + n + " " + Carrier + "\n");
}


kCode += ("outhook " + Carrier + "\n");

//write to file
fs.writeFile("./../knitout-backend-swg/examples/in/entrelac.knitout", kCode, function(err) {
    if(err) {
        return console.log(err);
    }

    console.log("The file was saved!");
}); 