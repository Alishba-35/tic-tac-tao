let boxes = document.querySelectorAll(".box");
let reset = document.querySelector("#reset");
let newgame = document.querySelector("#newbtn");
let container = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");
let playerX = true;
let names1 = prompt("enter your name");
let names2 = prompt("enter your name");
let count = 0;
let pattern = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 4, 8],
  [2, 4, 6],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
];
//player trun
boxes.forEach((box) => {
  box.addEventListener("click", () => {
    if (playerX == true) {
      box.style.color = "PINK";
      box.innerText = "X";
      playerX = false;
      console.log(`now it ${names2} turn`);
      msg.innerText = `now it ${names2} turn`;
      container.classList.remove("hide");
      count++;
    } else {
      box.innerText = "O";
            box.style.color = "orange";
      playerX = true;
      console.log(`" now its ${names1} turn"`);
      msg.innerText = `" now its ${names1} turn"`;
      container.classList.remove("hide");
      count++;
    }
    box.disabled = true;
    checkwinner();
  });
});

const disbtn = () => {
  for (let btndis of boxes) {
    btndis.disabled = true;
  }
};
const showwinner = (winner) => {
  msg.innerText = `"congratulation" winner is player ${winner}`;
  container.classList.remove("hide");
  disbtn();
};

// const checkDraw=()=>{
// boxes.addEventListener(("click")=>{

// })
// }
// const checkDraw = () => {
//   let allFilled = [...boxes].every(box => box.innerText !== "");
//   if (allFilled) {
//     msg.innerText = "😐 It's a draw!";
//     container.classList.remove("hide");
//     disableBoxes();
//   }
// };

let win = true;
const checkwinner = () => {
  for (let winptr of pattern) {
    let pos1 = boxes[winptr[0]].innerText;
    let pos2 = boxes[winptr[1]].innerText;
    let pos3 = boxes[winptr[2]].innerText;
    if (pos1 !== "" && pos2 !== "" && pos3 !== "") {
      if (pos1 === pos2 && pos2 === pos3) {
        console.log("winner", pos1);

        showwinner(pos1);
      } else if (count=== 9 && (pos1 !== pos2 && pos2 !== pos3)) {
        msg.innerText = "😐 It's a draw!";
        container.classList.remove("hide");
      }
      // else if(pos1===pos2&&pos2!==pos3){
      //    checkDraw();
      // }
    }
  }
};
reset.addEventListener("click", () => {
  boxes.forEach((boxes) => {
    boxes.innerText = "";
    boxes.disabled = false;
    container.classList.add("hide");
    msg.innerText = "";
  });
});
