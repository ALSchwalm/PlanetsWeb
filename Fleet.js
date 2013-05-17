
function Fleet(_x, _y, _owner, _source, _destination, _population) {
	this.x = _x;
	this.y = _y;
	this.owner = _owner;
	this.source = _source;
	this.destination = _destination;
	this.population = _population;
	this.ships = []
	
	for(var i =0; i < this.population; i++)
	{ 
		this.ship[i] = Ship(this.x, this.y, this);
		//TODO make group of every ship.
	}
}