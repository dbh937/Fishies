var stage, allFish;
var variance = 25;
function init() {
	stage = new createjs.Stage("demoCanvas");
	var background = new createjs.Shape();
	background.graphics.beginFill("PaleTurquoise").drawRect(0, 0, 640, 480);
	stage.addChild(background);
	allFish = new Array();
	for (var i = 0; i < 10; i++) {
		allFish[i] = new fish(50*randomWithinPercent(variance), 20*randomWithinPercent(variance), 5*randomWithinPercent(variance), 30*randomWithinPercent(variance), 2*randomWithinPercent(variance), 360*Math.random(), 100*Math.random(), 100*Math.random(), 360*Math.random(), 100*Math.random(), 100*Math.random());
		allFish[i].shape.x = 320;
		allFish[i].shape.y = 240;
		stage.addChild(allFish[i].shape);
	}
	createjs.Ticker.on("tick", tick);
	createjs.Ticker.setFPS(60);
}
function tick(event) {
	stage.update(event);
	for (var i = 0; i < allFish.length; i++) {
		var eachFish = allFish[i];
		if (eachFish.shape.x <= 0 || eachFish.shape.x >= 640 || eachFish.shape.y <= 0 || eachFish.shape.y >= 480 || Math.random() < 1/30) {
			eachFish.direct();
		}
		eachFish.move(event.delta / 1000 * 100);
	}
}
function fish(length, width, tailLength, tailWidth, eye, bodyH, bodyS, bodyL, eyeH, eyeS, eyeL) {
	this.length = length;
	this.width = width;
	this.tailLength = tailLength;
	this.tailWidth = tailWidth;
	this.eye = eye;
	this.color = "hsl(" + bodyH % 360 + ", " + bodyS + "%, " + bodyL + "%)";
	this.eyeColor = "hsl(" + eyeH % 360 + ", " + eyeS + "%, " + eyeL + "%)";
	this.graphics = new createjs.Graphics();
	this.graphics.beginStroke(this.eyeColor).beginFill(this.color).moveTo(-this.length/4 *(1+Math.sqrt(2)), -this.width*Math.sqrt(2)/4);
	this.graphics.lineTo(-0.75*this.length - this.tailLength, -this.tailWidth/2).lineTo(-0.75*this.length, 0).lineTo(-0.75*this.length - this.tailLength, this.tailWidth/2).lineTo(-this.length/4 *(1+Math.sqrt(2)), this.width*Math.sqrt(2)/4).closePath;
	this.graphics.beginFill(this.color).drawEllipse(-0.75 * this.length, -0.5 * this.width, this.length, this.width);
	this.graphics.beginFill(this.eyeColor).drawCircle(0, 0, eye);
	this.shape = new createjs.Shape(this.graphics);
	this.direct = function() {
		var min = 0, max = 360;
		if (this.shape.x <= 0) {
			min = 270;
			max = 90;
		} else if (this.shape.x >= 640) {
			min = 90;
			max = 270;
		}
		if (this.shape.y <= 0) {
			max = Math.min(180, max);
		} else if (this.shape.y >= 480) {
			min = Math.max(180, min);
		}
		if (max < min) {
			max += 360;
		}
		this.shape.rotation = (Math.random() * (max - min) + min) % 360;
		//console.log(this.shape.rotation);
	}
	this.move = function(pixels) {
		this.shape.x += pixels*Math.cos(this.shape.rotation * Math.PI / 180);
		this.shape.y += pixels*Math.sin(this.shape.rotation * Math.PI / 180);
	}

}
var nextNextGaussian;
var haveNextNextGaussian = false;
function randomGaussian() {
	if (haveNextNextGaussian) {
		haveNextNextGaussian = false;
		return nextNextGaussian;
	} else {
		var v1, v2, s;
		do {
			v1 = 2 * Math.random() - 1;
			v2 = 2 * Math.random() - 1;
			s = v1*v1 + v2*v2;
		} while (s >= 1 || s == 0);
		var multiplier = Math.sqrt(-2 * Math.log(s)/s);
		nextNextGaussian = v2 * multiplier;
		haveNextnextGaussian = true;
		return v1 * multiplier;
	}
}
function randomWithinPercent(percent) {
	var gaussian = randomGaussian() * percent / 100;
	if (gaussian >= 0) {
		return 1 + gaussian;
	} else {
		return 1 / (1 + Math.abs(gaussian));
	}
}
