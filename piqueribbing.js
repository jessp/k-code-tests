const fs = require('fs');
let kCode = "";

/*
Not my code. From Textiles Lab at: https://github.com/textiles-lab/knitout-examples
Modified only to change carriers and to remove knitout writer
*/

kCode += (";!knitout-2" + "\n");
kCode += (";;Carriers: 1 2 3 4 5 6 7 8 9 10" + "\n");

// swatch variables
//height needs to be multiples of 4
var height = 60;
//width needs to be multiples of 3 plus 2
//and for this implementation, to avoid knit on the last one tucked on
//width must be odd
var width = 47; //want to put first stich on the front bed, hack for now
var carrier = '3';
// bring in carrier using yarn inserting hook
kCode += ("inhook " + carrier + "\n");

//helper functions for rows
//row1 follows the pattern of *front front back*front front
function row1()
{
 for (var i = width; i > 0 ; i--)
    {
      if (i%3 == 0)
      {
        kCode += ("knit - b" + i + " " + carrier + "\n");
      }
      else
      {
        kCode += ("knit - f" + i + " " + carrier + "\n");
      }
    }
}
//row2 follows the same pattern as row 1
//but yarn carrier moves in the opposite direction
function row2()
{
 for (var i = 1; i <= width ; i++)
    {
      if (i%3 == 0)
      {
        kCode += ("knit + b" + i + " " + carrier + "\n");
      }
      else
      {
        kCode += ("knit + f" + i + " " + carrier + "\n");
      }
    }
}

//row 3 also follows the same pattern
//but transfer all stitches on the front bed to the back
function row3()
{
 for (var i = width ; i > 0 ; i--)
    {
      if (i%3 == 0)
      {
        kCode += ("knit - b" + i + " " + carrier + "\n");
      }
      else
      {
        kCode += ("knit - f" + i + " " + carrier + "\n");
      }
    }
    for (var i = width; i > 0 ; i--)
    {
      if (i%3 != 0)
      {
        kCode += ("xfer f" + i + " b" + i + "\n");
      }
    }

}

//row4 knits the entire row on the back bed
//and then transfer the corresponding stitches to the front bed
function row4()
{
 for (var i = 1; i <= width ; i++)
    {
      kCode += ("knit + b" + i + " " + carrier + "\n");
    }
    for (var i = 1; i <= width ; i++)
    {
      if (i%3 != 0)
      {
        kCode += ("xfer b" + i + " f" + i + "\n");
      }
    }
}
//tuck on alternate needles and tuck the rest on the way back
for (var s = width ; s>0 ; s--)
{
  if (s%2 != 0)
  {
    if (s%3 == 0)
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
  if (s%2 == 0)
  {
    if (s%3 == 0)
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

// knit some rows back and forth
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
fs.writeFile("./../knitout-backend-swg/examples/in/piqueribbing.knitout", kCode, function(err) {
    if(err) {
        return console.log(err);
    }

    console.log("The file was saved!");
}); 