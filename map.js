'use strict';

// ctx
Map = function () { // object to draw map and set waypoints  -> game / constructor
    //this.ctx = ctx;
    this.streetWidth=50;
    this.waypoint=[
        {x:0,y:150},
        {x:700,y:150},
        {x:700,y:350},
        {x:100,y:350},
        {x:100,y:550},
        {x:300,y:550},
        {x:800,y:550}
    ];
}

Map.prototype.draw= function (ctx,width,height)  {
    ctx.fillStyle = 'green'; // get background
    ctx.fillRect(0,0,width,height);

    ctx.save();
    ctx.beginPath(); //start definition of the boundary of a vector shape
    ctx.strokeStyle='rgb (170,170,170)';
    ctx.lineWidth =this.streetWidth;
    ctx.moveTo ( // begin path
        this.waypoint[0].x,this.waypoint[0].y
    );
    for (var i=0; i<this.waypoint.length;i++) { // define path
        ctx.lineTo(this.waypoint[i].x,this.waypoint[i].y);
    }
    ctx.stroke (); // draw path
    ctx.restore();

    ctx.save();
    ctx.beginPath();
    ctx.strokeStyle='white';
    ctx.lineWidth =1;
    ctx.moveTo (
        this.waypoint[0].x,this.waypoint[0].y
    );
    for (var i=0; i<this.waypoint.length;i++) {
        ctx.lineTo(this.waypoint[i].x,this.waypoint[i].y);
    }
    ctx.stroke ();
    ctx.restore();        
}

Map.prototype.checkPositionTower = function (x,y){ // 
    var towerSize;
 
    if (player.selectedTower===false) { // did player pay for tower?
        return false;
    } else
    {   towerSize=towerTemplate[player.selectedTower].sizeTower;

        if ((y<= this.waypoint[0].y-this.streetWidth/2-towerSize)&& (x>towerSize && x<canvas.width-towerSize)
            ||(((y>=this.waypoint[0].y+this.streetWidth/2+towerSize)&&(y<this.waypoint[4].y-this.streetWidth/2-towerSize))&&(x>towerSize && x<this.waypoint[2].x-this.streetWidth/2-towerSize))    
        ) {
            return true;
        } else 
        {
            return false; 
        }
    }
}
