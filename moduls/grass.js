var LivingCreature = require("./LivingCreature");
module.exports = class Grass extends LivingCreature {
    Random =function(arr){
        return arr [Math.floor(Math.random()*arr.length)];
    }
    mul() {
        this.multiply++;
        var newCell = Random(this.chooseCell(0));
        if (this.multiply >= 4 && newCell) {
            var newGrass = new Grass(newCell[0], newCell[1], this.index);
            grassArr.push(newGrass);
            matrix[newCell[1]][newCell[0]] = 1;
            this.multiply = 0;
        }
    }
}