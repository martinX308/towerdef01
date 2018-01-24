'use strict';

function Tower (x,y,r,color,alpha,level,damage,sizeRange) {
    this.x=x;
    this.y=y;
    this.r=r;
    this.color=color;
    this.alpha=alpha;
    this.level=level;
    this.damage=damage;
    this.sizeRange=sizeRange;

}

Tower.prototype.getDistance= function (enimyX,enimyY) {
    var xDistance=enimyX-this.x;
    var yDistance=enimyY-this.y;
    var distanceCircles=Math.sqrt(Math.pow(xDistance,2)+Math.pow(yDistance,2));
    return distanceCircles;
}






var towerTemplate ={
    1: {//Type 1
        colorTower:'black',
        alphaTower:1,
        sizeTower:10,
        colorRange:'orange',
        alphaRange:0.3,
        sizeRange:90,
        damage:30
    },
    2: {//Type 2
        colorTower:'brown',
        alphaTower:1,
        sizeTower:20,
        colorRange:'orange',
        alphaRange:0.3,
        sizeRange:60,
        damage:80
    }
}




function checkPositionTower (x,y){ // -> map?
    var towerSize;
 
    if (player.selectedTower===false) { // did player pay for tower?
        return false;
    } else
    {   towerSize=towerTemplate[player.selectedTower].sizeTower;

        if ((y<= map.waypoint[0].y-map.streetWidth/2-towerSize)&& (x>towerSize && x<canvas.width-towerSize)
            ||(((y>=map.waypoint[0].y+map.streetWidth/2+towerSize)&&(y<map.waypoint[4].y-map.streetWidth/2-towerSize))&&(x>towerSize && x<map.waypoint[2].x-map.streetWidth/2-towerSize))    
        ) {
            return true;
        } else 
        {
            return false; 
        }
    }
}