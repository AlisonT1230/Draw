console.log("V1");

var ctx;
var c;
var move;

var mobile;

var xHold;
var yHold;

var lines = [];

function init(){
	console.log("init");
	c = document.getElementById("canvas");
	ctx = c.getContext("2d");
	ctx.lineWidth = 5;
	move = false;
	loadListeners();
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

function mouseDown(event){
	xHold = event.clientX;
	yHold = event.clientY;
	move = true;
	console.log("MOUSEDOWN");
}

function drawLine(x1, y1, x2, y2){
	var line = {
		x1: x1,
		y1: y1,
		x2: x2,
		y2: y2
	};
	lines.push(line);
	sendLine(line);
	
	ctx.beginPath();
	ctx.moveTo(x1, y1);
	ctx.lineTo(x2, y2);
	ctx.stroke();
	
	xHold = x2;
	yHold = y2;
}

function mouseUp(event){
	move = false;
}

function mouseMove(event){
	var x = event.clientX;
	var y = event.clientY;
	if(move){
		drawLine(xHold, yHold, x, y);
	}
}

function touchDown(event){
	event.preventDefault();
	var touch = event.changedTouches[0];
	xHold = touch.clientX;
	yHold = touch.clientX;
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
		drawLine(xHold, yHold, x, y);
	}
}

function sendLine(line){
	$.ajax({
		type: 'POST',
		url: '/updateCanvas/'.concat(JSON.stringify(line)),
		success: function(response){
			console.log(response);
		},
		error: function(error){
			console.log(error);
		}
	});
}
	
init();