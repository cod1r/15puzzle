'use strict';
let puzzleContainer = document.querySelector('#puzzle');
let puzzle = [];
let locationZero = [-1, -1];
let canRun = true;

function triggerChange(operation) {
  if (!canRun) {
    return;
  }
  switch (operation) {
    case 1:
      if (locationZero[0] + 1 < 4) {
        let element = [...puzzleContainer.children].find(
          element => 
            element.style.gridRowStart === String(locationZero[0] + 1 + 1) && 
            element.style.gridColumnStart === String(locationZero[1] + 1)
        );
        element.style.animation = 'slideUp 0.2s forwards';

        puzzle[locationZero[0]][locationZero[1]] = puzzle[locationZero[0] + 1][locationZero[1]];
        puzzle[locationZero[0] + 1][locationZero[1]] = 0;
        canRun = false;
        setTimeout(() => {
          element.style.gridRowStart = locationZero[0] + 1;
          element.style.gridRowEnd = locationZero[0] + 2;
          element.style.animation = '';
          canRun = true;
          locationZero[0]++;
        }, 200);
      }
      break;
    case 2:
      if (locationZero[0] - 1 >= 0) {
        let element = [...puzzleContainer.children].find(
          element => 
            element.style.gridRowStart === String(locationZero[0] - 1 + 1) && 
            element.style.gridColumnStart === String(locationZero[1] + 1)
        );
        element.style.animation = 'slideDown .2s forwards';
        canRun = false;
        setTimeout(() => {
          element.style.gridRowStart = locationZero[0] + 1;
          element.style.gridRowEnd = locationZero[0] + 2;
          element.style.animation = '';
          canRun = true;
          locationZero[0]--;
        }, 200);
      }
      break;
    case 3:
      if (locationZero[1] + 1 < 4) {
        let element = [...puzzleContainer.children].find(
          element => 
            element.style.gridRowStart === String(locationZero[0] + 1) && 
            element.style.gridColumnStart === String(locationZero[1] + 1 + 1)
        );
        element.style.animation = 'slideLeft .2s forwards';
        canRun = false;
        setTimeout(() => {
          element.style.gridColumnStart = locationZero[1] + 1;
          element.style.gridColumnEnd = locationZero[1] + 2;
          element.style.animation = '';
          canRun = true;
          locationZero[1]++;
        }, 200);
      }
      break;
    case 4:
      if (locationZero[1] - 1 >= 0) {
        let element = [...puzzleContainer.children].find(
          element => 
            element.style.gridRowStart === String(locationZero[0] + 1) && 
            element.style.gridColumnStart === String(locationZero[1] + 1 - 1)
        );
        element.style.animation = 'slideRight .2s forwards';
        canRun = false;
        setTimeout(() => {
          element.style.gridColumnStart = locationZero[1] + 1;
          element.style.gridColumnEnd = locationZero[1] + 2;
          element.style.animation = '';
          canRun = true;
          locationZero[1]--;
        }, 200);
      }
      break;
    default:
      throw Error('unknown operation');
  }
}

window.onkeydown = function (e) {
  switch (e.key) {
    case 'ArrowUp':
      triggerChange(1);
      break;
    case 'ArrowDown':
      triggerChange(2);
      break;
    case 'ArrowLeft':
      triggerChange(3);
      break;
    case 'ArrowRight':
      triggerChange(4);
      break;
    default:
      break;
  }
}

let numberBank = [];
for (let i = 0; i <= 15; i++) {
  numberBank.push(i);
}
for (let i = 0; i < 4; i++) {
  let row = [];
  for (let j = 0; j < 4; j++) {
    let randomNumber = Math.floor(Math.random() * numberBank.length);
    let extractedNum = numberBank[randomNumber];
    numberBank.splice(randomNumber, 1);
    let newEntry = document.createElement('div');
    if (extractedNum !== 0) {
      newEntry.style.display = 'flex';
      newEntry.style.position = 'relative';
      newEntry.style.justifyContent = 'center';
      newEntry.style.alignItems = 'center';
      newEntry.style.borderRadius = '5px';
      newEntry.style.borderColor = 'black';
      newEntry.style.borderWidth = '1px';
      newEntry.style.borderStyle = 'solid';
      newEntry.style.userSelect = 'none';
      newEntry.style.gridRowStart = String(i + 1);
      newEntry.style.gridRowEnd = String(i + 2);
      newEntry.style.gridColumnStart = String(j + 1);
      newEntry.style.gridColumnEnd = String(j + 2);
      newEntry.style.cursor = 'pointer';
      newEntry.innerText = extractedNum;
      newEntry.onclick = function (e) {
        let elementGridRowStart = Number(e.target.style.gridRowStart) - 1;
        let elementGridColumnStart = Number(e.target.style.gridColumnStart) - 1;
        if (elementGridRowStart === locationZero[0] - 1 && elementGridColumnStart === locationZero[1]) {
          triggerChange(2);
        } else if (elementGridRowStart === locationZero[0] + 1 && elementGridColumnStart === locationZero[1]) {
          triggerChange(1);
        } else if (elementGridColumnStart === locationZero[1] - 1 && elementGridRowStart === locationZero[0]) {
          triggerChange(4);
        } else if (elementGridColumnStart === locationZero[1] + 1 && elementGridRowStart === locationZero[0]) {
          triggerChange(3);
        }
      }
    } else {
      locationZero[0] = i;
      locationZero[1] = j;
    }
    puzzleContainer.appendChild(newEntry);
    row.push(extractedNum);
  }
  puzzle.push(row);
}