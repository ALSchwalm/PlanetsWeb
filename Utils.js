
Utils = {}

Utils.distance = function(x1, y1, x2, y2) {
	return Math.sqrt( (x1 - x2)*(x1 - x2) + (y1 - y2)*(y1 - y2));
}

Utils.planetDistance = function(planet1, planet2) {
	return Math.sqrt( Math.pow(planet2.x - planet1.x, 2) +
		Math.pow(planet2.y - planet1.y, 2));
}

Utils.manhattanDistance = function(x1, y1, x2, y2) {
	return Math.abs(x2 - x1) + Math.abs(y2 - y1);
}

Utils.colors = ["aqua", "brown", "aquamarine", "DarkGoldenRod ", "OrangeRed", "Tan"];

Utils.removeFromActiveGroup = function(obj) {
	if (!Interface.canvas.getActiveGroup() || 
			Interface.canvas.getActiveGroup().getObjects().indexOf(obj) == -1)
		return;
	var group = [];
	for(var i in Interface.canvas.getActiveGroup().getObjects()) {
		if (Interface.canvas.getActiveGroup().getObjects()[i] != obj)
			group.push(Interface.canvas.getActiveGroup().getObjects()[i])
	}
	Interface.canvas.discardActiveGroup();
	
	for(var i=0; i < group.length; i++)
		group[i].set('active', true);
	var group = new fabric.Group(group);
	Interface.canvas.setActiveGroup(group);
	Interface.canvas.fire('selection:created');
}

Utils.findTarget = function(e) {
	for(var i=0; i < Game.planets.length; i++) {
		if (Utils.distance(e.pageX, e.pageY, Game.planets[i].x, Game.planets[i].y) < Planet.PLANET_SIZE)
			return Game.planets[i].group;
	}
}

function Vector(magnitude, direction) {
	this.magnitude = magnitude;
	this.direction = direction;
}

Vector.prototype.getXY = function() {
	return [this.magnitude*Math.cos(this.direction),
			this.magnitude*Math.sin(this.direction)]
}

Vector.prototype.limit = function(limit) {
	if (this.magnitude > limit) {
		this.magnitude = limit;
	} else if (this.magnitude < -limit) {
		this.magnitude = -limit;
	}
	return this;
}

Vector.prototype.normalize = function() {
	this.magnitude = 1;
	return this;
}

Utils.addVector = function(v1, v2) {
	var comp1 = v1.getXY();
	var comp2 = v2.getXY();
	
	return Utils.createVectorFromXY(comp1[0]+comp2[0], comp1[1]+comp2[1]);
}

Utils.createVectorFromPoints = function(x1, y1, x2, y2) {
	var magnitude = Math.sqrt( (x1 - x2)*(x1 - x2) + (y1 - y2)*(y1 - y2));
	var direction = Math.atan2((y2 - y1), (x2 - x1));

	return  new Vector(magnitude, direction);
}

Utils.createVectorFromXY = function(x, y) {
	return Utils.createVectorFromPoints(0, 0, x, y);
}