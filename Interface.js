
var Interface = {};

Interface.canvas_back = document.getElementById("background");
Interface.canvas_back.width  = Interface.width = window.innerWidth;
Interface.canvas_back.height = Interface.height = window.innerHeight;
Interface.canvas = new fabric.Canvas("background");
Interface.BACKGROUND_COLOR = "#111111";

Interface.canvas.backgroundColor = Interface.BACKGROUND_COLOR;
Interface.canvas.renderAll();

Interface.width = Interface.canvas.getWidth();
Interface.height = Interface.canvas.getHeight();

//Interface.canvas.on("before:selection:cleared", Interface.handleEvents);
//Interface.canvas.on("selection:cleared", Interface.handleEvents);
//Interface.canvas.on("selection:created", Interface.handleEvents);

Interface.handleEvents = function(e) {
	if (e == "before:selection:cleared") {
		alert("test");
	}
}