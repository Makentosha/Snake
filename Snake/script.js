let x = 10;
let points = 4;
let positionZ = 50;
let positionX = 0;
let directionX = 0;
let directionY = 10;
let speed = 100;

start();

function start() {

	$("body").empty();
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
			console.log(point)
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
			console.log(move)
			clearInterval(move);
			console.log('You have crashed')
		}
		if($(".point")[points].style.top == document.getElementById("target").style.top && $(".point")[points].style.left == document.getElementById("target").style.left) {
			spawnTarget();
		}
	},100);
	$("body").keyup(function(e) {
		console.log(e)
		if(e.which == 68) {
			directionX = 10;
			directionY = 0;
		}
		if(e.which == 87) {
			directionY = -10;
			directionX= 0;
		}
		if(e.which == 83) {
			directionY = 10;
			directionX = 0;
		}
		if(e.which == 65) {
			directionX = -10;
			directionY = 0;
		}
		if(e.which == 82){
			clearInterval(move);
			x = 10;
			points = 4;
			positionZ = 50;
			positionX = 0;
			directionX = 0;
			directionY = 10;
			speed = 100;
			start();
		}
		console.log(e.which);
	})
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