
var Interface = {};

Interface.canvas = document.getElementById("background");
Interface.context = Interface.canvas.getContext("2d");
Interface.width = window.innerWidth;
Interface.height = window.innerHeight;

Interface.BACKGROUND_COLOR = "#111111"

Interface.canvas.addEventListener('mousemove', Interface.handleEvents, false);
Interface.canvas.addEventListener('mousedown', Interface.handleEvents, false);

function drawStars() {
	for(var i =0; i < Game.stars.length; i++)
	{
		Interface.context.beginPath();
		Interface.context.arc(Game.stars[i].x * Interface.width, Game.stars[i].y * Interface.height,2,0,2*Math.PI);
		Interface.context.closePath();
		Interface.context.fillStyle="rgba(255, 255, 255, 0.2)";
		Interface.context.fill();
	}
}


Interface.draw = function(){
	drawStars();
	for(var i =0; i < Game.planets.length;i++){
		Game.planets[i].draw();
	}
};

Interface.clear = function(){
	Interface.canvas.width  = Interface.width = window.innerWidth;
	Interface.canvas.height = Interface.height = window.innerHeight;
	Interface.context.fillStyle=Interface.BACKGROUND_COLOR;
	Interface.context.fillRect(0, 0, Interface.canvas.width, Interface.canvas.height);
}

Interface.handleEvents = function(e) {
	if (e.type == "mousedown") {
		
	}
	else if (e.type == "mousemove") {

	}
}