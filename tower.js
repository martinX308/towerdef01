'use strict';

Game.prototype.towers = {
    list:[],
    size:20,
    idCounter:0,
    create: function (x,y,r,color,alpha) 
    {
        var towerEntity =
        {
            id: ++this.idCounter,
            x:x,
            y:y,
            r:this.size,
            color:'blue',
            alpha:1,
            update: function () {
            }      
        }
        this.list[towerEntity.id] = towerEntity;
        return towerEntity;

    }

};
