
function validPosition(x, y) {
	for (var i =0; i < Game.planets.length; i++)
	{
		if ( Utils.distance(x, y, Game.planets[i].x, Game.planets[i].y) < Planet.PLANET_SIZE*4)
			return false;
		else if (x < Planet.PLANET_SIZE*2 || y < Planet.PLANET_SIZE*2 || 
				x > Interface.width - Planet.PLANET_SIZE*2 || y > Interface.height - Planet.PLANET_SIZE*2 )
			return false;
	}
	return true;
}

var Game = {}

Game.NUM_PLANETS = 30;
Game.NUM_AI_PLAYERS = 3;
Game.NUM_STARS = 60;
Game.MAX_INITIAL_POP = 30;
Game.MIN_INITIAL_POP = 10;
Game.PLAYER_INITIAL_POP = 100;
Game.AI_INITIAL_POP = 100;

Game.run = function() {
	Game.clear();
	Utils.updateSettings()
	Interface.setup();
	Game.setup();
	if(!Game.updateInterval)
		Game.updateInterval=setInterval(Game.update, 1000/50);
	else{
		window.clearInterval(Game.updateInterval);
		Game.updateInterval=setInterval(Game.update, 1000/50);
	}
	
	if(!Game.updatePhysics)
		Game.updatePhysics=setInterval(Game.applyPhysics, 1000/20);
	else {
		window.clearInterval(Game.updatePhysics);
		Game.updatePhysics=setInterval(Game.applyPhysics, 1000/20);
	}
}

Game.clear = function() {
	Interface.canvas.clear();
	
	Game.player = null;
	Game.planets = [];
	Game.aiPlayers = [];
}

Game.end = function(winner) {

	var winString;
	if(winner == Game.player)
		winString = "winner";
	else
		winString = "loser";
	Game.clear();

	var winText = new fabric.Text(winString, {
		top: window.innerHeight/2,
		left: window.innerWidth/2,
		fontSize: 40, 
		fontFamily: 'Arial',
		fill: 'white'
	});
	Interface.canvas.add(winText);
	Interface.canvas.renderAll();
	
	window.clearInterval(Game.updatePhysics);
	window.clearInterval(Game.updateInterval);

}

Game.update = function(){
	for(var i=0; i < Game.aiPlayers.length; i++) {
		Game.aiPlayers[i].move();
	
		for(var j=0; j < Game.aiPlayers[i].fleets.length; j++) {
			Game.aiPlayers[i].fleets[j].update();
		}
	}
	
	for(var i=0; i < Game.player.fleets.length; i++) {
		Game.player.fleets[i].update();
	}
	
	for(var i=0; i < Game.planets.length; i++) {
		Game.planets[i].update();
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
			radius: 2, 
			fill: 'rgba(255, 255, 255, 0.2)', 
			left: Math.random() * Interface.width, 
			top: Math.random() * Interface.height
		});
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
		Game.planets[i+1].population = Game.AI_INITIAL_POP;
		Game.planets[i+1].changeOwner(Game.aiPlayers[i]);
	}
	Game.planets[0].changeOwner(Game.player);
	Game.planets[0].population = Game.PLAYER_INITIAL_POP;

	Interface.canvas.renderAll();
}