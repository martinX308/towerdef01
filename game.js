'use strict';

function Game(gameParent) { // constructor for gameSession
    var self = this;
    self.placedTowers = [];
    //self.towerRange = [];
    self.enemyArray = [];
    self.gameParent=gameParent;
    self.finshed=false;
    self.ctx;
    self.gameSequence;
    self.frameCounter=0;
    self.enemyCounter=0;
    self.date = Date.now()+15000; //15 seconds to position towers

    // initiate player
    self.player= new Player ();

    // create dom elements
    self.createCanvas();

    // create map
    self.map= new Map ();

     // initial fill - create Enemies
    // self.createNewWave();

    // update frame
    self.updateFrame = function () { 
        self.frameCounter ++;

        // reset frame
        self.ctx.clearRect(0,0,self.width,self.height);

        // draw background map
        self.map.draw(self.ctx,self.canvasElement.width,self.canvasElement.height);

        // update game objects
        self.createEnemies();
        if(self.frameCounter%100===0){
            self.updateGameProcess();
        }
        self.moveEnemies();
        self.updateStats();
        

        // draw towers and range
        for (var i=0;i<self.placedTowers.length;i++)
        {
            self.placedTowers[i].drawRange();
            self.placedTowers[i].drawTower();

        }

        // draw enemyArray
        for (var i=0;i<self.enemyArray.length;i++) {
            self.enemyArray[i].draw();
        }

        if (self.player.healthPoints<=0) // termination condition
        {
            console.log("1st ending condition");
            closeGameSession();
            self.showGameOver();
        }
        if (!self.finished) {
            window.requestAnimationFrame(self.updateFrame);
        }

    };


    window.requestAnimationFrame(self.updateFrame);
}



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
            self.player.coins+=element.level*25;
            self.enemyArray.splice(index,1);
        } else if (element.remove===true) {
            self.player.healthPoints -= element.level;
            self.enemyArray.splice(index,1);
        }

    });
}

Game.prototype.updateStats = function (){
    this.ctx.font = '20px Arial, sans-serif';
    this.ctx.fillStyle = 'white';
    this.ctx.fillText('Health Points left: '+ this.player.healthPoints,  10, 50);
    this.ctx.fillText('Coins: '+ this.player.coins,  650, 50);
}

