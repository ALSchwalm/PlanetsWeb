
function Planet(_ID, _x, _y, _owner, _population)
{
	this.x = _x;
	this.y = _y;
	this.owner = _owner;
	this.population = _population;
	this.growthTrack = 0;
	
	this.text = new fabric.Text(this.population.toString(), {
		fontSize: Planet.PLANET_SIZE, 
		fontFamily: 'Arial',
		textShadow: 'rgba(100,100,100, 0.5) 1px 1px 1px'
	});
	
	
	this.circle = new fabric.Circle({
		radius: Planet.PLANET_SIZE, 
		fill: 'white',
		strokeWidth: 1,
        stroke: 'black'
	})
	
	this.group = new fabric.Group([ this.circle, this.text], { left: this.x, top: this.y});

	this.group.hasControls = false;
	this.group.selectable  = false;
	this.group.lockMovementX = this.group.lockMovementY = true;
	this.group.planet = this;
	Interface.canvas.add(this.group);
}

Planet.PLANET_SIZE = 25;
Planet.GROWTH_RATE = 1;

Planet.prototype.update = function() {
	if (this.owner && !(this.growthTrack%=100)) {
		this.addPopulation(Planet.GROWTH_RATE);
	}
	this.growthTrack++;
	this.text.text = Math.floor(this.population).toString();
}

Planet.prototype.changeOwner = function(newOwner) {
	if (this.owner) {
		this.owner.planets.splice(this.owner.planets.indexOf(this), 1);
	}
	this.owner = newOwner;
	this.owner.planets.push(this);
	this.circle.fill = newOwner.color;
	
	if (this.owner == Game.player)
		this.group.selectable = true;
	else
		this.group.selectable = false;
}

Planet.prototype.addPopulation = function(newPopulation) {
	this.population += newPopulation;
}

Planet.prototype.setPopulation = function(newPopulation) {
	this.population = 0;
	this.addPopulation(newPopulation);
}

Planet.prototype.launchFleet = function(destination, percent) {
	if (!percent)
		percent = this.owner.percent;
	else if (percent > 1 || !destination)
		return;

	if (this.population - Math.floor(percent*this.population) < 0) return;
	
	this.owner.fleets.push(new Fleet(this.x, this.y, this.owner, 
			this, destination, Math.floor(percent*this.population)));
	this.addPopulation(-Math.floor(percent*this.population));
}

Planet.prototype.launchFleetInt = function(destination, population) {
	if (this.population - population < 0) return;
	
	this.owner.fleets.push(new Fleet(this.x, this.y, this.owner, this, destination, population));
	this.addPopulation(-population);
}