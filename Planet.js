
function Planet(_ID, _x, _y, _owner, _population)
{
	this.x = _x;
	this.y = _y;
	this.isSelected = false;
	this.owner = _owner;
	this.population = _population;
	
	this.text = new fabric.Text(this.population.toString(), { fontSize: 15, fontFamily: 'Arial' });
	this.circle = new fabric.Circle({radius: Planet.PLANET_SIZE, fill: 'white'})
	
	this.group = new fabric.Group([ this.text, this.circle ], { left: this.x, top: this.y});

	this.group.hasControls = false;
	this.group.selectable  = false;
	this.group.lockMovementX = this.group.lockMovementY = true;
	Interface.canvas.add(this.group);
}

Planet.PLANET_SIZE = 15;

Planet.prototype.changeOwner = function(newOwner)
{
	if (this.owner != null) {
		this.owner.planets.splice(this.owner.planets.indexOf(this), 1);
	}
	this.owner = newOwner;
	this.owner.planets.push(this);
	this.circle.fill = newOwner.color;
	
	if (this.owner == Game.player)
	{
		this.group.selectable  = true;
	}
}

Planet.prototype.changePopulation = function(newPopulation)
{
	this.population = newPopulation;
	this.text.text = this.population.toString();

	Interface.canvas.renderAll();
}