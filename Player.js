
function Player(_ID) {
	this.ID = _ID;
	this.color = Utils.colors[_ID];
	this.planets = [];
	this.fleets = [];
	this.percent = 0.5;
}

Player.prototype.getTotalPopulation = function(filterFunction) {
	if (!filterFunction) filterFunction = function() {return true};
	var total =0;
	for(var i=0; i < this.planets.length; i++) {
		if (filterFunction(this.planets[i]))
			total += this.planets[i].population;
		}
	return total;
}

Player.prototype.getTargetFleets = function(planet) {
	var fleetList = [];
	for (var i=0; i < this.fleets.length; i++) {
		if (this.fleets[i].destination == planet)
			fleetList.push(this.fleets[i]);
	}
	return fleetList;
}

/*
	Primary AI for enemy players
*/
Player.prototype.move = function() {
	var filterFunction = function(planet) {
		if (planet.population < Game.AI_INITIAL_POP*0.20)
			return false;
		else
			return true;
	}
	
	var smallest = {population: 10000};
	
	for(var i=0; i < Game.planets.length; i++) {
		if (Game.planets[i].population < smallest.population &&
				Game.planets[i].owner != this && 
				!this.getTargetFleets(Game.planets[i]).length)
			smallest = Game.planets[i];
	}
	
	if (this.getTotalPopulation() < smallest.population + this.getTotalPopulation()*0.2) return
	
	var percent = (smallest.population+this.getTotalPopulation()*0.2) / this.getTotalPopulation();

	for(var i=0; i < this.planets.length; i++) {
		this.planets[i].launchFleet(smallest, percent);
	}
}
