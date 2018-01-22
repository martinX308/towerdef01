'use strict';

function Enemy(x,y,r) {
    this.x=x;
    this.y=y;
    this.r=r;
    this.color='blue';
    this.alpha=1;
    this.level=1;
    this.speed=1; // velocity of enemy
    this.velocity ={
        x:1,
        y:1
    };
    this.nextWaypoint=false;
    this.nextWaypointIndex=0;
}

Enemy.prototype.move = function(){
    //check direction and move entity
    var that = this;

    if (that.waypointReached()) 
    {
        if(!that.getNextWaypoint()) {
            //enemy reaches end of game->destroy + reduce live
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
       self.nextWaypoint= Object.assign ({},map.waypoint[self.nextWaypointIndex]);
      
    }
    var oldWaypointX =self.nextWaypoint.x;
    var oldWaypointY = self.nextWaypoint.y;

    self.nextWaypointIndex ++;

    if(map.waypoint.length<=self.nextWaypointIndex) // check for next Waypoint
    { 
        return false;
    } else {
        self.nextWaypoint= Object.assign ({},map.waypoint[self.nextWaypointIndex]);
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
    } else if (oldWaypointy > self.neytWaypoint.y)
    { 
        self.velocity.y= -self.speed;
    }

    return true;
}    







// waveLevel1 ={
//     enemy1: {
//         x:100,
//         y:100,
//         r:20,
//         level:2
//     },
//     enemy2:{
//         x:100,
//         y:100,
//         r:20,
//         level:2
//     },
//     waveArray: ['enemy1','enemy1','enemy2']
// }











