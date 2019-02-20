const fs = require('fs');
let kCode = "";

//Parameters:

let carrierA = "3";
let carrierB = "2";
var height = 20;
var width = 20;
var slitHeight = 6;//number of stitches in the slit, even to simplify calculations
let startKnittingSlit = Math.floor(height/2 - slitHeight/2);//vertical height we start the slit at
let midWidth = Math.floor(width/2);//horizontal position of the slit

//to simplify this code, let's ensure we start the slit on an even row
//so we can predict what direction we're going in
if (startKnittingSlit % 2 !== 0){
	startKnittingSlit = startKnittingSlit - 1;
}

//Operation:

//Makes a rectangle of size width x height in plain knit.
//Forms a vertical slit slitHeight tall in the centre by switching fabrics and having carrierA knit one side of the hole
//and carrierB knit the other side.

/*

xxxxxxxxxx
xxxxxxxxxx
**** xxxxx
**** xxxxx
**** xxxxx
xxxxxxxxxx
xxxxxxxxxx

*/


kCode += (";!knitout-2" + "\n");
kCode += (";;Carriers: 1 2 3 4 5 6 7 8 9 10" + "\n");

// bring in carrier using yarn inserting hook
kCode += ("inhook " + carrierA + "\n");

let min = 1;
let max = min + width - 1;


//alternating tucks cast-on
for (let n = max; n >= min; --n) {
	if ((max-n) % 2 == 0) {
		kCode += ("tuck - f" + n + " " + carrierA + "\n");
	}
}
for (let n = min; n <= max; ++n) {
	if ((max-n)%2 == 1) {
		kCode += ("tuck + f" + n + " " + carrierA + "\n");
	}
}

kCode += ("miss + f" + max + " " + carrierA + "\n");

//release the hook from the carrier hook
kCode += ("releasehook " + carrierA + "\n");


// Rows of plain knitting before we start knitting the slit:
for (let r = 0; r < startKnittingSlit; ++r) {
	//every other row, change direction so we knit back and forth
	if (r % 2 == 0) {
		//we end on the right side (i.e., going in + direction), so we start by going towards the left (-))
		for (let n = max; n >= min; --n) {
			kCode += ("knit - f" + n + " " + carrierA + "\n");
		}
	} else {
		for (let n = min; n <= max; ++n) {
			kCode += ("knit + f" + n + " " + carrierA + "\n");
		}
	}
}


// bring second carrier into action using yarn inserting hook
kCode += ("inhook " + carrierB + "\n");

//Knit the portion of the fabric with the slit
for (let r = 0; r < slitHeight; ++r) {
	if (r % 2 == 0) {
		for (let n = max; n >= min; --n) {
			//knit the right side of the fabric with right side carrier, 
			//and the left side with left side carrier
			if (n > midWidth){
				kCode += ("knit - f" + n + " " + carrierA + "\n");
			} else {
				kCode += ("knit - f" + n + " " + carrierB + "\n");
			}
		}
	} else {
		for (let n = min; n <= max; ++n) {
			if (n <= midWidth){
				kCode += ("knit + f" + n + " " + carrierB + "\n");
			} else {
				kCode += ("knit + f" + n + " " + carrierA + "\n");
			}
		}
	}

	if (r == 1){
		//release carrierB from the hook after 2 rows of knitting
		kCode += ("releasehook " + carrierB + "\n");
	}
}
//bring yarn carrier out of action
kCode += ("outhook " + carrierB + "\n");


// Rows of plain knitting after we finish knitting the slit:
for (let r = 0; r < (height - startKnittingSlit - slitHeight); ++r) {
	//every other row, change direction so we knit back and forth
	if (r % 2 == 0) {
		//we end on the right side (i.e., going in + direction), so we start by going towards the left (-))
		for (let n = max; n >= min; --n) {
			kCode += ("knit - f" + n + " " + carrierA + "\n");
		}
	} else {
		for (let n = min; n <= max; ++n) {
			kCode += ("knit + f" + n + " " + carrierA + "\n");
		}
	}
}


//bring yarn carrier out of action
kCode += ("outhook " + carrierA + "\n");

//write to file
fs.writeFile("./../knitout-backend-swg/examples/in/two_carrier_slit.knitout", kCode, function(err) {
    if(err) {
        return console.log(err);
    }

    console.log("The file was saved!");
}); 

