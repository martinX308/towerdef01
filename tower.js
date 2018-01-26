'use strict';


function Tower (x,y,r,color,alpha,level,damage,sizeRange,colorRange,alphaRange,ctx) {
    this.x=x;
    this.y=y;
    this.r=r;
    this.color=color;
    this.alpha=alpha;
    this.level=level;
    this.damage=damage;
    this.sizeRange=sizeRange;
    this.colorRange=colorRange;
    this.alphaRange=alphaRange;
    this.ctx=ctx;

}

Tower.prototype.getDistance= function (enimyX,enimyY) {
    var xDistance=enimyX-this.x;
    var yDistance=enimyY-this.y;
    var distanceCircles=Math.sqrt(Math.pow(xDistance,2)+Math.pow(yDistance,2));
    return distanceCircles;
}

Tower.prototype.drawTower = function () {
    utils.drawCircle (this.ctx, this.x, this.y, this.r, this.color, this.alpha);
}

Tower.prototype.drawRange = function () {
    utils.drawCircle (this.ctx, this.x, this.y, this.sizeRange, this.colorRange, this.alphaRange);
}


Tower.prototype.drawShot = function (ctx,enimyX,enimyY) {
    ctx.save();
    ctx.beginPath();
    ctx.strokeStyle='white';
    ctx.lineWidth =1;
    ctx.moveTo (
        this.x,this.y
    );
    ctx.lineTo(enemyX,enemyY);
    ctx.stroke ();
    ctx.restore();     
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
        damage:100
    }
}

