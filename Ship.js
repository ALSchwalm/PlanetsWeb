
function Ship(_x, _y, _parentFleet) {
	this.owner = parentFleet.owner;
	this.parentFleet = _parentFleet;
	this.x = _x;
	this.y = _y;
	
	this.view = new fabric.Rect({
		left: this.y,
		top: this.x,
		fill: this.owner.color,
		width: 5,
		height: 5
	});
	
	Interface.canvas.add(this.view);
}