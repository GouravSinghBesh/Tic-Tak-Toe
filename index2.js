const gameInfo = document.querySelector(".game-info");
const boxes = document.querySelectorAll(".box");
const newGameBtn = document.querySelector(".btn");

let currentPlayer;
let gameGrid;
const winningPositions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

//create a function to initailize a game
function initGame() {
    currentPlayer = "X";
    gameGrid = ["", "", "", "", "", "", "", "", ""];
    gameInfo.innerText = `Current player - ${currentPlayer}`;
    boxes.forEach((box, index) => {
        box.innerText = "";
        box.classList = (`box box${index + 1}`);
        boxes[index].style.pointerEvents = "all";
    })
    newGameBtn.classList.remove("active");
}

boxes.forEach((box, index) => {
    box.addEventListener("click", () => {
        handleClick(index);
    })
});

initGame();

function swapTurn() {
    if (currentPlayer === "X") {
        currentPlayer = "O";
    }
    else {
        currentPlayer = "X";
    }

    //ui update
    gameInfo.innerText = `Current player - ${currentPlayer}`;
}

function checkGameOver() {
    let winner = "";
    winningPositions.forEach((position) => {
        if ((gameGrid[position[0]] !== "" || gameGrid[position[1]] !== "" || gameGrid[position[2]] !== "") && (gameGrid[position[0]] === gameGrid[position[1]] && gameGrid[position[1]] === gameGrid[position[2]])) {
            //check if winner is X or O
            if (gameGrid[position[0]] === "X")
                winner = "X";
            else
                winner = "O";

            boxes.forEach((box) => {
                box.style.pointerEvents = "none";
            })

            boxes[position[0]].classList.add("win");
            boxes[position[1]].classList.add("win");
            boxes[position[2]].classList.add("win");

            gameInfo.innerText = `Winner is ${winner}`;
            newGameBtn.classList.add("active");

        }
        else {
            let fillCount = 0;
            gameGrid.forEach((box) => {
                if (box !== "")
                    fillCount++;
            })

            if (fillCount === 9) {
                gameInfo.innerText = "Game Tied";
                newGameBtn.classList.add("active");
            }
        }
    })

    // if(winner!==""){
    //     gameInfo.innerText = `Winner is ${winner}`;
    //     newGameBtn.classList.add("active");
    //     return;
    // }

    // let fillCount = 0;
    // gameGrid.forEach((box)=>{
    //     if(box !=="")
    //     fillCount++;
    // })

    // if(fillCount === 9){
    //     gameInfo.innerText = "Game Tied";
    //     newGameBtn.classList.add("active");
    // }
}

function handleClick(index) {
    if (gameGrid[index] === "") {
        gameGrid[index] = currentPlayer;
        boxes[index].innerText = currentPlayer;
        swapTurn();
        checkGameOver();
    }

}


newGameBtn.addEventListener("click", initGame);
