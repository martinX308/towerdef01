'use strict';

var map = { // object to draw map and set waypoints  -> game / constructor
    streetWidth:50,
    waypoint:[
        {x:0,y:150},
        {x:700,y:150},
        {x:700,y:350},
        {x:100,y:350},
        {x:100,y:550},
        {x:300,y:550},
        {x:800,y:550}
    ],
    draw: function (position,width,height)  {
        position.fillStyle = 'green'; // get background
        position.fillRect(0,0,width,height);

        position.save();
        position.beginPath(); //start definition of the boundary of a vector shape
        position.strokeStyle='rgb (170,170,170)';
        position.lineWidth =this.streetWidth;
        position.moveTo ( // begin path
            map.waypoint[0].x,map.waypoint[0].y
        );
        for (var i=0; i<map.waypoint.length;i++) { // define path
            position.lineTo(map.waypoint[i].x,map.waypoint[i].y);
        }
        position.stroke (); // draw path
        position.restore();

        position.save();
        position.beginPath();
        position.strokeStyle='white';
        position.lineWidth =1;
        position.moveTo (
            map.waypoint[0].x,map.waypoint[0].y
        );
        for (var i=0; i<map.waypoint.length;i++) {
            position.lineTo(map.waypoint[i].x,map.waypoint[i].y);
        }
        position.stroke ();
        position.restore();        
    }
}


