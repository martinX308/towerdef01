'use strict';

Map = function () { // object to draw map and set waypoints  -> game / constructor
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

Map.prototype.draw= function (position,width,height)  {
    position.fillStyle = 'green'; // get background
    position.fillRect(0,0,width,height);

    position.save();
    position.beginPath(); //start definition of the boundary of a vector shape
    position.strokeStyle='rgb (170,170,170)';
    position.lineWidth =this.streetWidth;
    position.moveTo ( // begin path
        this.waypoint[0].x,this.waypoint[0].y
    );
    for (var i=0; i<this.waypoint.length;i++) { // define path
        position.lineTo(this.waypoint[i].x,this.waypoint[i].y);
    }
    position.stroke (); // draw path
    position.restore();

    position.save();
    position.beginPath();
    position.strokeStyle='white';
    position.lineWidth =1;
    position.moveTo (
        this.waypoint[0].x,this.waypoint[0].y
    );
    for (var i=0; i<this.waypoint.length;i++) {
        position.lineTo(this.waypoint[i].x,this.waypoint[i].y);
    }
    position.stroke ();
    position.restore();        
}

