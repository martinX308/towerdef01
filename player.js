'use strict';

var Player = function () { 
    this.coins = 500;
    this.healthPoints = 10;
    this.selectedTower = false;
    this.pricePerTower = {
        1: 50,
        2: 200
    }

}

Player.prototype.setTowerClass = function (event) {
    var type;
    if(event.currentTarget.classList.contains('type1')) {
        type = 1;
    } 
    else if (event.currentTarget.classList.contains('type2')) {
        type = 2;
    }

    if (this.coins >= this.pricePerTower[type])
    { 
        this.selectedTower = type;
        this.coins -= this.pricePerTower[type];
    } 
    else {
        //cannot buy tower
    }
}