
function Ship(_x, _y, _parentFleet) {
	this.owner = _parentFleet.owner;
	this.parentFleet = _parentFleet;
	this.destination = this.parentFleet.destination;
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

Ship.prototype.update = function(){
	
	var move_direction = [0, 0];
	var move_distance = Utils.distance(this.x, this.y, this.destination.x, this.destination.y);
	
	for(var i=0; i < Utils.directions.length; i++) {
		if (Utils.distance(this.x+Utils.directions[i][0],
				this.y+Utils.directions[i][1],
				this.destination.x,
				this.destination.y) < move_distance) {
				
			move_distance = Utils.distance(this.x+Utils.directions[i][0],
					this.y+Utils.directions[i][1],
					this.destination.x,
					this.destination.y);
			move_direction = Utils.directions[i];
		}
	}
	//console.log("moving: " + move_direction.toString());
	this.x += move_direction[0];// * Interface.width*0.01;
	this.y += move_direction[1];// * Interface.height*0.01;
	
	this.view.set('left', this.x.toString());
	this.view.set('top', this.y.toString());
}