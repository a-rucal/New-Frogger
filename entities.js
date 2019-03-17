var sprites = {
 blue: { sx: 8, sy: 7, w: 89, h: 47, frames: 1 },
 green: { sx: 109, sy: 5, w: 94, h: 49, frames: 1 },
 yellow: { sx: 213, sy: 5, w: 94, h: 50, frames: 1 },
 fire: { sx: 7, sy: 62, w: 123, h: 45, frames: 1 },
 lorry: { sx: 148, sy: 63, w: 199, h: 45, frames: 1 },
 trunkS: { sx: 271, sy: 172, w: 129, h: 41, frames: 1 },
 trunkM: { sx: 10, sy: 122, w: 191, h: 41, frames: 1 },
 trunkL: { sx: 9, sy: 171, w: 247, h: 41, frames: 1 },
 tortoise: { sx: 0, sy: 288, w: 54, h: 46, frames: 1 },
 frog: { sx: 0, sy: 342, w: 36, h: 32, frames: 1 },
 muerte: { sx: 211, sy: 126, w: 48, h: 35, frames: 4 },
 wallpaper: { sx: 421, sy: 0, w: 548, h: 622, frames: 1 }
};

var OBJECT_PLAYER = 1,
    OBJECT_ENEMY = 2,
    OBJECT_TRANSPORTER = 4,
    OBJECT_HOME = 8;


/// CLASE PADRE SPRITE
var Sprite = function() { }

Sprite.prototype.setup = function(sprite,props) {
  this.sprite = sprite;
  this.merge(props);
  this.frame = this.frame || 0;
  this.w =  SpriteSheet.map[sprite].w;
  this.h =  SpriteSheet.map[sprite].h;
}

Sprite.prototype.merge = function(props) {
  if(props) {
    for (var prop in props) {
      this[prop] = props[prop];
    }
  }
}
Sprite.prototype.draw = function(ctx) {
  SpriteSheet.draw(ctx,this.sprite,this.x,this.y,this.frame);
}

Sprite.prototype.hit = function(damage) {
  this.board.remove(this);
}


// FONDO ESTÁTICO

var Wallpaper = function(){
 
    this.x = 0;
    this.y = 0;
    this.setup("wallpaper",);
    this.step = function(dt){ };
}

Wallpaper.prototype = new Sprite();


// RANA

var Frog = function(){
    
    this.setup("frog", );
    
    this.x = Game.width/2 - this.w / 2;
    this.y = Game.height - 8 - this.h;
    this.vx = 0;
    
    this.step = function(dt) {
        
        if(Game.keys['left']) { this.x = this.x - 40; Game.keys['left'] = false;}
        else if(Game.keys['up']) { this.y = this.y - 48; Game.keys['up'] = false;}
        else if(Game.keys['right']) { this.x = this.x + 40; Game.keys['right'] = false;}
        else if(Game.keys['down']) { this.y = this.y + 48; Game.keys['down'] = false;}
        else { }
        
        //Actualiza la posición x de la Rana cuando es transportada por tortuga o tronco
        this.x += this.vx * dt;
        //Refrescamos para comprobar si seguimos o no encima del transportador
        this.vx = 0;

        if(this.x < 0) { this.x = 0; }
        else if(this.x > Game.width - this.w) { 
            this.x = Game.width - this.w 
        }

        if(this.y < 8) { this.y = 8; }
        else if(this.y > Game.height - 8 - this.h) { 
            this.y = Game.height - 8 - this.h
        }
        
        var transporter = this.board.collide(this,OBJECT_TRANSPORTER);
        if(transporter) {
            if (transporter.desp == 0) {
                this.vx = transporter.speed;
            } else {
                this.vx = -transporter.speed;
            }
        }
        
        var collision = this.board.collide(this,OBJECT_ENEMY);
        if(collision && !transporter) {
            if(this.board.remove(this)) {
                this.board.add(new Death(this.x + this.w/2, this.y + this.h/2));
            }
        }
        
        var home = this.board.collide(this,OBJECT_HOME);
        if(home) {
            success = true;
        }
        
    }
     
}

