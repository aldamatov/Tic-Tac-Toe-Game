import "./index.html";
import "./main.css";

import _ from "lodash";

// Develop below this line
const ROW_LENGTH = 3;
var gameOver = false;
var currentPlayer = "X";
var tileMatrix = [
  [0, 0, 0],
  [0, 0, 0],
  [0, 0, 0],
];
let steps = [];
let currentStep = 0;
let resultArr = [];
document.querySelector(".restart").addEventListener("click", restartGame);

document.addEventListener("click", clickTile);
let stepsContainter = document.querySelector('.steps');

// function declaration below

function restartGame() {
  var arrayOfTD = document.querySelectorAll("td");

  for (let i = 0; i < arrayOfTD.length; i++) {
    arrayOfTD[i].innerHTML = "";
  }

  document.querySelector(".winner-sign").style.top = "-200px";
  let squares = document.querySelectorAll('td');
  for (let i = 0; i < squares.length; i++) {
    squares[i].style.backgroundColor = 'rgba(0, 0, 0, 0)';
    squares[i].style.boxShadow = "0 0 0 rgba(0, 0, 0, 0), 0 0 0 #fff, 0 0 0 rgba(0, 0, 0, 0), 0 0 0 rgba(0, 0, 0, 0), 0 0 0 rgba(0, 0, 0, 0), inset 0 0 0 rgba(0, 0, 0, 0)";
  }

  gameOver = false;
  currentPlayer = "X";
  tileMatrix = [
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0],
  ];
  resultArr = []
  stepsContainter.innerHTML = "";
  steps = [];
}

function clickTile(event) {
  if (
    event.target.nodeName === "TD" &&
    event.target.innerHTML.length === 0 &&
    !gameOver
  ) {
    let theTile = event.target;
    drawOnTile(theTile);
    stepsButtonAppend();
  } else {
    return;
  }
}

function drawOnTile(tile) {
  if(currentStep < steps.length){
    console.log("steps"+steps.length)
    for( let i = steps.length; i > currentStep; i--){
      console.log("Meder")
      let buttonRemove = document.getElementById(steps.length)
      let removebutton = steps.pop();
      buttonRemove.remove();
      tileMatrix[removebutton[0]][removebutton[1]] = 0;
      
    }
  }
 
  tile.innerHTML = currentPlayer;
  tile.style.backgroundColor = 'black';
  // tile.style.opacity = "0.5";
  var tileRow = tile.className[0];
  var tileCol = tile.className[1];
  steps.push([tileRow, tileCol, currentPlayer]);
  currentStep ++;
  tileMatrix[tileRow][tileCol] = currentPlayer;
  

  // here we will check who is the winner
  // checkWinner => boolean
  if (checkWinner(tileRow, tileCol)) {
    drawWinnerPath()
    gameOver = true;
    document.querySelector(
      ".winner-sign"
    ).innerHTML = `The winner is ${currentPlayer}`;
    document.querySelector(".winner-sign").style.top = "calc(50% - 25px)";
    return;
  }

  if (
    !gameOver && steps.length === 9
  ) {
    document.querySelector(
      ".winner-sign"
    ).innerHTML = "Good Game!";
    document.querySelector(".winner-sign").style.top = "calc(50% - 25px)";
    gameOver = true;
  }
  //function for tie
  // function will check if Game over is false and all TD are occupied by Xs or Os

  if (currentPlayer === "X") {
    currentPlayer = "O";
  } else {
    currentPlayer = "X";
  }
}

