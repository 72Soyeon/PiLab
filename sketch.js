/*
“Circle Calculator” by 712308http://openprocessing.org/sketch/1154679License CreativeCommons Attribution ShareAlikehttps://creativecommons.org/licenses/by-sa/3.0
“Graph Paper” by Robert S. Robbinshttp://openprocessing.org/sketch/892260License CreativeCommons Attribution ShareAlikehttps://creativecommons.org/licenses/by-sa/3.0
*/

var x, y;
var size = 50;
var area;
var diameter;
var radius;
var circumference;

let xSize = 600;
let ySize = 600;
let xVal, yVal;

let XplotSaver = [];
let YplotSaver = [];

let button;
let lineButton;


let entered = false;
let twoPlots = false;
let drawLineStatus = false;


function setup() {
	createCanvas(1087, 692);
	size = 50;
    smooth();
    x = (530);
    y = (700);
    button = createButton('Plot');
  button.position(820, 530);
  lineButton = createButton('Calculate Slope');
  lineButton.position(245, 620);
}



function draw() {
	clear();
    drawGrid();
	calculate();

	if (keyIsPressed === true && keyCode === RIGHT_ARROW) {
		size += 1
	}
	if (keyIsPressed === true && keyCode === LEFT_ARROW) {
		size -= 1
	}
	if (size < 4) {
		size = 4
	}
	if (size > 50) {
		size = 50
	}

	
      // Invert the y axis
    scale(1, -1);
    translate(0, -height);
  
    //draw dircle
    fill (255);
    strokeWeight (1);
	ellipse(x, y, size*3, size*3);
	
	textSize(23);
    fill(0,0,0);
	text("Diameter: "+diameter+"px", 320, 500)
	text("Circumference: "+circumference+"px", 510, 500);
  textSize(15);
  strokeWeight (0.5);
  text ("Press left or right arrow keys to decrease or increase the diameter.", 330, 450)
  
  text ("Press Enter to plot the relationship between", 400, 875);
  text ("Diameter (x) and Circumference (y) on the left graph.", 370, 895);
  
  fill (0, 0, 255)
  text ("x-axis = Diameter", 180, 710);
  text ("y-axis = Circumference", -160, 420);
  text ("y = 0", -40, 730);
  text ("x = 0", -40, 710);
  
  
        // Invert the y axis
    scale(1, -1);
    translate(0, -height);
    plotting(diameter, circumference);
  
   button.mousePressed(setTrue);

  
  for (let i = 0; i < XplotSaver.length; i++){
        circle (XplotSaver[i], YplotSaver[i],5);
  }
  
  if (XplotSaver.length >= 2){
    twoPlots = true;
  }
  enableButton();
  
lineButton.mousePressed(setLineTrue);
  
  if (drawLineStatus == true){
    fill (0, 0, 0);
    drawLine();
  }
  
}


function calculate() {
	
	var π = 3.141592653589793238;
	var _diameter = size;
	var _radius = _diameter/2;
	var _area = (_radius*_radius)*π
	var _circumference = _diameter*π
	
	
	radius = round(_radius, 2)
	diameter = round(_diameter, 2)
	circumference = round(_circumference, 2)
}

function drawGrid(){
  // Draw a grid
  let gridSize = 20;

    for (let x = gridSize; x <= xSize; x += gridSize) {
        for (let y = gridSize; y <= ySize; y += gridSize) {
            stroke(172, 200, 212);
            smooth();
            line(x, 0, x, ySize);
            line(x - gridSize, y, xSize, y);
        }
    }
    
    // Draw a second grid
    gridSize = 100;
    for (let x = gridSize; x <= xSize; x += gridSize) {
        for (let y = gridSize; y <= ySize; y += gridSize) {
            stroke(172, 200, 212);
            strokeWeight(2);
            smooth();
            line(x, 0, x, ySize);
            line(x - gridSize, y, xSize, y);
        }
    }    

    // Invert the y axis
    scale(1, -1);
    translate(0, -ySize);

    // this centers what is drawn
    translate(xSize / 2, ySize / 2);

    // Draw the axes
    stroke(0, 0, 255);
    strokeWeight(2);
    // Y axis
    line(0, 0, 0, 300);
    line(0, 0, 0, -300);
    // X axis
    line(0, 0, 300, 0);
    line(0, 0, -300, 0);
}

function setTrue (){
  entered = true;
}

function plotting (xVal, yVal){
  let plotX, plotY;
  plotX= map(xVal, 0, 160, 0, xSize/2);
  plotY= map(yVal, 0, 160, 0, ySize/2);
  fill ('purple');
  
  if (entered == true) {
	append (XplotSaver, plotX);
    append (YplotSaver, plotY);
    entered = false;
	}
}

function setLineTrue(){
  drawLineStatus = true;
}

function drawLine(){
  stroke (255, 0, 0);
  fill (255, 0, 0);
  line(1, 3.14, 50*3, 157*3);
  scale(1, -1);
  text ("f(x) = 3.14x", 50, -100);
}

function enableButton() {
   if (twoPlots) { lineButton.removeAttribute('disabled');
   } else {
lineButton.attribute('disabled', '');
   }
 }