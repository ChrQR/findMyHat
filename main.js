const prompt = require('prompt-sync')({sigint: true});


class Field {
    constructor(fieldHeight, fieldWidth) {
        this.fieldHeight = fieldHeight;
        this.fieldWidth = fieldWidth;
        this.grid = [];
        this.currentHeight = 0;
        this.currentWidth = 0;
        this.hat = '^';
        this.hole = 'O';
        this.fieldCharacter = '░';
        this.pathCharacter = '*';
    }
    printField() {
        this.prettyGrid = [];
        for (let i = 0; i < this.grid.length; i++) {
            this.prettyGrid.push(this.grid[i].join(''));
        }
        console.log(this.prettyGrid.join('\r\n'));
    }
    generateField() {
        for (let i = 0; i < this.fieldHeight; i++) {
            this.grid.push([]);
            for (let j = 0; j < this.fieldWidth; j++) {
                let tileSelector = Math.floor(Math.random() * 3);
                if (tileSelector < 1) {
                    this.grid[i].push(this.hole);
                } else{
                    this.grid[i].push(this.fieldCharacter);
                }
            }
        }
        this.generatePlayer();
        this.generateHat();
        this.printField();
        this.movePlayer();
    }
    generatePlayer() {
        let playerStart = Math.floor(Math.random() * this.fieldWidth);
        this.grid[0][playerStart] = this.pathCharacter;
        this.currentWidth = playerStart;
    }
    generateHat() {
        this.hatSelector = Math.floor(Math.random() * this.fieldWidth);
        this.grid[this.fieldHeight - 1][this.hatSelector] = this.hat;
    }
    resetField () {
        this.grid = [];
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
        } else if (this.currentHeight > this.fieldHeight) {
            this.outOfBounds();
        } else if (this.currentWidth < 0) {
            this.outOfBounds();
        } else if (this.currentWidth > this.fieldWidth) {
            this.outOfBounds();
        } else {
            this.holeOrHat();
        }
    }
    outOfBounds() {
        console.log('You moved out of bounds!\nGAME OVER');
        this.resetField();
        this.generateField();
    }
    holeOrHat() {
        if (this.grid[this.currentHeight][this.currentWidth] == 'O') {
            console.log('You fell to your death!\nGAME OVER');
        } else if (this.grid[this.currentHeight][this.currentWidth] == '^') {
            console.log('You found your hat!\nYOU WIN!');
        } else {
            return;
        }
        this.resetField();
        this.generateField();
    }
};


const myField = new Field(10, 10);

myField.generateField();