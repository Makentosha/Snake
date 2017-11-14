let x = 10;
let points = 4;
let positionZ = 50;
let positionX = 0;
let directionX = 0;
let directionY = 10;
let speed = 100;

start();

function start() {
	document.querySelector("#lost").style.display = "none";
	$(".point").remove();
	x = 10;
	points = 4;
	positionZ = 50;
	positionX = 0;
	directionX = 0;
	directionY = 10;
	speed = 100;
	spawnTarget();
	for (let i = 0; i < 5; i++) {
		let point = document.createElement("div");
		point.className = "point";
		point.id = i;
		point.style.position = "fixed";
		point.style.top = i * 10 + 10 + "px";
		point.style.left = 100 + "px";
		if (i == 4) {
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
			|| $(".point")[points].style.left.substring(0, $(".point")[points].style.left.length - 2) < 10) {
			clearInterval(move);
			document.querySelector("#lost").style.display = "block";

		}
		if($(".point")[points].style.top == document.getElementById("target").style.top && $(".point")[points].style.left == document.getElementById("target").style.left) {
			spawnTarget();
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
		console.log("frame");
	},30);
}



function spawnTarget() {
	speed = 10;
	$("#target").remove();
	let target = document.createElement("div");
	target.id = "target";
	target.style.top = Math.floor(Math.random() * 59) * 10 + "px";
	target.style.left = Math.floor(Math.random() * 59) * 10 + "px";
	$("body").append(target);
}