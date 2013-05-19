
Utils = {}

Utils.distance = function(x1, y1, x2, y2) {
	return Math.sqrt( Math.pow(x2-x1, 2) + Math.pow(y2-y1, 2));
}

Utils.planetDistance = function(planet1, planet2) {
	return Math.sqrt( Math.pow(planet2.x - planet1.x, 2) +
		Math.pow(planet2.y - planet1.y, 2));
}

Utils.manhattanDistance = function(x1, y1, x2, y2) {
	return Math.abs(x2 - x1) + Math.abs(y2 - y1);
}

Utils.getVector = function(x1, y1, x2, y2) {
	return [x2 - x1, 
			y2 - y1]
}
			
Utils.normalize = function(vector) {
	var mag = Math.sqrt(Math.pow(vector[0], 2) + Math.pow(vector[1], 2))
	return [vector[0]/mag, vector[1]/mag];
}

Utils.colors = ["aqua", "brown", "aquamarine"];