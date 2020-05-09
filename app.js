document.addEventListener("DOMContentLoaded", () => {
    const container = document.querySelector(".container");
    const width = 8;
    const squares = [];

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
    //Drag the candies
    squares.forEach(square => square.addEventListener('dragstart', dragStart))
    squares.forEach(square => square.addEventListener('dragend', dragEnd))
    squares.forEach(square => square.addEventListener('dragover', dragOver))
    squares.forEach(square => square.addEventListener('dragenter', dragEnter))
    squares.forEach(square => square.addEventListener('dragleave', dragLeave))
    squares.forEach(square => square.addEventListener('drop', dragDrop))


    function dragStart() {
        console.log(this.id, 'dragstart')
    }
    function dragEnd() {
        console.log(this.id, 'dragend')

    }
    function dragOver() {
        console.log(this.id, 'dragover')

    }
    function dragEnter() {
        console.log(this.id, 'dragenter')

    }
    function dragLeave() {
        console.log(this.id, 'dragleave')

    }
    function dragDrop() {
        console.log(this.id, 'drop')

    }






});