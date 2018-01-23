'use strict';

function Game(gameParent) { // constructor for gameSession
    var self = this;
    self.placedTowers = [];
    self.towerRange = [];
    self.enemyArray = [];
    self.gameParent=gameParent;
    self.finshed=false;
    self.ctx;
    self.gameSequence;
    self.Framecounter=0;

    // create dom elements'
    self.createCanvas();

    // initial fill - create Enemies
    self.createNewWave();



    // update frame
    self.updateFrame = function () { 
        self.Framecounter ++;

        // reset frame
        self.ctx.clearRect(0,0,self.width,self.height);

        // draw background map
        map.draw(self.ctx,self.canvasElement.width,self.canvasElement.height);

        if(self.Framecounter%100===0){
            self.updateGameProcess();
        }
        self.moveEnemies();
        self.updateStats();
        

        // draw towers + range
        for (var i=0;i<self.towerRange.length;i++)
        {
            self.drawCircle(self.towerRange[i].x,self.towerRange[i].y,self.towerRange[i].r,self.towerRange[i].color,self.towerRange[i].alpha);
        }
        for (var i=0;i<self.placedTowers.length;i++)
        {
            self.drawCircle(self.placedTowers[i].x,self.placedTowers[i].y,self.placedTowers[i].r,self.placedTowers[i].color,self.placedTowers[i].alpha);

        }

        // draw enemyArray
        for (var i=0;i<self.enemyArray.length;i++) {
            self.drawCircle(self.enemyArray[i].x,self.enemyArray[i].y,self.enemyArray[i].r,self.enemyArray[i].color,self.enemyArray[i].alpha);
        }


        if (!self.finished) {
            window.requestAnimationFrame(self.updateFrame);
        }
        //closeGameSession();
        //showGameOver();
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
    var self =this;

    for (var i=0;i<self.placedTowers.length;i++) // for every tower update enemy hits
    {
        for(var enemyCounter=0; enemyCounter<self.enemyArray.length;enemyCounter++)
        {   var enem=self.enemyArray[enemyCounter];
            var distance=self.placedTowers[i].getDistance(enem.x,enem.y);

            if (distance <= (self.placedTowers[i].sizeRange+enem.r)) { 
                enem.hp -= self.placedTowers[i].damage;
                // return; for a single target
              }
        }
    }


       
}

Game.prototype.moveEnemies=function () {
    var self=this;

    // move enemies
    for (var i=0;i<self.enemyArray.length;i++) {
        self.enemyArray[i].move();
    }

    //remove enemies (dead or reached end of map)
    self.enemyArray.forEach(function(element,index)
    {
        if(element.hp<=0){
            player.coins+=element.level*25;
            self.enemyArray.splice(index,1);
        } else if (element.remove===true) {
            player.healthPoints --;
            self.enemyArray.splice(index,1);
        }

    });
}

Game.prototype.updateStats = function (){
    this.ctx.font = '20px Arial, sans-serif';
    this.ctx.fillStyle = 'white';
    this.ctx.fillText('Health Points left: '+player.healthPoints,  10, 50);
    this.ctx.fillText('Coins: '+player.coins,  650, 50);
}

Game.prototype.createCanvas = function (){
    // var gameParent = document.querySelector('#gui');
    var Stats1='Health Points left: '+player.healthPoints;
    var Stats2= 'Coins: '+player.coins;

    // var gameStatus = document.createElement('div');
    // gameStatus.setAttribute('class','displayStatus');
    // var playerStats = document.createElement ('p');
    // playerStats.innerHTML='<span class="Stats1">'+Stats1+'</span><span class="Stats2">'+Stats2+'</span>';
    // gameStatus.appendChild(playerStats);
    // this.gameParent.appendChild(gameStatus);

    var buttonDiv =document.createElement('div');
    buttonDiv.setAttribute('class','game-buttons')

    var purchaseTower1=document.createElement('button'); // create container
    purchaseTower1.innerHTML = "<p>Buy Tower1</p><p>Range:Low - Type:Area damage<br>Damage:Low - Attack frequency:Low</p>";
    purchaseTower1.setAttribute('class','tower-button');
    purchaseTower1.setAttribute('onclick','player.setTowerClass(1)');
    buttonDiv.appendChild(purchaseTower1);

    var purchaseTower2=document.createElement('button'); // create container
    purchaseTower2.innerHTML = "<p>Buy Tower2</p><p>Range:High - Type:Single attack<br>Damage:Medium - Attack frequency:high</p>";
    purchaseTower2.setAttribute('class','tower-button');
    purchaseTower2.setAttribute('onclick','player.setTowerClass(2)');
    buttonDiv.appendChild(purchaseTower2);
    this.gameParent.appendChild(buttonDiv);


    this.canvasElement = document.createElement('canvas');
    this.canvasElement.width = 800;
    this.canvasElement.height = 700;
    this.gameParent.appendChild(this.canvasElement);
    this.ctx = this.canvasElement.getContext('2d');
};


Game.prototype.destroy = function () {
    var self = this;
    self.finished = true;
    self.canvasElement.remove();
};

Game.prototype.drawCircle= function (x,y,r,color,alpha) { // -> hand over context
    var self= this;
    // self.ctx.save();
    self.ctx.globalAlpha = alpha;
    self.ctx.beginPath();
    self.ctx.arc(x,y,r,0,(2*Math.PI));
    self.ctx.fillStyle =color;
    self.ctx.stroke();
    self.ctx.fill();
    self.ctx.globalAlpha = 1;
    // self.ctx.restore();
};


Game.prototype.createNewWave = function () {
    var that=this;
    var waveObjects =[]
    var intervalCounter=0;
    // for (var i=0; i<waveLevel1.waveArray.length;i++)
    // {

    // }
    var intervalId = setInterval(function () {
        var nextEnemy;
        var enemyType=waveLevel1.waveEnemies[intervalCounter];
        var x= waveLevel1[enemyType].x;
        var y= waveLevel1[enemyType].y;
        var r= waveLevel1[enemyType].r;
        var level= waveLevel1[enemyType].level;
        var color=waveLevel1[enemyType].color;
        var hp =100 * level;

        nextEnemy = new Enemy(x,y,r,level,color,hp);
        nextEnemy.getNextWaypoint();
        that.enemyArray.push(nextEnemy);

        intervalCounter++;
      
        if (intervalCounter === waveLevel1.waveEnemies.length) {
          clearInterval(intervalId);
        }
    }, 2000); // adjust with date()

}      
   

Game.prototype.pushTower = function (x,y) {
    var level=player.selectedTower;
    var colorTower =towerTemplate[level].colorTower;
    var colorRange=towerTemplate[level].colorRange;
    var alphaTower =towerTemplate[level].alphaTower;
    var alphaRange =towerTemplate[level].alphaRange;
    var towerRad =towerTemplate[level].sizeTower;
    var rangeRad =towerTemplate[level].sizeRange;
    var damage =towerTemplate[level].damage;

    var towerInstance = new Tower(x,y,towerRad,colorTower,alphaTower,level,damage,rangeRad);
    this.placedTowers.push(towerInstance);

    var rangeInstance = new Tower(x,y,rangeRad,colorRange,alphaRange,level,damage,0);
    this.towerRange.push(rangeInstance);

    player.selectedTower=false;
}

