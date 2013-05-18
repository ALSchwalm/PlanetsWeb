
function Ship(_x, _y, _parentFleet) {
	this.owner = _parentFleet.owner;
	this.parentFleet = _parentFleet;
	this.x = _x;
	this.y = _y;
	
	this.view = new fabric.Rect({
		left: this.x,
		top: this.y,
		fill: "red",
		width: 5,
		height: 5,
		selectable: false
	});
	
	Interface.canvas.add(this.view);
}