
var Interface = {};

Interface.canvas_back = document.getElementById("background");
Interface.canvas_back.width  = Interface.width = window.innerWidth;
Interface.canvas_back.height = Interface.height = window.innerHeight;
Interface.canvas = new fabric.Canvas("background");
Interface.BACKGROUND_COLOR = "#222222";

Interface.canvas.backgroundColor = Interface.BACKGROUND_COLOR;
Interface.canvas.hoverCursor = 'default'
Interface.canvas.moveCursor  = 'default'
Interface.canvas.renderAll();

Interface.width = Interface.canvas.getWidth();
Interface.height = Interface.canvas.getHeight();

Interface.monitorEvent = function(monitor) {
	Interface.canvas.on(monitor, function(e) {Interface.handleEvents(monitor, e);});
}

Interface.monitorEvent("selection:created");
Interface.monitorEvent("mouse:down");

Interface.handleEvents = function(monitor, options) {
	if (monitor == "selection:created") {
		Interface.canvas.getActiveGroup().hasBorders = false;
		Interface.canvas.getActiveGroup().hasControls = false;
	}
	else if (monitor == "mouse:down") {
		if (options.e.button == 1) {
			Interface.canvas.discardActiveObject();
			Interface.canvas.discardActiveGroup();
		} else if (options.e.button == 0) {	
			for (var i=0; i < Game.planets.length; i++)
			{
				if (Game.planets[i].group.containsPoint(options.e)) {
					if (Interface.canvas.getActiveGroup()) {
						Interface.canvas.getActiveGroup().forEachObject(function (o) {
							o.planet.launchFleet(Game.planets[i]);
						});
						Interface.canvas.discardActiveGroup();
						Interface.canvas.discardActiveObject();
					} 
					break;
				}
			}
		}
	}
}