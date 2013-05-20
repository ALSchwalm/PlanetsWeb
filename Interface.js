
var Interface = {};

Interface.canvas_back = document.getElementById("background");
Interface.canvas_back.width  = Interface.width = window.innerWidth;
Interface.canvas_back.height = Interface.height = window.innerHeight;
Interface.canvas = new fabric.Canvas("background");
Interface.BACKGROUND_COLOR = "#111111";

Interface.canvas.backgroundColor = Interface.BACKGROUND_COLOR;
Interface.canvas.hoverCursor = 'default'
Interface.canvas.renderAll();

Interface.width = Interface.canvas.getWidth();
Interface.height = Interface.canvas.getHeight();

Interface.monitorEvent = function(monitor) {
	Interface.canvas.on(monitor, function(e) {Interface.handleEvents(monitor, e);});
}

Interface.monitorEvent("selection:created");
Interface.monitorEvent("mouse:down");

Interface.handleEvents = function(monitor, e) {
	if (monitor == "selection:created") {
		Interface.canvas.getActiveGroup().hasBorders = false;
		Interface.canvas.getActiveGroup().hasControls = false;
	}
	else if (monitor == "mouse:down") {
		for (var i=0; i < Game.planets.length; i++)
		{
			if (Game.planets[i].group.containsPoint(e.e)) {

				if(Interface.canvas.getActiveObject() != null && Interface.canvas.getActiveObject() != undefined && 
						Game.planets[i].group != Interface.canvas.getActiveObject()) {
					Interface.canvas.getActiveObject().planet.launchFleet(Game.planets[i], 150);
					Interface.canvas.discardActiveObject();
				}
				else if (Interface.canvas.getActiveGroup() != null && Interface.canvas.getActiveGroup() != undefined) {
					Interface.canvas.getActiveGroup().objects[0].planet.launchFleet(Game.planets[i], 150);
					Interface.canvas.discardActiveGroup();
				}
				else if (Game.planets[i].owner == Game.player) {
					Interface.canvas.setActiveObject(Game.planets[i].group);
				}
				break;
			}
		}
	}
}