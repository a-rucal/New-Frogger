// Especifica lo que se debe pintar al cargar el juego
var startGame = function() {
  Game.setBoard(0,new TitleScreen("New Frogger", 
                                  "Press up to start playing",
                                  playGame));
}



var playGame = function() {
    
    /*var fondo = Object.create(Sprite.prototype);
    fondo.x = 0;
    fondo.y = 0;
    fondo.setup("fondo", );
    fondo.step = function(dt){ };
    Game.setBoard(0, fondo);*/
    
    success = false;
    unsuccess = false;
    
    Game.setBoard(0, new Wallpaper());
    
    var board = new GameBoard();  
    
    var agua = new Water();
    board.add(agua);
    var home = new Home();
    board.add(home);
    board.add(new Frog());
    board.add(new Spawner(level1, winGame, loseGame));
    Game.setBoard(1,board);
    
    /* var vehiculo1 = new Car("green");
    board.add(vehiculo1);
    var vehiculo2 = new Car("blue");
    board.add(vehiculo2);
    var vehiculo3 = new Car("yellow");
    board.add(vehiculo3);
    var vehiculo4 = new Car("lorry");
    board.add(vehiculo4);
    var vehiculo5 = new Car("fire");
    board.add(vehiculo5);
    
    var troncoS = new Trunk("trunkS");
    board.add(troncoS);
    var troncoM = new Trunk("trunkM");
    board.add(troncoM);
    var troncoL = new Trunk("trunkL");
    board.add(troncoL);
    
    var tortuga1 = new Tortoise("tortoise1");
    board.add(tortuga1);
    var tortuga2 = new Tortoise("tortoise2");
    board.add(tortuga2);
    
    var frog = new Frog();
    board.add(frog);
    Game.setBoard(1, board);*/
    
    /* Game.setBoard(0,new Starfield(20,0.4,100,true))
    Game.setBoard(1,new Starfield(50,0.6,100))
    Game.setBoard(2,new Starfield(100,1.0,50)); 

    var board = new GameBoard();   
    board.add(new PlayerShip());
    board.add(new Level(level1,winGame));
    Game.setBoard(3,board); */

}

var winGame = function() {
    Game.setBoard(1,new TitleScreen("You win!", 
                                  "Press up to play again",
                                  playGame));
};



var loseGame = function() {
    Game.setBoard(1,new TitleScreen("You lose!", 
                                  "Press up to play again",
                                  playGame));
};


// Indica que se llame al método de inicialización una vez
// se haya terminado de cargar la página HTML
// y este después de realizar la inicialización llamará a
// startGame
window.addEventListener("load", function() {
    Game.initialize("game",sprites,startGame);
});
