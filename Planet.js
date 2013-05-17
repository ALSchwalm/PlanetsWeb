
function Planet(_ID, _x, _y, _owner, _population)
{
	this.x = _x;
	this.y = _y;
	this.isSelected = false;
	this.owner = _owner;
	this.population = _population;
	
	this.text = new fabric.Text(this.population.toString(), { fontSize: 15, fontFamily: 'Arial' });
	this.circle = new fabric.Circle({radius: Planet.PLANET_SIZE, fill: 'white'})
	
	this.group = new fabric.Group([ this.text, this.circle ], { left: Math.random() * Interface.width, top: Math.random() * Interface.height});

	this.group.hasControls = false;
	this.group.selectable = false;
	this.group.lockMovementX = this.group.lockMovementY = true;
	Interface.canvas.add(this.group);

}

Planet.PLANET_SIZE = 15;

Planet.prototype.changeOwner = function(newOwner)
{
	this.owner = newOwner;
	this.circle.fill = newOwner.color;
	
	if (this.owner == Game.player)
	{
		this.group.selectable = true;
	}
}