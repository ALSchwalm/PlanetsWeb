
function Player(_ID) {
	this.ID = _ID;
	this.color = Utils.colors[_ID];
	this.planets = [];
	this.fleets = [];
	this.selectedPlanets = [];
}