Game.prototype.createCanvas = function (){
    // var gameParent = document.querySelector('#gui');
    var Stats1 = 'Health Points left: '+ this.player.healthPoints;
    var Stats2 = 'Coins: '+ this.player.coins;


    var buttonDiv =document.createElement('div');
    buttonDiv.setAttribute ('class','game-buttons')

    var purchaseTower1=document.createElement('button'); // create container
    purchaseTower1.innerHTML = "<p>Buy Tower1</p><p>Range:Low - Type:Area damage<br>Damage:Low - Attack frequency:Low</p>";
    purchaseTower1.setAttribute('class','tower-button type1');
    //purchaseTower1.setAttribute('onclick','gameSession.player.setTowerClass(1)');
    buttonDiv.appendChild(purchaseTower1);

    var purchaseTower2=document.createElement('button'); // create container
    purchaseTower2.innerHTML = "<p>Buy Tower2</p><p>Range:High - Type:Single attack<br>Damage:Medium - Attack frequency:high</p>";
    purchaseTower2.setAttribute('class','tower-button type2');
    //purchaseTower2.setAttribute('onclick','gameSession.player.setTowerClass(2)');
    buttonDiv.appendChild(purchaseTower2);
    this.gameParent.appendChild(buttonDiv);
    
    utils.setTower = this.player.setTowerClass.bind(this.player);
    document.querySelector('.type1').addEventListener('click',utils.setTower);
    document.querySelector('.type2').addEventListener( 'click',utils.setTower);


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


Game.prototype.createEnemies = function () {
    var that=this;
    var dateNow= Date.now();
    var dateNextEnemy = that.date + waveLevel1.waveTiming[that.enemyCounter];
    if (dateNow >= dateNextEnemy) {
        var nextEnemy;
        var enemyType=waveLevel1.waveEnemies[that.enemyCounter];
        var x= waveLevel1[enemyType].x;
        var y= waveLevel1[enemyType].y;
        var r= waveLevel1[enemyType].r;
        var level= waveLevel1[enemyType].level;
        var color=waveLevel1[enemyType].color;
        var hp =150 * level;

        nextEnemy = new Enemy(x,y,r,level,color,hp,that.map.waypoint,that.ctx);
        nextEnemy.getNextWaypoint();
        that.enemyArray.push(nextEnemy);

        that.enemyCounter++;
        that.date=Date.now();
    }
}

// Game.prototype.createNewWave = function () {
//     var that=this;
//     var waveObjects =[]
//     var intervalCounter=0;
//     // for (var i=0; i<waveLevel1.waveArray.length;i++)
//     // {

//     // }

//     var intervalId = setInterval(function () {
//         var nextEnemy;
//         var enemyType=waveLevel1.waveEnemies[intervalCounter];
//         var x= waveLevel1[enemyType].x;
//         var y= waveLevel1[enemyType].y;
//         var r= waveLevel1[enemyType].r;
//         var level= waveLevel1[enemyType].level;
//         var color=waveLevel1[enemyType].color;
//         var hp =100 * level;

//         nextEnemy = new Enemy(x,y,r,level,color,hp,that.map.waypoint,that.ctx);
//         nextEnemy.getNextWaypoint();
//         that.enemyArray.push(nextEnemy);

//         intervalCounter++;
      
//         if (intervalCounter === waveLevel1.waveEnemies.length) {
//           clearInterval(intervalId);
//         }
//     }, 2000); // adjust with date()

// }      
   

Game.prototype.pushTower = function (x,y) {
    var level=this.player.selectedTower;
    var colorTower =towerTemplate[level].colorTower;
    var colorRange=towerTemplate[level].colorRange;
    var alphaTower =towerTemplate[level].alphaTower;
    var alphaRange =towerTemplate[level].alphaRange;
    var towerRad =towerTemplate[level].sizeTower;
    var rangeRad =towerTemplate[level].sizeRange;
    var damage =towerTemplate[level].damage;

    var towerInstance = new Tower(x,y,towerRad,colorTower,alphaTower,level,damage,rangeRad,colorRange,alphaRange,this.ctx);
    this.placedTowers.push(towerInstance);


    this.player.selectedTower=false;
}

Game.prototype.checkPositionTower = function (x,y){ // 
    var towerSize;
 
    if (this.player.selectedTower===false) { // did player pay for tower?
        return false;
    } else
    {   towerSize=towerTemplate[this.player.selectedTower].sizeTower;

        if ((y<= this.map.waypoint[0].y-this.map.streetWidth/2-towerSize)&& (x>towerSize && x<this.canvasElement.width-towerSize)
            ||(((y>=this.map.waypoint[0].y+this.map.streetWidth/2+towerSize)&&(y<this.map.waypoint[3].y-this.map.streetWidth/2-towerSize))&&(x>towerSize && x<this.map.waypoint[1].x-this.map.streetWidth/2-towerSize))    
            ||(((y>=this.map.waypoint[3].y+this.map.streetWidth/2+towerSize)&&(y<this.map.waypoint[4].y-this.map.streetWidth/2-towerSize))&&(x< (this.canvasElement.width-towerSize) && x>this.map.waypoint[3].x + this.map.streetWidth/2 + towerSize))    
            ||(((y>=this.map.waypoint[1].y-this.map.streetWidth/2)&&(y<this.map.waypoint[2].y+this.map.streetWidth/2)) && (x< (this.canvasElement.width-towerSize) && x>(this.map.waypoint[1].x + this.map.streetWidth/2 + towerSize)))    
            ||((y>=this.map.waypoint[4].y+this.map.streetWidth/2+towerSize)&&(x< (this.canvasElement.width-towerSize) && x>towerSize))           
        ) {
            return true;
        } else 
        {
            return false; 
        }
    }
}