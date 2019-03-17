var level1 = [
 // Start, Gap,  Type,   Override
  [ 0, 2000, 'green' ],
  [ 0, 3000, 'blue' ],
  [ 0, 2000, 'yellow' ],
  [ 0, 4000, 'fire' ],
  [ 0, 5000, 'lorry'],
  [ 0, 7000, 'trunkS'],
  [ 0, 8000, 'trunkM'],
  [ 0, 15000, 'trunkL'],
  [ 0, 3000, 'tortoise1'],
  [ 0, 4000, 'tortoise2'],
]; 

var setEnemy = ['green', 'blue', 'yellow', 'fire', 'lorry'];
var setTransporter = ['trunkS', 'trunkM','trunkL'];

var Spawner = function(levelData,callback1, callback2) {
    this.levelData = [];
    for(var i = 0; i < levelData.length; i++) {
        this.levelData.push(Object.create(levelData[i]));
    }
    this.t = 0;
    this.callback1 = callback1;
    this.callback2 = callback2;
}

Spawner.prototype.draw = function(ctx) { }

Spawner.prototype.step = function(dt) {
    var idx = 0, remove = [], curShip = null;
 
    // Update the current time offset
    this.t += dt * 1000;

    //  Example levelData 
    //   Start, End,  Gap, Type,   Override
    // [[ 0,     4000, 500, 'step', { x: 100 } ]
    while((curShip = this.levelData[idx]) && !success && !unsuccess) {
        // Check if past the end time 
        if(curShip[0] < this.t) {
          // Get the enemy definition blueprint
          var override = curShip[3];

          // Add a new enemy with the blueprint and override
          if (setEnemy.includes(curShip[2])){
              this.board.add(new Car(curShip[2],override));
          }else if (setTransporter.includes(curShip[2])){
              this.board.addFirst(new Trunk(curShip[2],override));      
          }else{
              this.board.addFirst(new Tortoise(curShip[2],override));
          }

          // Increment the start time by the gap
          curShip[0] += curShip[1];
        }
        idx++;
    }
    
    if (success) {
        if(this.callback1) this.callback1();
    }else if (unsuccess){
        if(this.callback2) this.callback2();
    }
    // Remove any objects from the levelData that have passed
    /*for(var i = 0, len = remove.length; i < len; i++) {
        var idx = this.levelData.indexOf(remove[i]);
        if(idx != -1) this.levelData.splice(idx,1);
    }

    // If there are no more enemies on the board or in 
    // levelData, this level is done
    if(this.levelData.length == 0 && this.board.cnt[OBJECT_ENEMY] == 0) {
    if(this.callback) this.callback();
    }*/
}