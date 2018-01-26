'use strict';

function Game(gameParent) { // constructor for gameSession
    var self = this;
    self.placedTowers = [];
    //self.towerRange = [];
    self.enemyArray = [];
    self.gameParent = gameParent;
    self.finshed = false;
    self.ctx;
    self.gameSequence;
    self.frameCounter = 0;
    self.enemyCounter = 0;
    self.waveCounter = 0;
    self.date = Date.now()+1000; //15 seconds to position towers

    // initiate player
    self.player = new Player ();

    // create dom elements
    self.createCanvas();

    // create map
    self.map = new Map ();

    // update frame
    self.updateFrame = function () { 
        self.frameCounter ++;

        // reset frame
        self.ctx.clearRect(0, 0, self.width, self.height);

        // draw background map
        self.map.draw(self.ctx, self.canvasElement.width, self.canvasElement.height);

        // update game objects
        self.createEnemies();
        self.moveEnemies();

        if (self.frameCounter % 70 === 0) { // trigger tower attack
            self.updateGameProcess();
        }

        self.removeEnemies();
        self.updateStats();
        

        // draw towers and range
        for (var i = 0; i < self.placedTowers.length; i++) {
            self.placedTowers[i].drawRange();
            self.placedTowers[i].drawTower();

        }

        // draw enemyArray
        for (var i = 0; i < self.enemyArray.length; i++) {
            self.enemyArray[i].draw();
        }

        self.checkGameEnd ();

        if (!self.finished) {
            window.requestAnimationFrame(self.updateFrame);
        }

    };


    window.requestAnimationFrame(self.updateFrame);
}

Game.prototype.onGameOver = function (callbackFunction) {
    var self = this;
    self.onEnded = callbackFunction;
}

Game.prototype.checkGameEnd = function () {
    var that = this;
    var allWavesPassed = (that.waveCounter === waveLevel.waveEnemies.length - 1) && (that.enemyCounter === waveLevel.waveEnemies[that.waveCounter].length - 1) && that.enemyArray.length === 0;
    if (that.player.healthPoints <= 0 || allWavesPassed === true) { // termination condition
        console.log("Game ended");
        that.onEnded();
    }
}

Game.prototype.updateGameProcess = function () {
    var self =this;
    for (var i=0;i<self.placedTowers.length;i++) // for every tower update enemy hits
    {
    enemyloop:
        for(var enemyCounter = 0; enemyCounter < self.enemyArray.length; enemyCounter++)
        {   var enem = self.enemyArray[enemyCounter];
            var distance = self.placedTowers[i].getDistance(enem.x,enem.y);

            if (distance <= (self.placedTowers[i].sizeRange+enem.r)) { 
                if (self.placedTowers[i].level === 1) {
                    enem.hp -= self.placedTowers[i].damage;
                } 
                else if (self.placedTowers[i].level===2) {
                    enem.hp -= self.placedTowers[i].damage;
                    self.placedTowers[i].drawShot(enem.x, enem.y);
                    break enemyloop; //for a single target
                }
              }
        }
    }       
}

Game.prototype.moveEnemies = function () {
    var self = this;

    // move enemies
    for (var i = 0; i<self.enemyArray.length; i++) {
        self.enemyArray[i].move();
    }
}

Game.prototype.removeEnemies = function () {
    var self = this;
    //remove enemies (dead or reached end of map)
    self.enemyArray.forEach(function (element, index) {
        if(element.hp <= 0) {
            self.player.coins += 25;
            self.enemyArray.splice (index, 1);
        } 
        else if (element.remove === true) {
            self.player.healthPoints --;
            self.enemyArray.splice (index, 1);
        }
    });
}

Game.prototype.updateStats = function () {
    this.ctx.font = '20px Arial, sans-serif';
    this.ctx.fillStyle = 'white';
    this.ctx.fillText('Health Points left: ' + this.player.healthPoints, 10, 50);
    this.ctx.fillText('Enemy Waves left: ' + (waveLevel.waveEnemies.length - this.waveCounter) + "/" + waveLevel.waveEnemies.length, 350, 50);
    this.ctx.fillText('Coins: ' + this.player.coins, 650, 50);
}

Game.prototype.createCanvas = function () {
    var self = this;
    // var gameParent = document.querySelector('#gui');
    var Stats1 = 'Health Points left: ' + self.player.healthPoints;
    var Stats2 = 'Coins: ' + self.player.coins;


    var buttonDiv = document.createElement('div');
    buttonDiv.setAttribute ('class', 'game-buttons');

    var purchaseTower1 = document.createElement('button'); // create container
    purchaseTower1.innerHTML = "<p>Buy Tower1</p><p>Range:Low - Type:Area damage<br>Damage:Low - Price: 50 Coins</p>";
    purchaseTower1.setAttribute('class','tower-button type1');
    //purchaseTower1.setAttribute('onclick','gameSession.player.setTowerClass(1)');
    buttonDiv.appendChild(purchaseTower1);

    var purchaseTower2 = document.createElement('button'); // create container
    purchaseTower2.innerHTML = "<p>Buy Tower2</p><p>Range:High - Type:Single attack<br>Damage:Medium - Price: 200 Coins</p>";
    purchaseTower2.setAttribute('class', 'tower-button type2');
    //purchaseTower2.setAttribute('onclick','gameSession.player.setTowerClass(2)');
    buttonDiv.appendChild(purchaseTower2);
    self.gameParent.appendChild(buttonDiv);
    
    purchaseTower1.addEventListener('click', self.player.setTowerClass.bind(self.player));    
    purchaseTower2.addEventListener('click', self.player.setTowerClass.bind(self.player));


    self.canvasElement = document.createElement('canvas');
    self.canvasElement.width = 800;
    self.canvasElement.height = 700;
    self.gameParent.appendChild(self.canvasElement);
    self.ctx = self.canvasElement.getContext('2d');
};


