
function Player(_ID) {
	this.ID = _ID;
	this.color = Utils.colors[_ID];
	this.planets = [];
	this.fleets = [];
	this.percent = 0.5;
}

Player.prototype.getTotalPopulation = function() {
	var total =0;
	for(var i=0; i < this.planets.length; i++) 
		total += this.planets[i].population;
	return total;
}

/*
	Primary AI for enemy players
*/
Player.prototype.move = function() {

	if(this.fleets.length == 0) {
		var smallest = {population: 10000};
		
		for(var i=0; i < Game.planets.length; i++) {
			if (Game.planets[i].population < smallest.population &&
					Game.planets[i].owner != this)
				smallest = Game.planets[i];
		}
		
		var percent = (smallest.population+5) / this.getTotalPopulation();
		
		for(var i=0; i < this.planets.length; i++)
			this.planets[i].launchFleet(smallest, percent);
	}
}
