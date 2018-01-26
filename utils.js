
'use strict';

var utils = {
    drawCircle: function (ctx, x, y, r, color, alpha) { 
        // ctx.save();
        ctx.globalAlpha = alpha;
        ctx.beginPath();
        ctx.arc(x, y, r, 0, (2*Math.PI));
        ctx.fillStyle = color;
        ctx.stroke();
        ctx.fill();
        ctx.globalAlpha = 1;
        // ctx.restore();
    },
    setTower: function (type) {
        
    }
}

