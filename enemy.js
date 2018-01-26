'use strict';

// 
function Enemy(x,y,r,level,color,hp,waypoints,ctx) {
    this.ctx = ctx;
    this.waypoints = waypoints;
    this.x=x;
    this.y=y;
    this.r=r;
    this.color=color;
    this.alpha=1;
    this.level=level;
    this.hp=hp;
    this.speed=2; // velocity of enemy
    this.velocity ={
        x:1,
        y:1
    };
    this.nextWaypoint=false;
    this.nextWaypointIndex=0;
    this.remove=false;
}

Enemy.prototype.move = function(){
    //check direction and move entity
    var that = this;

    if (that.waypointReached()) 
    {
        if(!that.getNextWaypoint()) {
            //enemy reaches end of game->destroy  live+ reduce player HP
            this.remove=true;
            return false;
        }
    }
    that.x += that.velocity.x;
    that.y += that.velocity.y;
}
//velocity.x=

Enemy.prototype.waypointReached = function () 
{
    return (
        (this.velocity.x >0 && this.x >=this.nextWaypoint.x)
        ||(this.velocity.y >0 && this.y >=this.nextWaypoint.y)
        ||(this.velocity.x <0 && this.x <=this.nextWaypoint.x)
        ||(this.velocity.y <0 && this.y <=this.nextWaypoint.y)
    );
}

Enemy.prototype.getNextWaypoint = function () //check next Waypoint and adjust movement direction
{   var self = this;

    if(!self.nextWaypoint) // initialize nexWaypoint
    {
       self.nextWaypoint= Object.assign ({},self.waypoints[self.nextWaypointIndex]);
      
    }
    var oldWaypointX =self.nextWaypoint.x;
    var oldWaypointY = self.nextWaypoint.y;

    self.nextWaypointIndex ++;

    if(self.waypoints.length<=self.nextWaypointIndex) // check for next Waypoint
    { 
        return false;
    } else {
        self.nextWaypoint= Object.assign ({},self.waypoints[self.nextWaypointIndex]);
    }

    if (oldWaypointX === self.nextWaypoint.x) // adjust movement on x axis
    { 
        self.velocity.x =0;
    } else if (oldWaypointX < self.nextWaypoint.x)
    { 
        self.velocity.x=self.speed;
    } else if (oldWaypointX > self.nextWaypoint.x)
    { 
        self.velocity.x= -self.speed;
    }

    if (oldWaypointY === self.nextWaypoint.y) // adjust movement on y axis
    { 
        self.velocity.y =0;
    } else if (oldWaypointY < self.nextWaypoint.y)
    { 
        self.velocity.y=self.speed;
    } else if (oldWaypointY > self.nextWaypoint.y)
    { 
        self.velocity.y= -self.speed;
    }

    return true;
}    

Enemy.prototype.draw = function () {
    utils.drawCircle (this.ctx, this.x, this.y, this.r, this.color, this.alpha);
}



var waveLevel ={
    enemy1: {
        x:20,
        y:150,
        r:7,
        level:2,
        color:'azure',
        speed:3
    },
    enemy2:{
        x:20,
        y:150,
        r:7,
        level:1,
        color:'white',
        speed:2
    },
    enemy3: {
        x:20,
        y:150,
        r:7,
        level:4,
        color:'blue',
        speed:2.5

    },
    enemy4:{
        x:20,
        y:150,
        r:7,
        level:5,
        color:'brown',
        speed:2
    },
    waveEnemies:[
        ['enemy1','enemy1','enemy1','enemy2','enemy1','enemy2','enemy1','enemy2','enemy2'],
        ['enemy1','enemy1','enemy2','enemy2','enemy2','enemy2','enemy3','enemy2','enemy3','enemy2','enemy3','enemy3','enemy4'],
        ['enemy2','enemy3','enemy1','enemy1','enemy2','enemy2','enemy3','enemy2','enemy3','enemy2','enemy3','enemy3','enemy4'],
        ['enemy1','enemy1','enemy1','enemy1','enemy3','enemy3','enemy4','enemy3','enemy4','enemy3','enemy4','enemy4','enemy4']

    ],
    waveTiming:[
        [5000,3000,3000,2000,4000,2000,1500,2000,2000],
        [500,500,500,500,5000,3000,5000,3000,5000,3000,2000,3000,3000],
        [200,400,300,200,5000,3000,5000,3000,5000,3000,2000,3000,3000],
        [100,300,200,100,5000,3000,5000,3000,5000,3000,2000,3000,3000]
    ]

}












