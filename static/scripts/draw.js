console.log("V1");

var ctx;
var c;
var move;

var xHold;
var yHold;

var colourBox;

var redSlider;
var greenSlider;
var blueSlider;

function init(){
	console.log("init");
	c = document.getElementById("canvas");
	ctx = c.getContext("2d");
	ctx.lineWidth = 5;
	move = false;
	loadListeners();
	loadColourBox();
}

function loadListeners(){
	console.log("Listers loading")
	c.addEventListener('mousedown', mouseDown, false);
	c.addEventListener('mouseup', mouseUp, false);
	c.addEventListener('mousemove', mouseMove, false);
	c.addEventListener('touchstart', touchDown, false);
	c.addEventListener('touchend', touchUp, false);
	c.addEventListener('touchmove', touchMove, false);
}

function loadColourBox(){
	colourBox = document.getElementById("drawColour");
	redSlider = document.getElementById("redSlider");
	greenSlider = document.getElementById("greenSlider");
	blueSlider = document.getElementById("blueSlider");
	redSlider.addEventListener('input', setColour, false);
	greenSlider.addEventListener('input', setColour, false);
	blueSlider.addEventListener('input', setColour, false);
	setColour();
}

function setColour(){
	colourBox.style.backgroundColor="rgb(" + redSlider.value + "," + greenSlider.value + "," + blueSlider.value + ")";
}

function mouseDown(event){
	xHold = event.clientX;
	yHold = event.clientY;
	move = true;
}

function drawLine(x1, y1, x2, y2, colour, broadcast){
	var line = {
		x1: x1,
		y1: y1,
		x2: x2,
		y2: y2,
		colour: colour
	};
	if(broadcast){
		sendLine(line);
	}
	
	ctx.beginPath();
	ctx.moveTo(x1, y1);
	ctx.lineTo(x2, y2);
	ctx.strokeStyle = colour;
	ctx.stroke();
}

function mouseUp(event){
	move = false;
}

function mouseMove(event){
	var x = event.clientX;
	var y = event.clientY;
	if(move){
		drawLine(xHold, yHold, x, y, colourBox.style.backgroundColor, true);
		xHold = x;
		yHold = y;
	}
}

function touchDown(event){
	event.preventDefault();
	var touch = event.changedTouches[0];
	xHold = touch.clientX;
	yHold = touch.clientY;
	move = true;
}

function touchUp(event){
	event.preventDefault();
	move = false;
}

function touchMove(event){
	event.preventDefault();
	var touch = event.changedTouches[0];
	var x = touch.clientX;
	var y = touch.clientY;
	if(move){
		drawLine(xHold, yHold, x, y, colourBox.style.backgroundColor, true);
		xHold = x;
		yHold = y;
	}
}

function sendLine(line){
	$.ajax({
		type: 'POST',
		url: '/updateCanvas/'.concat(JSON.stringify(line)),
		success: function(response){
			//Do nothing
		},
		error: function(error){
			console.log(error);
		}
	});
}
	
init();
var socket = io.connect('http://' + document.domain + ':' + location.port);
socket.on('connect', function(){
	console.log('connected');
});
socket.on('message', function(data){
	drawLine(data.x1, data.y1, data.x2, data.y2, data.colour, false);
});