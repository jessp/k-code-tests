/*
Not my code. From Textiles Lab at: https://github.com/textiles-lab/knitout-examples
Modified lightly to change carrier.
*/

const fs = require('fs');
let kCode = "";

kCode += (";!knitout-2" + "\n");
kCode += (";;Carriers: 1 2 3 4 5 6 7 8 9 10" + "\n");

// swatch variables
//height needs to be multiples of 4
var height = 40;
//width needs to be multiples 3 plus 1
//and for this implementation to avoid knit on the last one tucked on
//width must be even
var width = 40;
var carrier = '3';
// bring in carrier using yarn inserting hook
kCode += ("inhook " + carrier + "\n");

//helper functions for rows
function row1()
{
  for (var s=width; s>0; s--)
  {
    if (s%3!=1)
    {
      kCode += ("knit - b" + s + " " + carrier + "\n");
    }
    else
    {
      kCode += ("knit - f" + s + " " + carrier + "\n");
    }
  }
}

function row2()
{
  for (var s=1; s<=width; s++)
  {
    if (s%3!=1)
    {
      kCode += ("knit + b" + s + " " + carrier + "\n");
    }
    else
    {
      kCode += ("knit + f" + s + " " + carrier + "\n");
    }
  }
  for (var s = width; s>0; s--)
  {
    if (s%3!=1)
    {
      kCode += ("xfer b" + s + " f" + s + "\n");
    }
  }
}

function row3()
{
  for (var s=width; s>0; s--)
  {
    kCode += ("knit - f" + s + " " + carrier + "\n");
  }
}

function row4()
{
  for (var s=1; s<=width; s++)
  {
    kCode += ("knit + f" + s + " " + carrier + "\n");
  }
  for (var s=width; s>0; s--)
  {
    if (s%3!=1)
    {
      kCode += ("xfer f" + s + " b" + s + "\n");
    }
  }
 }


//tuck on alternate needles and tuck the rest on the way back
for (var s = width ; s>0 ; s--)
{
  if (s%2 == 0)
  {
    if (s%3 != 1)
    {
      kCode += ("tuck - b" + s + " " + carrier + "\n");
    }
    else
    {
      kCode += ("tuck - f" + s + " " + carrier + "\n");
    }
  }
}

for (var s = 1 ; s<=width ; s++)
{
  if (s%2 != 0)
  {
    if (s%3 != 1)
    {
      kCode += ("tuck + b" + s + " " + carrier + "\n");
    }
    else
    {
      kCode += ("tuck + f" + s + " " + carrier + "\n");
    }
  }
}

// release the yarn inserting hook
kCode += ("releasehook " + carrier + "\n");

for(var h = 1 ; h <= height ; h = h+4)
{
  row1();
  row2();
  row3();
  row4();
}

// bring the yarn out with the yarn inserting hook
kCode += ("outhook " + carrier + "\n");

//write to file
fs.writeFile("./../knitout-backend-swg/examples/in/wafflestitch.knitout", kCode, function(err) {
    if(err) {
        return console.log(err);
    }

    console.log("The file was saved!");
}); 
