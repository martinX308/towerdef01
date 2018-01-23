'use strict';

var player={ // -> constructor
    coins:500,
    healthPoints:10,
    selectedTower:false,
    pricePerTower:{
        1:100,
        2:200
    }

}

player.setTowerClass= function (type){
    // change mouse layout
    // activate tower setup
    // style.cursor = 'pointer';
    if (this.coins >=this.pricePerTower[type])
    { 
        this.selectedTower=type;
        this.coins-=this.pricePerTower[type];
    } else
    {
        //cannot buy tower
    }
}