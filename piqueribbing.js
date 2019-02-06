/*
Not my code. From Textiles Lab at: https://github.com/textiles-lab/knitout-examples
Modified only to change carriers and to remove knitout writer
*/

console.log(";!knitout-2");
console.log(";;Carriers: 1 2 3 4 5 6 7 8 9 10");

// swatch variables
//height needs to be multiples of 4
var height = 60;
//width needs to be multiples of 3 plus 2
//and for this implementation, to avoid knit on the last one tucked on
//width must be odd
var width = 47; //want to put first stich on the front bed, hack for now
var carrier = '3';
// bring in carrier using yarn inserting hook
console.log("inhook " + carrier);

//helper functions for rows
//row1 follows the pattern of *front front back*front front
function row1()
{
 for (var i = width; i > 0 ; i--)
    {
      if (i%3 == 0)
      {
        console.log("knit - b" + i + " " + carrier);
      }
      else
      {
        console.log("knit - f" + i + " " + carrier);
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
        console.log("knit + b" + i + " " + carrier);
      }
      else
      {
        console.log("knit + f" + i + " " + carrier);
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
        console.log("knit - b" + i + " " + carrier);
      }
      else
      {
        console.log("knit - f" + i + " " + carrier);
      }
    }
    for (var i = width; i > 0 ; i--)
    {
      if (i%3 != 0)
      {
        console.log("xfer f" + i + " b" + i);
      }
    }

}

//row4 knits the entire row on the back bed
//and then transfer the corresponding stitches to the front bed
function row4()
{
 for (var i = 1; i <= width ; i++)
    {
      console.log("knit + b" + i + " " + carrier);
    }
    for (var i = 1; i <= width ; i++)
    {
      if (i%3 != 0)
      {
        console.log("xfer b" + i + " f" + i);
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
      console.log("tuck - b" + s + " " + carrier);
    }
    else
    {
      console.log("tuck - f" + s + " " + carrier);
    }
  }
}
for (var s = 1 ; s<=width ; s++)
{
  if (s%2 == 0)
  {
    if (s%3 == 0)
    {
      console.log("tuck + b" + s + " " + carrier);
    }
    else
    {
      console.log("tuck + f" + s + " " + carrier);
    }
  }
}

// release the yarn inserting hook
console.log("releasehook " + carrier);

// knit some rows back and forth
for(var h = 1 ; h <= height ; h = h+4)
{
  row1();
  row2();
  row3();
  row4();
}

// bring the yarn out with the yarn inserting hook
console.log("outhook " + carrier);

