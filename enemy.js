'use strict';

function Enemy(x,y,r) {
            var self= this;
            this.x=x;
            this.y=y;
            this.r=r;
            this.color='blue;
            this.alpha=1;
            this.level=1;
            this.velocity ={
                velocityX:1,
                velocityY:0
            };
            this.nextWaypoint=false;
}

Enemy.prototype.update = function(){
    self.y++;
    self.x++;
}




waveLevel1 ={
    enemy1: {
        x:100,
        y:100,
        r:20,
        level:2
    },
    enemy2:{
        x:100,
        y:100,
        r:20,
        level:2
    },
    waveArray: ['enemy1','enemy1','enemy2']
}