function stepsButtonAppend(){
  let lastStep = steps[steps.length-1];
  let stepLog = 'Move #' + steps.length + ': Row ' + lastStep[0] + ', Column ' + lastStep[1];
  let button = document.createElement("button");
  button.setAttribute("class", "move-to-btn")
  button.setAttribute("id", steps.length)
  button.innerHTML = stepLog;
  stepsContainter.appendChild(button);
  button.addEventListener("click", function(event) {
    if(currentStep < event.target["id"]){
       moveForward(event)
    }else if(currentStep > event.target["id"]){
      moveBack(event)
    }
  })
}
function moveForward(event){
  console.log("Aiperi", currentStep, " ",event)
  for(let i = Number(currentStep); i < event.target["id"]; i ++){
    let moveForwardsteps = steps[i];
    let moveForwardTd= document.getElementsByClassName(moveForwardsteps[0]+""+moveForwardsteps[1]);
    moveForwardTd[0].innerHTML = moveForwardsteps[2];
    moveForwardTd[0].style.backgroundColor = "black"
  }
  currentStep = event.target["id"];
}
function moveBack(event) {
  resultArr = []
  gameOver = false;
  currentStep = event.target["id"];
  if (currentPlayer === "X") {
    currentPlayer = "O";
  } else  if (currentPlayer === "O") {
    currentPlayer = "X";
  }
  for(let j = steps.length-1; j >= event.target["id"]; j --){
    //step.1: matrix and steps clean
   let currentStepsIndex = steps[j]
  //  tileMatrix[currentStepsIndex[0]][currentStepsIndex[1]] = 0;
   //step.2: button clean
  //  let buttonRemove = document.getElementById(steps.length+1)
  //  buttonRemove.remove();
    //step.3: table.innerHTML clean
  // let tdColorBtnPress = document.querySelectorAll("td");
  let arrayOfTDBtnPress = document.getElementsByClassName(currentStepsIndex[0]+""+currentStepsIndex[1]);
  arrayOfTDBtnPress[0].innerHTML = "";
  arrayOfTDBtnPress[0].style.backgroundColor = 'rgba(255, 255, 255, 0)';
  document.querySelector(".winner-sign").style.top = "-150px";
  arrayOfTDBtnPress[0].style.boxShadow = "0 0 0 rgba(0, 0, 0, 0), 0 0 0 #fff, 0 0 0 rgba(0, 0, 0, 0), 0 0 0 rgba(0, 0, 0, 0), 0 0 0 rgba(0, 0, 0, 0), inset 0 0 0 rgba(0, 0, 0, 0)";
  arrayOfTDBtnPress[0].style.backgroundColor = 'rgba(0, 0, 0, 0)';
  clearWinnerColors()
  }
}
function clearWinnerColors(){
  console.log("clearWinnerC", gameOver)
  if(!gameOver){
    let tdColorBtnPress = document.querySelectorAll("td");
    for(let i = 0; i < 9; i++) {
      console.log(i, tdColorBtnPress[i], tdColorBtnPress[i].innerHTML)
      if(tdColorBtnPress[i].innerHTML !== ""){
        // console.log()
        tdColorBtnPress[i].style.boxShadow = "0 0 0 rgba(0, 0, 0, 0), 0 0 0 #fff, 0 0 0 rgba(0, 0, 0, 0), 0 0 0 rgba(0, 0, 0, 0), 0 0 0 rgba(0, 0, 0, 0), inset 0 0 0 rgba(0, 0, 0, 0)";
        // tdColorBtnPress[i].style.backgroundColor = 'rgba(0, 0, 0, 0)';
        tdColorBtnPress[i].style.backgroundColor = 'black';

      }
    }
  }
}

function checkWinner(tileRow, tileCol) {
let rowArray = [];
let colArray = [];
let leftToRigthArray = [];
let rigthToLeftrArray = [];
  var rowWin = tileMatrix[tileRow].every(function (tile, index) {
    rowArray.push(tileRow+""+index)
    return tile === currentPlayer
  });
  if (!rowWin) {
    rowArray = []
  } 

  var colWin = tileMatrix.every(function (row, index) {
    colArray.push(index +""+tileCol)
    return row[tileCol] === currentPlayer;
  });
  if (!colWin) {
    colArray = []
  } 

  var leftToRightDiagWin = tileMatrix.every(function (row, index) {
    leftToRigthArray.push(index +""+index)
    return row[index] === currentPlayer;
  });
    if (!leftToRightDiagWin) {
    leftToRigthArray = []
  } 

  var rightToLeftDiagWin = tileMatrix.every(function (row, index) {
    rigthToLeftrArray.push(index +""+(ROW_LENGTH-index-1))
    return row[row.length - index - 1] === currentPlayer;
  });
  if (!rightToLeftDiagWin) {
    rigthToLeftrArray = []
  } 
  if (rowWin){
    resultArr = resultArr.concat(rowArray)
  }
  if (colWin){
    resultArr = resultArr.concat(colArray)
  } 
  if (leftToRightDiagWin){
    resultArr = resultArr.concat(leftToRigthArray)
  } 
  if (rightToLeftDiagWin){
    resultArr = resultArr.concat(rigthToLeftrArray)
  }
  return rowWin || colWin || leftToRightDiagWin || rightToLeftDiagWin;
}

function drawWinnerPath() {
  for(let i = 0; i < resultArr.length; i++) {
    let className = resultArr[i];
    console.log(className)
    let path = document.getElementsByClassName(className)
    path[0].style.backgroundColor = "lightgray";
    path[0].style.boxShadow = "0 0 0.2rem #fff, 0 0 0.2rem #fff, 0 0 2rem yellow, 0 0 0.8rem yellow, 0 0 2.8rem #47c8da, inset 0 0 1.3rem yellow";
  }
}
