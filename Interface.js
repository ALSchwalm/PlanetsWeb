
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
Interface.monitorEvent("mouse:move");

Interface.lines = [];
Interface.drawTargetLines = function(target) {
	Interface.canvas.getActiveGroup().forEachObject( function(playerPlanet) {
		var coords = [playerPlanet.originalLeft, playerPlanet.originalTop, target.left, target.top];

		var line = new fabric.Line(coords, {
			stroke: Game.player.color,
			strokeWidth: 2,
			selectable: false
		});	
		
		var line_back = new fabric.Line(coords, {
			stroke: 'black',
			strokeWidth: 4,
			selectable: false
		});	

		Interface.lines.push(line, line_back);
		Interface.canvas.add(line_back, line);
		line.sendToBack();
		line_back.sendToBack();
	})
}

Interface.removeTargetLines = function() {
	for(var i=0; i < Interface.lines.length; i++) {
		Interface.canvas.remove(Interface.lines[i]);
	}
	Interface.lines = [];
}

Interface.handleEvents = function(monitor, options) {
	if (monitor == "mouse:move") {
		var target = Interface.canvas.findTarget(options.e, true);
		if (!Game.player.target && target && target.planet && Interface.canvas.getActiveGroup()) {
			Interface.drawTargetLines(target);
		} else if (Game.player.target != target) {
			Interface.removeTargetLines();
		} 
		Game.player.target = target;
	}
	else if (monitor == "selection:created") {
		Interface.canvas.getActiveGroup().hasBorders = false;
		Interface.canvas.getActiveGroup().hasControls = false;
	}
	else if (monitor == "mouse:down") {
		if (options.e.button == 1) {
			Interface.canvas.discardActiveGroup();
		} else if (options.e.button == 0) {
			var target = Interface.canvas.findTarget(options.e, true)

			if (target && target.planet && Interface.canvas.getActiveGroup() && 
					Interface.canvas.getActiveGroup().getObjects().indexOf(target) == -1) {
				if (Interface.canvas.getActiveGroup()) {
					Interface.canvas.getActiveGroup().forEachObject(function (o) {
						o.planet.launchFleet(target.planet);
					});
					Interface.canvas.discardActiveGroup();
					Game.player.target = null;
					Interface.removeTargetLines();
				} 
				
			}
		}
	}
}