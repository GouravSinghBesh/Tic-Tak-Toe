const gameInfo = document.querySelector(".game-info");
const boxes = document.querySelectorAll('.box');
const newGameBtn = document.querySelector(".btn");

let currentPlayer;
let gameGrid;

const winningPositions = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];

//let`s create a function to initailize the game
function initGame(){
    currentPlayer = "X";
    gameGrid= ["","","","","","","","",""];
    //ui update 
    boxes.forEach((box,index)=>{
        box.innerText = "";
        boxes[index].style.pointerEvents = "all";
        box.classList = (`box box${index+1}`);
    })
    newGameBtn.classList.remove("active");
    gameInfo.innerText = `Current Player - ${currentPlayer}`;
   
}

boxes.forEach((box, index)=>{
    box.addEventListener("click",()=>{
        handleClick(index);
    })
});

initGame();

function handleClick(index){
    if(gameGrid[index]===""){
        gameGrid[index] = currentPlayer;
        boxes[index].innerText = currentPlayer;
        boxes[index].style.pointerEvents = "none";
        swapTurn();
        checkGameOver();
    }
}

function swapTurn(){
    if(currentPlayer==="X"){
        currentPlayer = "O";
    }
    else{
        currentPlayer = "X";
    }

    //ui update
    gameInfo.innerText = `Current Player - ${currentPlayer}`;
}

function checkGameOver(){
    let answer = "";
    
    winningPositions.forEach((position)=>{
        //check all  position is non empty and have same value
        if((gameGrid[position[0]] !=="" || gameGrid[position[1]] !=="" || gameGrid[position[2]] !=="") && (gameGrid[position[0]] ===gameGrid[position[1]] && gameGrid[position[1]] ===gameGrid[position[2]])){

            //check if winner is X
            if(gameGrid[position[0]] ==="X"){
                answer = "X";
            }
            else{
                answer = "O";
            }

            boxes.forEach((box)=>{
                box.style.pointerEvents = "none";
            })

            boxes[position[0]].classList.add("win");
            boxes[position[1]].classList.add("win");
            boxes[position[2]].classList.add("win");
            
        }
    })

    //we have winner
    if(answer !== ""){
        gameInfo.innerText = `Winner is - ${answer}`;
        newGameBtn.classList.add("active");
        return;
    }

    //tie condition
    let fillCount = 0;
    gameGrid.forEach((box)=>{
        if(box !== "")
        fillCount++;
    })
    if(fillCount == 9){
        gameInfo.innerText = "Game tied";
        newGameBtn.classList.add("active");
    }

}



newGameBtn.addEventListener("click",initGame);