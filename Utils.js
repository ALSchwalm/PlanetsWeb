
Utils = {}

Utils.distance = function(x1, y1, x2, y2) {
	return Math.sqrt( Math.pow(x2-x1, 2) + Math.pow(y2-y1, 2));
}

Utils.directions = [
	[0, 1],
	[0, -1],
	[0, 0],
	
	[1, 1],
	[1, 0],
	[1, -1],
	
	[-1, 0],
	[-1, 1],
	[-1, -1]
]


Utils.colors = ["aqua", "brown", "aquamarine"];