'use strict';

var map = { // object to draw map and set waypoints
    streetWidth:50,
    waypoint:[
        {x:0,y:100},
        {x:700,y:100},
        {x:700,y:300},
        {x:100,y:300},
        {x:100,y:500},
        {x:300,y:500},
        {x:800,y:500}
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