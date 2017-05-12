var canvas = document.getElementById("canvas"),
	ctx = canvas.getContext("2d");

var animatingTimesStart = times = Number(document.getElementById("timesStart").value),
	animatingTimesEnd = Number(document.getElementById("timesEnd").value),
	animatingTimesSpeed = Number(document.getElementById("timesSpeed").value),
	animatingModuloStart = Number(modulo = document.getElementById("modStart").value),
	animatingModuloEnd = Number(document.getElementById("modEnd").value),
	animatingModuloSpeed = Number(document.getElementById("modSpeed").value),
	animating = false;

function draw(times, modulo) {
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	ctx.strokeStyle = "rgba(100, 100, 255, 0.5)";
	ctx.beginPath();
	ctx.arc(canvas.width / 2, canvas.height / 2, canvas.height / 2.2, 0, 2 * Math.PI);
	ctx.closePath();
	ctx.stroke();

	ctx.strokeStyle = "rgba(100, 100, 255, 0.3)";
	ctx.font = "20px Arial";
	var i;
	for (i = 0; i < modulo; i++) {
		if (i % Math.ceil(modulo / 20) == 0) {
			ctx.strokeText(i, canvas.width/2 + Math.cos(2 * Math.PI * i / modulo) * (canvas.height / 2.2 + 15) - 10,
				canvas.height/2 + Math.sin(2 * Math.PI * i / modulo) * (canvas.height / 2.2 + 15) + 10);
		}
	}

	ctx.strokeStyle = "rgba(100, 100, 255, " + 100 / modulo  + ")";
	ctx.beginPath();
	for (i = 0; i < modulo; i++) {
		ctx.moveTo(canvas.width/2 + Math.cos(2 * Math.PI * i / modulo) * (canvas.height / 2.2),
			canvas.height/2 + Math.sin(2 * Math.PI * i / modulo) * (canvas.height / 2.2));
		ctx.lineTo(canvas.width/2 + Math.cos(2 * Math.PI * i * times / modulo) * (canvas.height / 2.2),
			canvas.height/2 + Math.sin(2 * Math.PI * i * times / modulo) * (canvas.height / 2.2));
	}
	ctx.closePath();
	ctx.stroke();
}

getAndDraw();

setInterval(function() {
	console.log(times);
	if (modulo < animatingModuloEnd && animating) {
		draw(times, modulo);
		modulo += modulo * animatingModuloSpeed / 100;
	}
	else {
		if (animating) {
			modulo = animatingModuloEnd;
			setTimeout(function () {
				if (times < animatingTimesEnd && animating) {
					draw(times, modulo);
					times += times * animatingTimesSpeed / 100;
				}
				else {
					times = animatingTimesEnd;
					draw(times, modulo);
					animating = false;
				}
			}, 50);
		}
	}
}, 50);

function restartAnimation() {
	times = animatingTimesStart;
	modulo = animatingModuloStart;
	console.log("Animation restarted");
	animating = true;
}

function setAnimationParameters(modStart, modEnd, modSpeed, timesStart, timesEnd, timesSpeed) {
	animatingModuloStart = modStart;
	animatingModuloEnd = modEnd;
	animatingModuloSpeed = modSpeed;
	animatingTimesStart = timesStart;
	animatingTimesEnd = timesEnd;
	animatingTimesSpeed = timesSpeed;
	console.log("animatingModuloStart = " + modStart);
	console.log("animatingModuloEnd = " + modEnd);
	console.log("animatingModuloSpeed = " + modSpeed);
	console.log("animatingModuloStart = " + timesStart);
	console.log("animatingModuloEnd = " + timesEnd);
	console.log("animatingModuloSpeed = " + timesSpeed);
}

function getAndDraw() {
	animating = false;
	draw(document.getElementById("times").value, document.getElementById("modulo").value);
}

function getAnimationParameters() {
	setAnimationParameters(Number(document.getElementById("modStart").value),
		Number(document.getElementById("modEnd").value),
		Number(document.getElementById("modSpeed").value),
		Number(document.getElementById("timesStart").value),
		Number(document.getElementById("timesEnd").value),
		Number(document.getElementById("timesSpeed").value));
}

restartAnimation();