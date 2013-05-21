
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
		width: 1,
		height: 1,
		selectable: false,
		strokeWidth: 1,
        stroke: 'black'
	});
	
	this.view.setShadow({
		color: 'rgba(255,255,255, 0.1)',
		offsetX: '2',
		offsetY: '2'
	});
	
	this.view.animate('width', Ship.WIDTH, {duration: Planet.PLANET_SIZE*10});
	this.view.animate('height', Ship.HEIGHT, {duration: Planet.PLANET_SIZE*10});
}

Ship.WIDTH = 10;
Ship.HEIGHT = 14;
Ship.AVOID_FACTOR = 1000;
Ship.AVOID_DISTANCE = Planet.PLANET_SIZE;
Ship.SEPARATE_FACTOR = 2;
Ship.SEPARATE_DISTANCE = 10;
Ship.MAX_VELOCITY = 5;
Ship.PLANET_PULL = 2;

Ship.prototype.angle = 0;

Ship.prototype.update = function(){
	var self = this;
	var distance = Utils.distance(this.x, this.y, this.destination.x, this.destination.y);
	if (distance < Planet.PLANET_SIZE*3 && !this.animating) {
		this.animating = true;
		this.view.animate('width', 1, {duration: Planet.PLANET_SIZE*10});
		this.view.animate('height', 1, {
			duration: Planet.PLANET_SIZE*10,
			onComplete: function() {
				Interface.canvas.remove(self.view);
				self.parentFleet.ships.splice(self.parentFleet.ships.indexOf(self), 1);
				
				if (self.destination.owner != self.owner) {
					self.destination.addPopulation(-1);
					if (self.destination.population < 0) {
						self.destination.changeOwner(self.owner);
						self.destination.addPopulation(1);
					}
				} else {
					self.destination.addPopulation(1);
				}
			}
		});
	}

	this.x += this.velocity.getXY()[0]; 
	this.y += this.velocity.getXY()[1];
	this.angle = ( this.velocity.direction)*180/Math.PI + 90;
	
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