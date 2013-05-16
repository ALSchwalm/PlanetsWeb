
function Planet(_ID, _x, _y, _owner, _population)
{
	this.x = _x;
	this.y = _y;
	this.isSelected = false;
	this.owner = _owner;
	this.population = _population;
	this.PLANET_SIZE = 15;
	
	var canvas	 = document.createElement('canvas');
	canvas.id = _ID.toString();
	canvas.width  = this.PLANET_SIZE*2;
	canvas.height = this.PLANET_SIZE*2;
	canvas.style.left = Math.floor(Interface.width * this.x).toString() + "px";
	canvas.style.top =  Math.floor(Interface.height * this.y).toString() + "px";
	canvas.style.position = "absolute";
	document.body.appendChild(canvas);
	
	this.canvas = canvas;
	this.context = canvas.getContext("2d");
	
	this.canvas.addEventListener('mousemove', this.handleEvents(), false);
	this.canvas.addEventListener('mousedown', this.handleEvents(), false);
}

Planet.prototype.draw = function()
{
	this.canvas.style.left = Math.floor(Interface.width * this.x).toString() + "px";
	this.canvas.style.top =  Math.floor(Interface.height * this.y).toString() + "px";
	
	this.context.fillStyle= Interface.BACKGROUND_COLOR;
	this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);
	
	this.context.beginPath();
	this.context.arc(this.PLANET_SIZE, this.PLANET_SIZE, this.PLANET_SIZE,0,2*Math.PI);
	this.context.closePath();
	
	if (this.owner != null) {
		this.context.fillStyle=this.owner.color;
	}
	else {
		this.context.fillStyle="white";
	}
	this.context.fill();
	
	if (this.isSelected == true) {
		this.context.strokeStyle = "OrangeRed ";
		this.context.lineWidth = 1;
		this.context.stroke();
	}
	this.context.font="15px Arial";
	this.context.fillStyle="black";
	this.context.textAlign="center";
	this.context.fillText(this.population.toString(), this.PLANET_SIZE, this.PLANET_SIZE + 4);
}

Planet.prototype.handleEvents = function() {
	var self = this;
	
	return function(e) {
		if (e.type == "mousedown") {
			self.isSelected = !self.isSelected;
		}
	}
}