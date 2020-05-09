document.addEventListener("DOMContentLoaded", () => {
    const container = document.querySelector(".container");
    const scoreDisplay = document.querySelector('#score');
    const width = 8;
    const squares = [];
    let score = 0;

    const candyColors = [
        'red',
        'blue',
        'purple',
        'yellow',
        'green',
        'orange'

    ]

    //Create Board

    function createBoard() {
        for (let i = 0; i < width * width; i++) {
            const square = document.createElement('div');
            square.setAttribute('draggable', true);//make div draggable
            square.setAttribute('id', i)// set id to div which will be the i from the loop

            let randomColor = Math.floor(Math.random() * candyColors.length); // random number from 0 to 5 
            square.style.backgroundColor = candyColors[randomColor];
            container.appendChild(square);
            squares.push(square);
        }
    }
    createBoard();


    let colorBeingDragged
    let colorBeingReplaced
    let squareIdBeingDragged
    let squareIdBeingReplaced

    //Drag the candies
    squares.forEach(square => square.addEventListener('dragstart', dragStart))
    squares.forEach(square => square.addEventListener('dragend', dragEnd))
    squares.forEach(square => square.addEventListener('dragover', dragOver))
    squares.forEach(square => square.addEventListener('dragenter', dragEnter))
    squares.forEach(square => square.addEventListener('dragleave', dragLeave))
    squares.forEach(square => square.addEventListener('drop', dragDrop))


    function dragStart() {
        colorBeingDragged = this.style.backgroundColor;
        squareIdBeingDragged = parseInt(this.id)
        console.log(this.id, 'dragstart')
        console.log(colorBeingDragged)

    }

    function dragOver(event) {
        event.preventDefault();
        console.log(this.id, 'dragover')

    }
    function dragEnter(event) {
        event.preventDefault();

        console.log(this.id, 'dragenter')

    }
    function dragLeave() {

        console.log(this.id, 'dragleave')

    }
    function dragEnd() {
        console.log(this.id, 'dragend');
        //what is valid  move ?
        let validMoves = [
            squareIdBeingDragged - 1,
            squareIdBeingDragged - width,
            squareIdBeingDragged + 1,
            squareIdBeingDragged + width,

        ]
        let validMove = validMoves.includes(squareIdBeingReplaced);
        if (squareIdBeingReplaced && validMove) {
            squareIdBeingReplaced = null;

        }
        else if (squareIdBeingReplaced && !validMove) {
            squares[squareIdBeingReplaced].style.backgroundColor = colorBeingReplaced;
            squares[squareIdBeingDragged].style.backgroundColor = colorBeingDragged;

        }
        else {
            squares[squareIdBeingDragged].style.backgroundColor = colorBeingDragged
        }

    }
    function dragDrop() {
        console.log(this.id, 'drop')
        colorBeingReplaced = this.style.backgroundColor;
        squareIdBeingReplaced = parseInt(this.id);
        this.style.backgroundColor = colorBeingDragged;
        squares[squareIdBeingDragged].style.backgroundColor = colorBeingReplaced;


    }

    //drop candies once some have been cleared

    function moveDown() {
        for (i = 0; i < 55; i++) {
            if (squares[i + width].style.backgroundColor === '') {
                squares[i + width].style.backgroundColor = squares[i].style.backgroundColor
                squares[i].style.backgroundColor = "";
                const firstRow = [1, 2, 3, 4, 5, 6, 7];
                const isFirstRow = firstRow.includes(i);
                if (isFirstRow && squares[i].style.backgroundColor === "") {
                    let randomColor = Math.floor(Math.random() * candyColors.length);
                    squares[i].style.backgroundColor = candyColors[randomColor];

                }
            }
        }
    }

    //checking matches
    //checking for row of Three
    function checkRowForThree() {
        for (i = 0; i < 61; i++) {
            let rowOfThree = [i, i + 1, i + 2];
            let decidedColor = squares[i].style.backgroundColor
            const isBlank = squares[i].style.backgroundColor === '';
            const notValid = [6, 7, 14, 15, 22, 23, 30, 31, 38, 39, 46, 47, 54, 55]

            if (notValid.includes(i)) continue;

            if (rowOfThree.every(index => squares[index].style.backgroundColor === decidedColor && !isBlank)) {
                score += 3;
                scoreDisplay.innerHTML = score;
                rowOfThree.forEach(index => {
                    squares[index].style.backgroundColor = ''

                })
            }

        }
    }
    checkRowForThree();

    //checking for column of Three
    function checkColumnForThree() {
        for (i = 0; i < 47; i++) {
            let colOfThree = [i, i + width, i + width * 2];
            let decidedColor = squares[i].style.backgroundColor
            const isBlank = squares[i].style.backgroundColor === '';
            if (colOfThree.every(index => squares[index].style.backgroundColor === decidedColor && !isBlank)) {
                score += 3;
                scoreDisplay.innerHTML = score;

                colOfThree.forEach(index => {
                    squares[index].style.backgroundColor = ''

                })
            }

        }
    }
    checkColumnForThree();


    //checking for row of Four
    function checkRowForFour() {
        for (i = 0; i < 60; i++) {
            let rowOfFour = [i, i + 1, i + 2, i + 3];
            let decidedColor = squares[i].style.backgroundColor
            const isBlank = squares[i].style.backgroundColor === '';
            const notValid = [5, 6, 7, 13, 14, 15, 21, 22, 23, 29, 30, 31, 37, 38, 39, 45, 46, 47, 53, 54, 55]

            if (notValid.includes(i)) continue;

            if (rowOfFour.every(index => squares[index].style.backgroundColor === decidedColor && !isBlank)) {
                score += 4;
                scoreDisplay.innerHTML = score;
                rowOfFour.forEach(index => {
                    squares[index].style.backgroundColor = ''

                })
            }

        }
    }
    checkRowForFour();

    //checking for column of Four
    function checkColumnForFour() {
        for (i = 0; i < 47; i++) {
            let colOfFour = [i, i + width, i + width * 2, i + width * 3];
            let decidedColor = squares[i].style.backgroundColor
            const isBlank = squares[i].style.backgroundColor === '';
            if (colOfFour.every(index => squares[index].style.backgroundColor === decidedColor && !isBlank)) {
                score += 4;
                scoreDisplay.innerHTML = score;
                colOfFour.forEach(index => {
                    squares[index].style.backgroundColor = ''

                })
            }

        }
    }
    checkColumnForFour();





    window.setInterval(function () {
        moveDown()
        checkRowForFour();
        checkColumnForFour()
        checkRowForThree();
        checkColumnForThree();

    }, 100)





});