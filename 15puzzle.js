'use strict';
let puzzleContainer = document.querySelector('#puzzle');

let numberBank = [];
for (let i = 0; i <= 15; i++) {
  numberBank.push(i);
}
let puzzle = [];
for (let i = 0; i < 4; i++) {
  let row = [];
  for (let j = 0; j < 4; j++) {
    let randomNumber = Math.floor((Math.random() * numberBank.length));
    let extractedNum = numberBank[randomNumber];
    row.push(extractedNum);
    numberBank.splice(randomNumber, 1);
    let newEntry = document.createElement('div');
    if (extractedNum !== 0) {
      newEntry.style.display = 'flex';
      newEntry.style.justifyContent = 'center';
      newEntry.style.alignItems = 'center';
      newEntry.style.borderRadius = '5px';
      newEntry.style.borderColor = 'black';
      newEntry.style.borderWidth = '1px';
      newEntry.style.borderStyle = 'solid';
      newEntry.innerText = extractedNum;
    }
    puzzleContainer.appendChild(newEntry);
  }
  puzzle.push(row);
}

let solveButton = document.querySelector('button');