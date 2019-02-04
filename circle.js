let Carrier = 6;


console.log(";!knitout-2");

//headers
console.log(";;Machine: SWGXYZ");
console.log(";;Gauge: 15");
console.log("");

// bring in carrier using yarn inserting hook
console.log("inhook " + Carrier);


// swatch variables
var height = 30;
var width = 41;

// make sure the very first stitch in on the front bed,
// since the machine complains if its on the back
var front = width%2;

let radius = Math.round((Math.floor(height/4) - 2)/2)*2;
let midX = Math.floor(width/2);
let midY = Math.floor(height/2);


//initial tuck cast-on
for (var s=width; s>0; s--) {
    if(s%2==front) {
    	console.log("tuck - f" + s + " " + Carrier);
    }
    else {
    	console.log("tuck - b" + s + " " + Carrier);
    }
}

//rib on way back, skip last of the tucks
for (var s=2; s<=width; s++) {
    if (s%2==front) {
    	console.log("knit + f" + s + " " + Carrier);
    }
    else {
    	console.log("knit + b" + s + " " + Carrier);
    }
}


//release the yard inserting hook
console.log("releasehook " + Carrier);


// knit until we have the right swatch height
var current_height = 0;
var top_height = 0; //since we go back and forth to make a stitch, we need another measure of height just on one direction
while (current_height<height) {
	let randomForB = [];

	//construct our values at the beginning to ensure forward and background are the same at a given index
	for (var i=0; i<=width; i++) {
    	randomForB.push(Math.random() < 0.5 ? "f" : "b");
	}

	console.log(";<");

	for (var s=width; s>0; s--) {
		randomForB.push((Math.random() > 0.5) ? "f" : "b");
		//if point is outside the circle
		if ((Math.pow((s - midX), 2) + Math.pow((top_height - midY), 2)) > Math.pow(radius, 2)) {
			if (s%2==front) {
				console.log("knit - f" + s + " " + Carrier);
			}
			else {
				console.log("knit - b" + s + " " + Carrier);
			}
		} else{
			console.log("knit - " + randomForB[s] + s + " " + Carrier + " ;random");
		}

	}


	for (var s=width; s>0; s--) {
		if ((Math.pow((s - midX), 2) + Math.pow((top_height - midY), 2)) > Math.pow(radius, 2)) {
			if (s%2==front) {
				console.log("xfer f" + s + " b" + s);
			}
			else {
				console.log("xfer b" + s + " f" + s);
			}
		} else {
			//not sure if we need to do anything here if we're just knitting/perling
		}
	}
	console.log(";>");
	current_height++;

	if (current_height >= height) {
		break;
	}

	for (var s=1; s<=width; s++) {
		//might need adjustment based on value of 's'
		if ((Math.pow((s - midX), 2) + Math.pow((top_height - midY), 2)) > Math.pow(radius, 2)) {
			if (s%2==front) {
				console.log("knit + b" + s + " " + Carrier);
			}
			else {
				console.log("knit + f" + s + " " + Carrier);
			}
		} else {
			console.log("knit + " + randomForB[s] + s + " " + Carrier + " ;random");
		}
	}


	for (var s=1; s<=width; s++) {
		if ((Math.pow((s - midX), 2) + Math.pow((top_height - midY), 2)) > Math.pow(radius, 2)) {
			if (s%2==front) {
				console.log("xfer b" + s + " f" + s);
			}
			else {
				console.log("xfer f" + s + " b" + s);
			}
		} else {
			//not sure if we need to do anything here if we're just knitting/perling
		}
	}
		
	current_height++;
	top_height += 2; 
	console.log("");

}

// bring the yarn out with the yarn inserting hook
console.log("outhook " + Carrier);




