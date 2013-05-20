
function Ship(_x, _y, _parentFleet) {
	this.owner = _parentFleet.owner;
	this.parentFleet = _parentFleet;
	this.destination = this.parentFleet.destination;
	
	this.x = _x + Math.random();
	this.y = _y + Math.random();
	
	this.velocity = new Vector(0, 0);
	
	this.view = new fabric.Triangle({
		left: this.x,
		top: this.y,
		fill: this.owner.color,
		width: 7,
		height: 12,
		selectable: false,
		strokeWidth: 1,
        stroke: 'black'
	});
}

Ship.AVOID_FACTOR = 700;
Ship.AVOID_DISTANCE = Planet.PLANET_SIZE*2;
Ship.SEPARATE_FACTOR = 2;
Ship.SEPARATE_DISTANCE = 10;
Ship.MAX_VELOCITY = 5;
Ship.PLANET_PULL = 2;

Ship.prototype.angle = 0;

Ship.prototype.update = function(){
	if (Utils.distance(this.x, this.y, this.destination.x, this.destination.y) < Planet.PLANET_SIZE) {
		Interface.canvas.remove(this.view);
		this.parentFleet.ships.splice(this.parentFleet.ships.indexOf(this), 1);
		
		if (this.destination.owner != this.owner) {
			this.destination.addPopulation(-1);
			if (this.destination.population < 0) {
				this.destination.changeOwner(this.owner);
				this.destination.addPopulation(1);
			}
		} else {
			this.destination.addPopulation(1);
		}
		
	}

	this.x += this.velocity.getXY()[0]; 
	this.y += this.velocity.getXY()[1];
	this.angle = ( this.velocity.direction)*180/Math.PI + 90; //TODO fix this
	
	this.view.set('left', this.x.toString());
	this.view.set('top', this.y.toString());
	this.view.set('angle', this.angle.toString());
}

Ship.prototype.applyPhysics = function() {
	var accelerationVector = Utils.createVectorFromPoints(this.x, this.y,
			this.destination.x, this.destination.y).limit(Ship.PLANET_PULL);
	
	var distance;
	
	for (var i=0; i < Game.planets.length; i++) {
		if (Game.planets[i] === this.parentFleet.source || 
				Game.planets[i] === this.destination) {
			continue;
		} else if ((distance = Utils.distance(this.x, this.y,
				Game.planets[i].x, Game.planets[i].y)) > Ship.AVOID_DISTANCE) {
			continue;
		}
		
		var inverseDistance = 1/(distance*distance);
		
		var planetVector= Utils.createVectorFromPoints(Game.planets[i].x, Game.planets[i].y,
			this.x, this.y).limit(Ship.AVOID_FACTOR*inverseDistance);
			
		accelerationVector= Utils.addVector(planetVector, accelerationVector);
	}
	
	for (var i=0; i < this.parentFleet.ships.length; i++) {
		if (this.parentFleet.ships[i] === this) {
			continue;
		} else if ((distance = Utils.distance(this.x, this.y, 
				this.parentFleet.ships[i].x, this.parentFleet.ships[i].y)) > Ship.SEPARATE_DISTANCE) {
			continue;
		}
		
		var shipVector= Utils.createVectorFromPoints(this.parentFleet.ships[i].x, this.parentFleet.ships[i].y,
			this.x, this.y).limit(Ship.SEPARATE_FACTOR*1/distance);
			
		accelerationVector= Utils.addVector(shipVector, accelerationVector);
	}

	this.velocity = Utils.addVector(this.velocity, accelerationVector);
	this.velocity.limit(Ship.MAX_VELOCITY);
}