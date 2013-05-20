
function Fleet(_x, _y, _owner, _source, _destination, _population) {
	this.x = _x;
	this.y = _y;
	this.owner = _owner;
	this.source = _source;
	this.destination = _destination;
	this.population = _population;
	this.ships = [];
	
	var tempViews = [];

	for(var i=0; i < _population; i++)
	{ 
		this.ships.push(new Ship(this.x, this.y, this));
		tempViews.push(this.ships[this.ships.length-1].view);
		
		//TODO make group of every ship.
	}
	
	Interface.canvas.add.apply(Interface.canvas, tempViews);
}

Fleet.prototype.update = function() {
	for(var i=0; i < this.ships.length; i++) {
		this.ships[i].update();
	}
}

Fleet.prototype.applyPhysics = function() {
	for(var i=0; i < this.ships.length; i++) {
		this.ships[i].applyPhysics();
	}
}