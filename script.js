let x = 10;
let points = 5;
let positionZ = 50;
let positionX = 0;
let directionX = 0;
let directionY = 10;
let speed = 50;
let currentScore = 0;
let bestScore = 0;

start();

function start() {
	document.querySelector("#lost").style.display = "none";
	$(".point").remove();
	x = 10;
	points = 5;
	positionZ = 50;
	positionX = 0;
	directionX = 0;
	directionY = 10;
	speed = 50;
	spawnTarget();
	for (let i = 0; i <= points; i++) {
		let point = document.createElement("div");
		point.className = "point";
		point.id = i;
		point.style.position = "fixed";
		point.style.top = i * 10 + 10 + "px";
		point.style.left = 100 + "px";
		if (i == points) {
			point.style.backgroundColor = 'orange';
		}
		$("body").append(point);
	}
	var move = setInterval(function() {
		for (let i = 0; i < points; i++) {
			$(".point")[i].style.top = $(".point")[i + 1].style.top;
			$(".point")[i].style.left = $(".point")[i + 1].style.left;
		}
		$(".point")[points].style.top = +$(".point")[points].style.top.substring(0, $(".point")[points].style.top.length - 2) + directionY + "px";
		$(".point")[points].style.left = +$(".point")[points].style.left.substring(0, $(".point")[points].style.left.length - 2) + directionX + "px";

		if ($(".point")[points].style.top.substring(0, $(".point")[points].style.top.length - 2) >= 590
			|| $(".point")[points].style.left.substring(0, $(".point")[points].style.left.length - 2) >= 590
			|| $(".point")[points].style.top.substring(0, $(".point")[points].style.top.length - 2) < 10
			|| $(".point")[points].style.left.substring(0, $(".point")[points].style.left.length - 2) < 10
			|| checkPosition()) {
			clearInterval(move);
			document.querySelector("#lost").style.display = "block";
			console.log("cs " + currentScore);
			console.log("bs " + bestScore);
			if (bestScore < currentScore) {
				bestScore = currentScore;
				document.querySelector("#bestScore").innerHTML = "Best Score: " + bestScore;
			}
			currentScore = 0;
			document.querySelector("#currentScore").innerHTML = "Current Score: " + currentScore;
		}
		
		if($(".point")[points].style.top == document.getElementById("target").style.top && $(".point")[points].style.left == document.getElementById("target").style.left) {
			spawnTarget();
			increseLength();
		}
		$("body").keyup(function(e) {
			if(e.which == 68 || e.which == 39) {
				if (directionX != -10) {
					directionX = 10;
					directionY = 0;
				}
			}
			if(e.which == 87 || e.which == 38) {
				if(directionY != 10) {
					directionY = -10;
					directionX= 0;
				}
			}
			if(e.which == 83 || e.which == 40) {
				if (directionY != -10) {
					directionY = +10;
					directionX = 0;
				}
			}
			if(e.which == 65 || e.which == 37) {
				if (directionX != 10) {
					directionX = -10;
					directionY = 0;
				}
			}
		});
	},100);
}

function checkPosition() {
	let head = document.getElementById(points).style;
	for (let i = 0; i < points - 1; i++) {
		let point = document.getElementById(i).style;
		if (point.left == head.left && point.top == head.top) {
			console.log("point.left: " + point.left);
			console.log("head.left: " + head.left);
			console.log("point.top: " + point.top);
			console.log("head.top: " + head.top);
			return (true);
		}
	}
}

function spawnTarget() {
	speed = 10;
	$("#target").remove();
	let target = document.createElement("div");
	target.id = "target";
	target.style.top = Math.floor(Math.random() * 58) * 10 + 10 + "px";
	target.style.left = Math.floor(Math.random() * 58) * 10 + 10 + "px";
	$("body").append(target);
}

function increseLength() {
	let point = document.createElement("div");
	point.className = "point";
	point.style.position = "fixed";
	$("body").prepend(point);
	points++;
	currentScore++;
	document.querySelector("#currentScore").innerHTML = "Current Score: " + currentScore;
}
