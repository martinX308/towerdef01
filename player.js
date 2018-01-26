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
    var self = this;
    var type;
    if(event.currentTarget.classList.contains('type1')) {
        type = 1;
    } 
    else if (event.currentTarget.classList.contains('type2')) {
        type = 2;
    }

    if (this.coins >= this.pricePerTower[type]) { 
        this.selectedTower = type;
        this.coins -= this.pricePerTower[type];
        //document.querySelector('.type1').removeEventListener('click', self.player.setTowerClass.bind(self.player));
        //document.querySelector('.type2').removeEventListener('click', self.player.setTowerClass.bind(self.player));
    } 
    else {
        //cannot buy tower
    }
}