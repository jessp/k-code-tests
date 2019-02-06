//Not my code, from the Textiles Lab repo https://github.com/textiles-lab/knitout-examples
//only changed to remove knitout writer and to change the carrier

// swatch variables
//height needs to be multiples of 4
var height = 40;
//width needs to be multiples 2,
var width = 41; //want to put the first tuck in front, hack for now: +1
var carrier = "3";

console.log(";!knitout-2");
console.log(";;Carriers: 1 2 3 4 5 6 7 8 9 10");


// bring in carrier using yarn inserting hook
console.log("inhook " + carrier);


//helper functions for rows
function row1()
{
  for (var s=width; s>0; s--)
  {
    if (s%2==0)
    {
      console.log("knit - b" + s + " " + carrier);
    }
    else
    {
      console.log("knit - f" + s + " " + carrier);
    }
  }
  for (var s = 1; s<=width; s++)
  {
    if(s%2 == 0)
    {
      console.log("xfer b" + s + " f" + s);
    }
    else
    {
      console.log("xfer f" + s + " b" + s);
    }
  }
}

function row2()
{
  for (var s=1; s<=width; s++)
  {
    if (s%2==0)
    {
      console.log("knit + f" + s + " " + carrier);
    }
    else
    {
      console.log("knit + b" + s + " " + carrier);
    }
  }
}

function row3()
{
  for (var s=width; s>0; s--)
  {
    if (s%2==0)
    {
      console.log("knit - f" + s + " " + carrier);
    }
    else
    {
      console.log("knit - b" + s + " " + carrier);
    }
  }
  for (var s = 1; s<=width; s++)
  {
    if(s%2 == 0)
    {
      console.log("xfer f" + s + " b" + s);
    }
    else
    {
      console.log("xfer b" + s + " f" + s);
    }
  }
}

function row4()
{
  for (var s=1; s<=width; s++)
  {
    if (s%2==0)
    {
      console.log("knit + b" + s + " " + carrier);
    }
    else
    {
      console.log("knit + f" + s + " " + carrier);
    }
  }
}


//tuck on all needles
for (var s=width; s>0; s--)
{
  if(s%2==0)
  {
    console.log("tuck - b" + s + " " + carrier);
  }
  else
  {
    console.log("tuck - f" + s + " " + carrier);
  }
}

//rib on way back, skip last of the tucks
for (var s=2; s<=width; s++)
{
  if (s%2==0)
  {
    console.log("knit + b" + s + " " + carrier);
  }
  else
  {
    console.log("knit + f" + s + " " + carrier);
  }
}

// release the yarn inserting hook
console.log("releasehook " + carrier);


for(var h = 1 ; h <= height ; h = h+4)
{
  row1();
  row2();
  row3();
  row4();
}

// bring the yarn out with the yarn inserting hook
console.log("outhook " + carrier);