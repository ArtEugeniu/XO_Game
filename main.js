const gameField = Array(9).fill(0);
const gameGround = document.querySelector('.gameGround');
const winnerText =  document.querySelector('.winnerText');
const winnerBox =  document.querySelector('.winner');
const newGame = document.querySelector('.newGame')
let step = 1;


console.log(gameField);

gameField.forEach((item, index) => {
  const cell = document.createElement('div');
  cell.classList.add('cell')
  cell.setAttribute('data-n', index);
  gameGround.append(cell);
})
const gameGroundCells = document.querySelectorAll('.gameGround>div');


function click(event) {
  const n = +event.target.getAttribute('data-n')
  if (gameField[n] !== 0) return;
  gameField[n] = step;
  console.log(gameField);
  choise();
  isWinner(step);
  step = (step === 1) ? 2 : 1;
}


function choise() {
  gameField.forEach((item, index) => {
    switch(item) {
      case 1: gameGroundCells[index].textContent = 'X'
      break;
      case 2: gameGroundCells[index].textContent = 'O'
    }
  })
}

function isWinner(step) {
  const winnerCase = ['012', '345', '678', '036', '147', '258', '048', '246'];
  let indexStep = [];
  gameField.forEach((item, index) => {
    if (item === step) indexStep.push(index);
  })
  for (let i = 0; i < winnerCase.length; i++) {
    let winPattern = winnerCase[i];
    let count = 0;
    winPattern.split('').forEach(item => {
      if (indexStep.includes(+item)) count++;
    })
    if (count === 3) {
      showWinner(step);
      return
    }
  }
  if (!gameField.includes(0)) {
    showDraw();
  }
}

function showWinner(step) {
  console.log((step === 1 ? 'X' : 'O') + ' is winner!');
  gameGround.removeEventListener('click', click);
  winnerBox.style.width = '700px';
  winnerBox.style.height = '350px';
  winnerBox.style.opacity = '1';
  newGame.style.display = 'block';
  gameGround.style.opacity = .5;
  winnerText.textContent = (step === 1 ? 'X' : 'O') + ' is winner!';
  newGame.addEventListener('click', () => {
    location.reload();
  })
}

function showDraw() {
  console.log('Draw -_-');
  gameGround.removeEventListener('click', click);
  winnerBox.style.width = '700px';
  winnerBox.style.height = '350px';
  winnerBox.style.opacity = '1';
  newGame.style.display = 'block';
  gameGround.style.opacity = .5;
  winnerText.textContent = 'Draw -_-';
  newGame.addEventListener('click', () => {
    location.reload();
  })
}
gameGround.addEventListener('click', click);