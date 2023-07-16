const prompt = require('prompt-sync')({sigint: true});

const hat = '^';
const hole = 'O';
const fieldCharacter = '░';
const pathCharacter = '*';

class Field {
    constructor(grid) {
        this.grid = grid;
        this.currentHeight = 0;
        this.currentWidth = 0;
    }
    get getPosition() {
        return [this.currentHeight, this.currentWidth];
    }

    printField() {
        this.prettyGrid = [];
        for (let i = 0; i < this.grid.length; i++) {
            this.prettyGrid.push(this.grid[i].join(''));
        }
        console.log(this.prettyGrid.join('\r\n'));
    }
    movePlayer() {
        const movement = prompt('Which way do you want to go? (WASD)');
        if (movement == 's') {
            this.currentHeight += 1;
            this.gameOverCheck();
            this.grid[this.currentHeight][this.currentWidth] = '*';
            this.printField();
        } else if (movement == 'w') {
            this.currentHeight -= 1;
            this.gameOverCheck();
            this.grid[this.currentHeight][this.currentWidth] = '*';
            this.printField();
        } else if (movement == 'd') {
            this.currentWidth += 1;
            this.gameOverCheck();
            this.grid[this.currentHeight][this.currentWidth] = '*';
            this.printField();
        } else if (movement == 'a') {
            this.currentWidth -= 1;
            this.gameOverCheck();
            this.grid[this.currentHeight][this.currentWidth] = '*';
            this.printField();
        }
        this.movePlayer();
    }
    gameOverCheck() {
        if (this.currentHeight < 0) {
            this.outOfBounds();
        } else if (this.currentHeight > 2) {
            this.outOfBounds();
        } else if (this.currentWidth < 0) {
            this.outOfBounds();
        } else if (this.currentWidth > 2) {
            this.outOfBounds();
        } else if (this.grid[this.currentHeight][this.currentWidth] == 'O') {
            this.fallDeath();
        }
    }
    outOfBounds() {
        console.log('You moved out of bounds!\nGAME OVER');
    }
    fallDeath() {
        console.log('You fell to your death!\nGAME OVER')
    }
};


const myField = new Field([
  ['*', '░', 'O'],
  ['░', 'O', '░'],
  ['░', '^', '░'],
]);

myField.printField();
myField.movePlayer();