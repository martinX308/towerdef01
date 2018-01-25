'use strict';

var Player = function () { 
    this.coins = 500;
    this.healthPoints = 10;
    this.selectedTower = false;
    this.pricePerTower = {
        1: 100,
        2: 200
    }

}

Player.prototype.setTowerClass = function (event) {
    var type;
    if(event.currentTarget.classList.contains('type1')){
        type=1;
    } else if (event.currentTarget.classList.contains('type2')) {
        type=2;
    }
    // change mouse layout
    // activate tower setup
    // style.cursor = 'pointer';
    if (this.coins >= this.pricePerTower[type])
    { 
        this.selectedTower = type;
        this.coins -= this.pricePerTower[type];
    } else
    {
        //cannot buy tower
    }
}