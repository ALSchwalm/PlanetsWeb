
function validPosition(x, y) {
	for (var i =0; i < Game.planets.length; i++)
	{
		if ( Utils.distance(x, y, Game.planets[i].x, Game.planets[i].y) < 0.03)
			return false;
		else if (x < 0.03 || y < 0.03 || x > 0.97 || y > 0.97)
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
Game.stars = []

Game.update = function(){
}

Game.run = function() {
	Interface.clear();
	Interface.draw();
}

Game.setup = function() {
	for(var i=0; i < Game.NUM_STARS; i++)
	{
		Game.stars[i] = new Star(Math.random(), Math.random());
	}

	Game.player = new Player(0);

	for(var i =0; i < Game.NUM_PLANETS; i++)
	{
		var x = 0; var y =0;
		do
		{
			x = Math.random();
			y = Math.random();
		} while (!validPosition(x, y));
		Game.planets[i] = new Planet(i, x, y, null, Math.floor(Math.random()*(Game.MAX_INITIAL_POP - 
			Game.MIN_INITIAL_POP)+Game.MIN_INITIAL_POP));
	}
	
	for (var i=0; i < Game.NUM_AI_PLAYERS; i++) {
		Game.aiPlayers[i] = new Player(i+1);
		Game.planets[i+1].owner = Game.aiPlayers[i];
		Game.planets[i+1].population = Game.AI_INITIAL_POP;
	}
	Game.planets[0].owner = Game.player;
	Game.planets[0].population = Game.PLAYER_INITIAL_POP;

	
}