'use strict';

function Game(gameParent) { // constructor for gameSession
    var self = this;
    self.towers = [];
    self.towerRange = [];
    self.enimies = [];
    self.gameParent=gameParent;
    self.finshed=false;
    self.ctx;

    // create dom elements'
    self.createCanvas();
   // self.updateFrame();
    
    //stored data
   // self.mapEntities.create(100,100,20,'blue',1);


   self.updateFrame = function () { 
    // reset frame
    self.ctx.clearRect(0,0,self.width,self.height);
    // draw background map
    map.draw(self.ctx,self.canvasElement.width,self.canvasElement.height);
    
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
    // self.ctx.globalAlpha = alpha;
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
    var newEnemy;
    // for (var i=0; i<waveLevel1.waveArray.length;i++)
    // {

    // }
    newEnemy = new Enemy (100,100,20);
    this.enimies.push(newEnemy);
}

