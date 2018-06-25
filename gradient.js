let stripesNum = 4; //number of knit stripes (doubled if you take into account both knit and perls)

let min = 1; //start at needle 1

let columnPos = calculateIndexPosition(stripesNum);
let max = columnPos.length;



let Carrier = 6;


console.log(";!knitout-2")

console.log("inhook " + Carrier);

/*
Following the cast-on procedure used in knitout-backend-swg/rib2x2, knitout-examples/Tutorial1/helloworld etc., 
not like knitout-examples/Tutorial2/rib1x1.
Also not doing a single line of knits before releasing as in rib1X1.
*/

//tuck every other column right to left
for (let n = max; n >= min; --n) {
	if ((max-n) % 2 == 0) {
		console.log("tuck - f" + n + " " + Carrier);
	}
}

//tuck every other column left to right
for (let n = min; n <= max; ++n) {
	if ((max-n)%2 == 1) {
		console.log("tuck + f" + n + " " + Carrier);
	}
}

//stop tucking
console.log("releasehook " + Carrier);


let height = 20;

//knit until our swatch is the right length
var current_height = 0;


//knit for the full height of the garment
while (current_height < height) {
	//right to left
	for (let s=max; s>0; s--) {
		//our column indexes start from 0 so we need to subtract 1
		if (columnPos[s - 1] === 0) {
			//knit back side
			console.log("knit - f" + s + " " + Carrier);
		}
		else {
			//knit front side
			console.log("knit - b" + s + " " + Carrier);
		}
	}
	current_height++;

	//left to right
	for (let s=1; s<=max; s++) {
		if (columnPos[s - 1] === 0) {
			console.log("knit + f" + s + " " + Carrier);
		}
		else {
			console.log("knit + b" + s + " " + Carrier);
		}
	}
	current_height++;
}

console.log("outhook " + Carrier);


//are we at the front or back of the fabric? 0 can equal front, 1 can equal back
function calculateIndexPosition(numStripes){
	let array = [];
	for (let n = 1; n <= numStripes; ++n){
		let innerArray = new Array(n * 2);
		innerArray.fill(0);
		innerArray.fill(1,innerArray.length/2);
		array = array.concat(innerArray);
	}
	return array;
}
