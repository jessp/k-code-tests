let charArray = require('./char.js');
let width = charArray[0].length;
let height = charArray.length;
let Carrier = 6;



console.log(";!knitout-2");
console.log(";;Carriers: " + Carrier);

console.log("inhook " + Carrier);

let min = 1;
let max = min + width - 1;

for (let n = max; n >= min; --n) {
	if ((max-n) % 2 == 0) {
		console.log("tuck - f" + n + " " + Carrier);
	}
}
for (let n = min; n <= max; ++n) {
	if ((max-n)%2 == 1) {
		console.log("tuck + f" + n + " " + Carrier);
	}
}

console.log("releasehook " + Carrier);


knitLines(2, min, max);

console.log("");
console.log(";start main");

for (let r = 0; r < height; ++r) {
	console.log(" ");
	
	let charIndexes = getAllIndexes(charArray[r], 1);

	if (r === 0){
		//on first row of character, we can just send perls from front to back since we don't have to worrying about "resets"
		for (var perls = 0; perls < charIndexes.length; perls++){
			console.log("xfer f" + charIndexes[perls] + " b" + charIndexes[perls]);
		}
	} else {
		let pres = getAllIndexes(charArray[r], 1);
		let past = getAllIndexes(charArray[r - 1], 1);
		let newPerls = pres
                 .filter(x => !past.includes(x));

        //transfer new threads to back
        for (var perls = 0; perls < newPerls.length; perls++){
			console.log("xfer f" + newPerls[perls] + " b" + newPerls[perls]);
		}


        let oldPerls = past
                 .filter(x => !pres.includes(x));

        //transfer old perls forward
        for (var perls = 0; perls < oldPerls.length; perls++){
			console.log("xfer b" + oldPerls[perls] + " f" + oldPerls[perls]);
		}

		
	}

	if (r % 2 == 0) {
		for (let n = max; n >= min; --n) {
			//perl the characters there...
			if (charIndexes.includes(n)){
				console.log("knit - b" + n + " " + Carrier);
			} else {
				console.log("knit - f" + n + " " + Carrier);
			}
		}
	} else {
		for (let n = min; n <= max; ++n) {
			//...and back
			if (charIndexes.includes(n)){
				console.log("knit + b" + n + " " + Carrier);
			} else {
				console.log("knit + f" + n + " " + Carrier);
			}
		}
	}
}

let lastCharIndexes = getAllIndexes(charArray[height - 1], 1);
console.log("");
console.log(";end border");

//transfer final threads forward
for (var perls = 0; perls < lastCharIndexes.length; perls++){
	console.log("xfer b" + lastCharIndexes[perls] + " f" + lastCharIndexes[perls]);
}


knitLines(2, min, max);


console.log("outhook " + Carrier);

//get indexes that should be perled
function getAllIndexes(arr, val) {
    var indexes = [], i;
    for(i = 0; i < arr.length; i++)
        if (arr[i] === val)
            indexes.push(i);
    return indexes;
}



//knit X lines * 2 (forward and back) at the beginning and end
function knitLines(multiple, min, max){
	for (let r = 0; r < (multiple*2); ++r) {
	if (r % 2 == 0) {
		for (let n = max; n >= min; --n) {
			console.log("knit - f" + n + " " + Carrier);
		}
	} else {
		for (let n = min; n <= max; ++n) {
			console.log("knit + f" + n + " " + Carrier);
		}
	}
}
}

