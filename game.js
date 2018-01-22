'use strict';

function Game(gameParent) { // constructor for gameSession
    var self = this;
    self.towers = [];
    self.towerRange = [];
    self.enemyArray = [];
    self.gameParent=gameParent;
    self.finshed=false;
    self.ctx;
    self.gameSequence;

    // create dom elements'
    self.createCanvas();
    // self.updateFrame();


    // initial fill
    self.createNewWave();

    //Update game data
    self.updateGameData = function () {
        // move enimies
        for (var i=0;i<self.enemyArray.length;i++) {
            self.enemyArray[i].move();
        }
    

    }

    // update frame
    self.updateFrame = function () { 
        self.updateGameData();
        // reset frame
        self.ctx.clearRect(0,0,self.width,self.height);
        // draw background map
        map.draw(self.ctx,self.canvasElement.width,self.canvasElement.height);
        
        for (var i=0;i<self.enemyArray.length;i++) {
            self.drawCircle(self.enemyArray[i].x,self.enemyArray[i].y,self.enemyArray[i].r,self.enemyArray[i].color,self.enemyArray[i].alpha);
        }

        if (!self.finished) {
            window.requestAnimationFrame(self.updateFrame);
        }
    };


    window.requestAnimationFrame(self.updateFrame);
}

// Game.prototype.updateFrame = function () { 
//     // reset frame
//     this.ctx.clearRect(0,0,this.canvasElement.width,this.canvasElement.height);
//     // draw background map
//     map.draw (this.ctx,this.canvasElement.width,this.canvasElement.height);
  
//     if (!this.finished) {
//         window.requestAnimationFrame(this.updateFrame);
//       }
//     };

Game.prototype.updateGameProcess = function () {

}

Game.prototype.createCanvas = function (){
    // var gameParent = document.querySelector('#gui');
    this.canvasElement = document.createElement('canvas');
    this.canvasElement.width = 800;
    this.canvasElement.height = 600;
    this.gameParent.appendChild(this.canvasElement);
    this.ctx = this.canvasElement.getContext('2d');
    };


Game.prototype.destroy = function () {
    var self = this;
    self.finished = true;
    self.canvasElement.remove();
  };

Game.prototype.drawCircle= function (x,y,r,color,alpha) {
    var self= this;
    // self.ctx.save();
    // self.ctx.globalAlpha = alpha;newEnemy
     self.ctx.beginPath();
     self.ctx.arc(x,y,r,0,(2*Math.PI));
     self.ctx.fillStyle =color;
     self.ctx.stroke();
     self.ctx.fill();
     self.ctx.globalAlpha = 1;
    // self.ctx.restore();
 };


Game.prototype.createNewWave = function () {
    var waveObjects =[]
    var nextEnemy;
    // for (var i=0; i<waveLevel1.waveArray.length;i++)
    // {

    // }
    nextEnemy = new Enemy(100,100,20);
    nextEnemy.getNextWaypoint();
    this.enemyArray.push(nextEnemy);
}