Game.prototype.destroy = function () {
    var self = this;
    self.finished = true;
    document.querySelector('.type1').removeEventListener('click', self.player.setTowerClass.bind(self.player));
    document.querySelector('.type2').removeEventListener('click', self.player.setTowerClass.bind(self.player));
    document.querySelector('.game-buttons').remove();
    self.canvasElement.remove();
};


Game.prototype.createEnemies = function () {
    var that = this;
    var dateNow = Date.now();
    var dateNextEnemy = that.date + waveLevel.waveTiming[that.waveCounter][that.enemyCounter];
    var lastEnemy = (that.waveCounter === waveLevel.waveEnemies.length - 1) && (that.enemyCounter === waveLevel.waveEnemies[that.waveCounter].length - 1)
    if (dateNow >= dateNextEnemy && lastEnemy === false) {
        var nextEnemy;
        var enemyType = waveLevel.waveEnemies[that.waveCounter][that.enemyCounter];
        var x = waveLevel[enemyType].x;
        var y = waveLevel[enemyType].y;
        var r = waveLevel[enemyType].r;
        var level = waveLevel[enemyType].level;
        var color = waveLevel[enemyType].color;
        var hp = 120 * level;

        nextEnemy = new Enemy(x,y,r,level,color,hp,that.map.waypoint,that.ctx);
        nextEnemy.getNextWaypoint();
        that.enemyArray.push(nextEnemy);

        that.enemyCounter++;
        that.date = Date.now();
    }
    if (that.enemyCounter === waveLevel.waveEnemies[that.waveCounter].length){
        if (that.waveCounter < waveLevel.waveEnemies.length-1) {
            that.waveCounter++;
            that.enemyCounter = 0;
            that.date = Date.now()+5000;
        }
    }

}
   
   

Game.prototype.pushTower = function (x,y) {
    var level = this.player.selectedTower;
    var colorTower = towerTemplate[level].colorTower;
    var colorRange = towerTemplate[level].colorRange;
    var alphaTower = towerTemplate[level].alphaTower;
    var alphaRange = towerTemplate[level].alphaRange;
    var towerRad = towerTemplate[level].sizeTower;
    var rangeRad = towerTemplate[level].sizeRange;
    var damage = towerTemplate[level].damage;

    var towerInstance = new Tower(x,y,towerRad,colorTower,alphaTower,level,damage,rangeRad,colorRange,alphaRange,this.ctx);
    this.placedTowers.push(towerInstance);

   // document.querySelector('.type1').addEventListener('click', self.player.setTowerClass.bind(self.player));
   // document.querySelector('.type2').addEventListener('click', self.player.setTowerClass.bind(self.player));

    this.player.selectedTower = false;
}


Game.prototype.checkPositionTower = function (x,y){ // 
    var self = this;
    var towerSize;
 
    if (this.player.selectedTower === false) { // did player pay for tower?
        return false;
    } else
    {   towerSize=towerTemplate[this.player.selectedTower].sizeTower;
        // make more readable
        if ((y <= this.map.waypoint[0].y - this.map.streetWidth / 2 - towerSize) && (x > towerSize && x < this.canvasElement.width - towerSize)
            ||(((y >= this.map.waypoint[0].y + this.map.streetWidth / 2 + towerSize) && (y < this.map.waypoint[3].y - this.map.streetWidth/2 - towerSize)) && (x > towerSize && x < this.map.waypoint[1].x - this.map.streetWidth / 2 - towerSize))    
            ||(((y >= this.map.waypoint[3].y + this.map.streetWidth / 2 + towerSize) && (y < this.map.waypoint[4].y - this.map.streetWidth/2 - towerSize)) && (x < (this.canvasElement.width - towerSize) && x > this.map.waypoint[3].x + this.map.streetWidth / 2 + towerSize))    
            ||(((y >= this.map.waypoint[1].y - this.map.streetWidth / 2) && (y < this.map.waypoint[2].y + this.map.streetWidth / 2)) && (x < (this.canvasElement.width - towerSize) && x > (this.map.waypoint[1].x + this.map.streetWidth / 2 + towerSize)))    
            ||((y >= this.map.waypoint[4].y + this.map.streetWidth / 2 + towerSize) && (x < (this.canvasElement.width - towerSize) && x > towerSize))           
        ) {
            return true;
        } else 
        {
            return false; 
        }
    }
}