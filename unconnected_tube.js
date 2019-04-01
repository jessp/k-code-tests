const fs = require('fs');
let kCode = "";

//Parameters:

const width = 20;
const height = 80;
const carrier1 = "3";
const carrier2 = "2";

//Operation:

//Makes two pieces of fabric knitted independently knitted on the front bed with carrier1
//and knitted on the back bed with carrier 2.
//Each rectangle is width x height/2.
//Uses an alternating-tucks cast-on.
//doesn't work :(


kCode += (";!knitout-2" + "\n");
kCode += (";;Carriers: 1 2 3 4 5 6 7 8 9 10" + "\n");



let min = 1;
let max = min + width - 1;

//Alternating tucks cast-on on front bed with carrier 1
kCode += ("inhook " + carrier1 + "\n");

for (let n = max; n >= min; --n) {
	if ((max-n) % 2 == 0) {
		kCode += ("tuck - f" + n + " " + carrier1 + "\n");
	}
}
for (let n = min; n <= max; ++n) {
	if ((max-n)%2 == 1) {
		kCode += ("tuck + f" + n + " " + carrier1 + "\n");
	}
}

kCode += ("miss + f" + max + " " + carrier1 + "\n");

kCode += ("releasehook " + carrier1 + "\n");


//Alternating tucks cast-on on back bed with carrier 2
kCode += ("inhook " + carrier2 + "\n");

for (let n = max; n >= min; --n) {
	if ((max-n) % 2 == 0) {
		if (n == max){
			kCode += ("tuck - f" + n + " " + carrier2 + "\n");
		} else {
			kCode += ("tuck - b" + n + " " + carrier2 + "\n");
		}
	}
}
for (let n = min; n <= max; ++n) {
	if ((max-n)%2 == 1) {
		kCode += ("tuck + b" + n + " " + carrier2 + "\n");
	}
}

kCode += ("miss + b" + max + " " + carrier2 + "\n");

kCode += ("releasehook " + carrier2 + "\n");


for (let r = 0; r < Math.min(height/2); ++r) {


	if (r % 2 == 0) {
		//we'll write a line on the front bed and back bed going in the same direction for each row
		for (let n = max; n >= min; --n) {
			kCode += ("knit - f" + n + " " + carrier1 + "\n");
		}
		for (let n = max; n >= min; --n) {
			kCode += ("knit - b" + n + " " + carrier2 + "\n");
		}
	} else {
		for (let n = min; n <= max; ++n) {
			kCode += ("knit + f" + n + " " + carrier1 + "\n");

		}
		for (let n = min; n <= max; ++n) {
			kCode += ("knit + b" + n + " " + carrier2 + "\n");

		}
	}
}

kCode += ("outhook " + carrier1 + "\n");

kCode += ("outhook " + carrier2 + "\n");

//write to file
fs.writeFile("./../knitout-backend-swg/examples/in/unconnected_tube.knitout", kCode, function(err) {
    if(err) {
        return console.log(err);
    }

    console.log("The file was saved!");
}); 
