
function validPosition(x, y) {
	for (var i =0; i < Game.planets.length; i++)
	{
		if ( Utils.distance(x, y, Game.planets[i].x, Game.planets[i].y) < Planet.PLANET_SIZE*2)
			return false;
		else if (x < Planet.PLANET_SIZE*2 || y < Planet.PLANET_SIZE*2 || 
				x > Interface.width - Planet.PLANET_SIZE*2 || y > Interface.height - Planet.PLANET_SIZE*2 )
			return false;
	}
	return true;
}

var Game = {}

Game.NUM_PLANETS = 10;
Game.NUM_AI_PLAYERS = 1;
Game.NUM_STARS = 60;
Game.MAX_INITIAL_POP = 30;
Game.MIN_INITIAL_POP = 10;
Game.PLAYER_INITIAL_POP = 100;
Game.AI_INITIAL_POP = 100;

Game.player = null;
Game.planets = [];
Game.aiPlayers = [];

Game.update = function(){
	for(var i=0; i < Game.aiPlayers.length; i++) {
		for(var j=0; j < Game.aiPlayers[i].fleets.length; j++) {
			Game.aiPlayers[i].fleets[j].update();
		}
	}
	
	for(var i=0; i < Game.player.fleets.length; i++) {
		Game.player.fleets[i].update();
	}
	Interface.canvas.renderAll();
	
}

Game.applyPhysics = function() {
	for(var i=0; i < Game.aiPlayers.length; i++) {
		for(var j=0; j < Game.aiPlayers[i].fleets.length; j++) {
			Game.aiPlayers[i].fleets[j].applyPhysics();
		}
	}
	
	for(var i=0; i < Game.player.fleets.length; i++) {
		Game.player.fleets[i].applyPhysics();
	}
}

Game.setup = function() {
	for(var i=0; i < Game.NUM_STARS; i++)
	{
		var star = new fabric.Circle({
			radius: 2, fill: 'rgba(255, 255, 255, 0.2)', left: Math.random() * Interface.width, top: Math.random() * Interface.height});
		star.selectable = false;
		Interface.canvas.add(star);
	}

	Game.player = new Player(0);

	for(var i =0; i < Game.NUM_PLANETS; i++)
	{
		var x = 0; var y =0;
		do
		{
			x = Math.random() * Interface.width;
			y = Math.random() * Interface.height;
		} while (!validPosition(x, y));
		Game.planets[i] = new Planet(i, x, y, null, Math.floor(Math.random()*(Game.MAX_INITIAL_POP - 
			Game.MIN_INITIAL_POP)+Game.MIN_INITIAL_POP));
	}
	
	for (var i=0; i < Game.NUM_AI_PLAYERS; i++) {
		Game.aiPlayers[i] = new Player(i+1);
		Game.planets[i+1].changePopulation(Game.AI_INITIAL_POP);
		Game.planets[i+1].changeOwner(Game.aiPlayers[i]);
	}
	Game.planets[0].changeOwner(Game.player);
	Game.planets[0].changePopulation(Game.PLAYER_INITIAL_POP);

	Interface.canvas.renderAll();
}