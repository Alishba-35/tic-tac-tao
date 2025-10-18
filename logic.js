// ======= Elements & state =======
let boxes = document.querySelectorAll(".box");
let reset = document.querySelector("#reset");
let newgame = document.querySelector("#newbtn");
let container = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");

// Scoreboard elements
let scoreXEl = document.querySelector("#scoreX");
let scoreOEl = document.querySelector("#scoreO");
let playerXNameEl = document.querySelector("#playerXName");
let playerONameEl = document.querySelector("#playerOName");

let playerX = true; // true => X (names1), false => O (names2)
let names1 = prompt("Enter Player 1 name (X):") || "Player X";
let names2 = prompt("Enter Player 2 name (O):") || "Player O";
let count = 0; // number of moves made

// Scores
let scoreX = 0;
let scoreO = 0;

const pattern = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 4, 8],
  [2, 4, 6],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
];

// ======= Utility functions =======
const showMessage = (text) => {
  msg.innerText = text;
  container.classList.remove("hide");
};

const disableBoxes = () => {
  boxes.forEach((b) => (b.disabled = true));
};

const enableBoxes = () => {
  boxes.forEach((b) => {
    b.innerText = "";
    b.disabled = false;
    b.style.color = ""; // reset color
  });
};

const updateScoreboard = () => {
  scoreXEl.innerText = scoreX;
  scoreOEl.innerText = scoreO;
};

const showWinner = (symbol) => {
  const winnerName = symbol === "X" ? names1 : names2;
  showMessage(`🎉 Congratulations! ${winnerName} wins!`);
  
  // Update scoreboard
  if (symbol === "X") {
    scoreX++;
  } else {
    scoreO++;
  }
  updateScoreboard();

  disableBoxes();
};

// ======= Game initialization / start message =======
const startMessage = () => {
  playerXNameEl.innerText = `${names1} (X)`;
  playerONameEl.innerText = `${names2} (O)`;
  showMessage(`🎮 ${names1} (X) starts first!`);
};
startMessage();

// ======= Box click logic =======
boxes.forEach((box) => {
  box.addEventListener("click", () => {
    if (playerX) {
      box.innerText = "X";
      box.style.color = "pink";
      playerX = false;
      showMessage(`Now it's ${names2}'s (O) turn`);
    } else {
      box.innerText = "O";
      box.style.color = "orange";
      playerX = true;
      showMessage(`Now it's ${names1}'s (X) turn`);
    }

    box.disabled = true;
    count++;
    checkWinner();
  });
});

// ======= Winner / draw checking =======
const checkWinner = () => {
  for (let winptr of pattern) {
    const pos1 = boxes[winptr[0]].innerText;
    const pos2 = boxes[winptr[1]].innerText;
    const pos3 = boxes[winptr[2]].innerText;

    if (pos1 !== "" && pos1 === pos2 && pos2 === pos3) {
      showWinner(pos1);
      return;
    }
  }

  if (count === 9) {
    showMessage("😐 It's a draw!");
    disableBoxes();
  }
};

// ======= Reset (same players, keep score) =======
reset.addEventListener("click", () => {
  enableBoxes();
  playerX = true;
  count = 0;
  startMessage();
});

// ======= New game (new names, reset score) =======
newgame?.addEventListener("click", () => {
  names1 = prompt("Enter Player 1 name (X):") || names1;
  names2 = prompt("Enter Player 2 name (O):") || names2;
  scoreX = 0;
  scoreO = 0;
  updateScoreboard();
  enableBoxes();
  playerX = true;
  count = 0;
  startMessage();
});