Frog.prototype = new Sprite();
Frog.prototype.type = OBJECT_PLAYER;


// VEHICULO

var carProps = {
    blue: {
        x: -80,
        y: 480,
        desp: 0,
        int: 4,
        speed: 170
    },
    green: {
        x: 500,
        y: 527,
        desp: 1,
        int: 3.5,
        speed: 200   
    },
    yellow: {
        x: -94,
        y: 430,
        desp: 0,
        int: 3.5,
        speed: 230
    },
    lorry: {
        x: 520,
        y: 386,
        desp: 1,
        int: 5,
        speed: 150
    },
    fire: {
        x: -80,
        y: 337,
        desp: 0,
        int: 4.5,
        speed: 170
    }
}

var Car = function(carType)  { 
    
    this.setup(carType, carProps[carType]);

    this.step = function(dt) {
        //console.log(dt);
        //dt=0.016;
        
        if (this.desp == 0) {
            this.x += this.speed * dt;
        } else {
            this.x -= this.speed * dt;
        }

        if (this.x > Game.width || this.x < -this.w) {
            this.board.remove(this);
        }
    }
}

Car.prototype = new Sprite();
Car.prototype.type = OBJECT_ENEMY;


// TRONCO

var trunkProps = {
    trunkS: {
        x: 530,
        y: 52,
        desp: 1,
        int: 4,
        speed: 40
    },
    trunkM: {
        x: 530,
        y: 146,
        desp: 1,
        int: 3.5,
        speed: 50   
    },
    trunkL: {
        x: 530,
        y: 244,
        desp: 1,
        int: 3.5,
        speed: 30
    }
}

var Trunk = function(trunkType)  { 
    
    this.setup(trunkType, trunkProps[trunkType]);

    this.step = function(dt) {
        //console.log(dt);
        //dt=0.016;
        
        if (this.desp == 0) {
            this.x += this.speed * dt;
        } else {
            this.x -= this.speed * dt;
        }

        if (this.x > Game.width || this.x < -this.w) {
            this.board.remove(this);
        }
    }
}

Trunk.prototype = new Sprite();
Trunk.prototype.type = OBJECT_TRANSPORTER;


// TORTUGA

var tortoiseProps = {
    tortoise1: {
        x: -40,
        y: 95,
        desp: 0,
        int: 4,
        speed: 60
    },
    tortoise2: {
        x: -40,
        y: 195,
        desp: 0,
        int: 3.5,
        speed: 45   
    }
}

var Tortoise = function(tortoiseType)  { 
    
    this.setup("tortoise", tortoiseProps[tortoiseType]);

    this.step = function(dt) {
        //console.log(dt);
        //dt=0.016;
        
        if (this.desp == 0) {
            this.x += this.speed * dt;
        } else {
            this.x -= this.speed * dt;
        }

        if (this.x > Game.width || this.x < -this.w) {
            this.board.remove(this);
        }
    }
}

Tortoise.prototype = new Sprite();
Tortoise.prototype.type = OBJECT_TRANSPORTER;


// AGUA

var Water = function() { 
    
    this.x = 0;
    this.y = 52;
    this.w = 548;
    this.h = 200;
    this.step = function(dt){ };
    this.draw = function(ctx) { };
}

Water.prototype = new Sprite();
Water.prototype.type = OBJECT_ENEMY;


///// MUERTE

var Death = function(centerX,centerY) {
  this.setup('muerte', { frame: 0 });
  this.x = centerX - this.w/2;
  this.y = centerY - this.h/2;
  this.subFrame = 0;
};

Death.prototype = new Sprite();

Death.prototype.step = function(dt) {
  this.frame = Math.floor(this.subFrame++ / 8);
  if(this.subFrame >= 32) {
    this.board.remove(this);
    unsuccess = true;
  }
};


///// HOME

var Home = function () {
    this.x = 0;
    this.y = 0;
    this.w = Game.width;
    this.h = 52;
    this.step = function (dt) { };
    this.draw = function (ctx) { };
 };

Home.prototype = new Sprite();
Home.prototype.type = OBJECT_HOME;