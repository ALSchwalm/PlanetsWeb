
function Ship(_x, _y, _parentFleet) {
	this.owner = _parentFleet.owner;
	this.parentFleet = _parentFleet;
	this.destination = this.parentFleet.destination;
	
	this.x = _x + Math.random();
	this.y = _y + Math.random();
	
	this.velocity = new Vector(0, 0);
	this.angle = 0;
	
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

Ship.AVOID_FACTOR = 15;
Ship.SEPARATE_FACTOR = 2;
Ship.SEPARATE_DISTANCE = 10;
Ship.MAX_VELOCITY = 5;
Ship.MAX_ACCELERATION = 2;


Ship.prototype.update = function(){
	this.x += this.velocity.getXY()[0]; 
	this.y += this.velocity.getXY()[1];
	//this.angle = Math.atan2(this.yVelocity, this.xVelocity);
	
	this.view.set('left', this.x.toString());
	this.view.set('top', this.y.toString());
}

Ship.prototype.applyPhysics = function() {
	var accelerationVector = Utils.createVectorFromPoints(this.x, this.y,
			this.destination.x, this.destination.y).limit(Ship.MAX_ACCELERATION);

	for (var i=0; i < Game.planets.length; i++) {
		if (Game.planets[i] === this.parentFleet.source || 
				Game.planets[i] === this.destination) {
			continue;
		}
		
		var inverseDistance = 1/Utils.distance(this.x, this.y, Game.planets[i].x, Game.planets[i].y);
		
		var planetVector= Utils.createVectorFromPoints(Game.planets[i].x, Game.planets[i].y,
			this.x, this.y).limit(Ship.AVOID_FACTOR*inverseDistance);
			
		accelerationVector= Utils.addVector(planetVector, accelerationVector);
	}
	
	for (var i=0; i < this.parentFleet.ships.length; i++) {
		if (this.parentFleet.ships[i] === this) {
			continue;
		} else if (Utils.distance(this.x, this.y, 
				this.parentFleet.ships[i].x, this.parentFleet.ships[i].y) > Ship.SEPARATE_DISTANCE) {
			continue;
		}
		
		var inverseDistance = 1/Utils.distance(this.x, this.y, 
			this.parentFleet.ships[i].x, this.parentFleet.ships[i].y);
		
		var shipVector= Utils.createVectorFromPoints(this.parentFleet.ships[i].x, this.parentFleet.ships[i].y,
			this.x, this.y).limit(Ship.SEPARATE_FACTOR*inverseDistance);
			
		accelerationVector= Utils.addVector(shipVector, accelerationVector);
	}

	this.velocity = Utils.addVector(this.velocity, accelerationVector);
	this.velocity.limit(Ship.MAX_VELOCITY);
}