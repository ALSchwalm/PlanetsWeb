
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

Ship.SPEED = 2;
Ship.AVOID_FACTOR = 2000;
Ship.AVOID_DISTANCE = 50;
Ship.SEPARATE_DISTANCE = 7;


Ship.prototype.update = function(){
	var moveVector = Utils.getVector(this.x, this.y,
			this.destination.x, this.destination.y);

	for (var i=0; i < Game.planets.length; i++) {
		if (Game.planets[i] === this.parentFleet.source || 
				Game.planets[i] === this.destination) {
			continue;
		} else if (Utils.distance(this.x, this.y, 
				Game.planets[i].x, Game.planets[i].y) > Ship.AVOID_DISTANCE) {
			continue;
		}
		
		var planetVector = Utils.getVector(Game.planets[i].x, Game.planets[i].y, this.x, this.y);
			
		planetVector= [ Ship.AVOID_FACTOR * planetVector[0]/Math.pow(Utils.distance(this.x, this.y,
							Game.planets[i].x, Game.planets[i].y), 2),
						Ship.AVOID_FACTOR * planetVector[1]/Math.pow(Utils.distance(this.x, this.y,
							Game.planets[i].x, Game.planets[i].y), 2)];
		moveVector[0] += planetVector[0];
		moveVector[1] += planetVector[1];

	}
	
	for (var i=0; i < this.parentFleet.ships.length; i++) {
		if (this.parentFleet.ships[i] === this) {
			continue;
		} else if (Utils.distance(this.x, this.y, 
				this.parentFleet.ships[i].x, this.parentFleet.ships[i].y) > Ship.SEPARATE_DISTANCE) {
			continue;
		} 
		
		var shipVector = Utils.getVector(this.parentFleet.ships[i].x, this.parentFleet.ships[i].y, this.x, this.y);
		
		if (Utils.distance(this.x, this.y, this.parentFleet.ships[i].x, this.parentFleet.ships[i].y) == 0) {
			shipVector = [Math.random(), Math.random()];
		} else {
			shipVector= [ Ship.AVOID_FACTOR * shipVector[0]/Math.pow(Utils.distance(this.x, this.y,
								this.parentFleet.ships[i].x, this.parentFleet.ships[i].y), 2),
							Ship.AVOID_FACTOR * shipVector[1]/Math.pow(Utils.distance(this.x, this.y,
								this.parentFleet.ships[i].x, this.parentFleet.ships[i].y), 2)];
		}
							
		moveVector[0] += shipVector[0];
		moveVector[1] += shipVector[1];
	}


	
	this.x += Utils.normalize(moveVector)[0] * Ship.SPEED;
	this.y += Utils.normalize(moveVector)[1] * Ship.SPEED;
	
	this.view.set('left', this.x.toString());
	this.view.set('top', this.y.toString());
	Interface.canvas.renderAll();
}