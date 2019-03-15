const fs = require('fs');
let kCode = "";

//Parameters:

const width = 20;
const height = 20;
const carrier = "3";
var slitWidth = 6;//number of stitches in the slit
let startKnittingSlit = Math.floor(height/2);//vertical height we start the slit at
var startKnittingWidth = Math.floor(width/2 - slitWidth/2); //horizontal point we start the slit at

//to simplify this code, let's ensure we start the slit on an even row
//so we can predict what direction we're going in
if (startKnittingSlit % 2 !== 0){
	startKnittingSlit = startKnittingSlit - 1;
}

//Operation:

//Makes a width x height rectangle of plain knitting on the front bed with carrier Carrier.
//Has a horizontal slit in the miggle
//Uses an alternating-tucks cast-on.

/*

xxxxxxxxxx
xxxxxxxxxx
xxxxxxxxxx
xx      xx
xxxxxxxxxx
xxxxxxxxxx
xxxxxxxxxx

*/



kCode += (";!knitout-2" + "\n");
kCode += (";;Carriers: 1 2 3 4 5 6 7 8 9 10" + "\n");


kCode += ("inhook " + carrier + "\n");


let min = 1;
let max = min + width - 1;

//alternating tucks cast-on
for (let n = max; n >= min; --n) {
	if ((max-n) % 2 == 0) {
		kCode += ("tuck - f" + n + " " + carrier + "\n");
	}
}
for (let n = min; n <= max; ++n) {
	if ((max-n)%2 == 1) {
		kCode += ("tuck + f" + n + " " + carrier + "\n");
	}
}

kCode += ("miss + f" + max + " " + carrier + "\n");

//release the hook from the carrier hook
kCode += ("releasehook " + carrier + "\n");

// Rows of plain knitting:
for (let r = 0; r < height; ++r) {
	//every other row, change direction so we knit back and forth
	if (r % 2 == 0) {
		//we end on the right side (i.e., going in + direction), so we start by going towards the left (-))
		for (let n = max; n >= min; --n) {
			//we know startKnittingSlit is even, so we can predict which direction we're going in
			if (r !== startKnittingSlit || (n > startKnittingWidth + slitWidth || n < startKnittingWidth)){
				kCode += ("knit - f" + n + " " + carrier + "\n");
			} else { 
				//cast off the stitches on the bottom of the slit

				kCode += ("knit - f" + n + " " + carrier + "\n");
				//transfer the stitch to the back bed
				kCode += ("xfer f" + n + " b" + n + "\n");
				//move the back carrier to the right
				kCode += ("rack -1" + "\n");
				//transfer the stitch back to the front bed, now one space to the right
				kCode += ("xfer b" + n + " f" + (n - 1) + "\n");
				//return the back bed to the neutral position
				kCode += ("rack 0" + "\n");
			}
		}
	} else {
		for (let n = min; n <= max; ++n) {
			if (r !== (startKnittingSlit + 1) || (n > startKnittingWidth + slitWidth || n < startKnittingWidth)){
				kCode += ("knit + f" + n + " " + carrier + "\n");
			} else { 
				//cast on stitches on top of the slit
				if (n % 2 == 0){
					kCode += ("knit + f" + n + " " + carrier + "\n");
				}
			}
		}
	}
}

//bring yarn carrier out of action
kCode += ("outhook " + carrier + "\n");

//write to file
fs.writeFile("./../knitout-backend-swg/examples/in/horizontal_slit.knitout", kCode, function(err) {
    if(err) {
        return console.log(err);
    }

    console.log("The file was saved!");
}); 
