const fs = require('fs');
let kCode = "";

//Not my code, from the Textiles Lab repo https://github.com/textiles-lab/knitout-examples
//only changed to remove knitout writer and to change the carrier

// swatch variables
//height needs to be multiples of 4
var height = 40;
//width needs to be multiples 2,
var width = 41; //want to put the first tuck in front, hack for now: +1
var carrier = "3";

kCode += (";!knitout-2" + "\n");
kCode += (";;Carriers: 1 2 3 4 5 6 7 8 9 10" + "\n");


// bring in carrier using yarn inserting hook
kCode += ("inhook " + carrier + "\n");


//helper functions for rows
function row1()
{
  for (var s=width; s>0; s--)
  {
    if (s%2==0)
    {
      kCode += ("knit - b" + s + " " + carrier + "\n");
    }
    else
    {
      kCode += ("knit - f" + s + " " + carrier + "\n");
    }
  }
  for (var s = 1; s<=width; s++)
  {
    if(s%2 == 0)
    {
      kCode += ("xfer b" + s + " f" + s + "\n");
    }
    else
    {
      kCode += ("xfer f" + s + " b" + s + "\n");
    }
  }
}

function row2()
{
  for (var s=1; s<=width; s++)
  {
    if (s%2==0)
    {
      kCode += ("knit + f" + s + " " + carrier + "\n");
    }
    else
    {
      kCode += ("knit + b" + s + " " + carrier + "\n");
    }
  }
}

function row3()
{
  for (var s=width; s>0; s--)
  {
    if (s%2==0)
    {
      kCode += ("knit - f" + s + " " + carrier + "\n");
    }
    else
    {
      kCode += ("knit - b" + s + " " + carrier + "\n");
    }
  }
  for (var s = 1; s<=width; s++)
  {
    if(s%2 == 0)
    {
      kCode += ("xfer f" + s + " b" + s + "\n");
    }
    else
    {
      kCode += ("xfer b" + s + " f" + s + "\n");
    }
  }
}

function row4()
{
  for (var s=1; s<=width; s++)
  {
    if (s%2==0)
    {
      kCode += ("knit + b" + s + " " + carrier + "\n");
    }
    else
    {
      kCode += ("knit + f" + s + " " + carrier + "\n");
    }
  }
}


//tuck on all needles
for (var s=width; s>0; s--)
{
  if(s%2==0)
  {
    kCode += ("tuck - b" + s + " " + carrier + "\n");
  }
  else
  {
    kCode += ("tuck - f" + s + " " + carrier + "\n");
  }
}

//rib on way back, skip last of the tucks
for (var s=2; s<=width; s++)
{
  if (s%2==0)
  {
    kCode += ("knit + b" + s + " " + carrier + "\n");
  }
  else
  {
    kCode += ("knit + f" + s + " " + carrier + "\n");
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
fs.writeFile("./../knitout-backend-swg/examples/in/irishmoss.knitout", kCode, function(err) {
    if(err) {
        return console.log(err);
    }

    console.log("The file was saved!");
}); 