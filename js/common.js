"use-strict";

const can = document.getElementById("can");

const con = can.getContext("2d");
can.width = 1000;
can.height = 500;

let inputKey = [];

let x = 0;
let y = 300;
let vy = 0;
let isJump = false;
let blocks = [
  { x: 0, y: 332, w: 200, h: 32 },
  { x: 250, y: 332, w: 200, h: 32 },
  { x: 500, y: 332, w: 200, h: 32 },
];

window.addEventListener("load", update);

window.addEventListener("keydown", handleKeydown);

function handleKeydown(e) {
  inputKey.push(e.key);
  // if (inputKey.slice(-1)[0] == "ArrowRight") console.log("成功");
  inputKey[e.key] = true;
}

window.addEventListener("keyup", handleKeyup);
function handleKeyup(e) {
  inputKey[e.key] = false;
}

function update() {
  let updatedX = x;
  let updatedY = y;
  con.clearRect(0, 0, 9999, 9999); //.clearRect(x,y,width,height)はwidth・heightの範囲内の前の情報を消す

  let imageright = new Image();
  imageright.src = "../images/boy1.png";
  con.drawImage(imageright, x, y, 32, 32);

  let groundImage = new Image();
  groundImage.src = "../images/background.png";
  for (const block of blocks) {
    con.drawImage(groundImage, block.x, block.y, block.w, block.h);
  }

  if (inputKey["ArrowRight"]) updatedX = x + 2;

  if (inputKey["ArrowLeft"]) updatedX = x - 2;

  if (inputKey["ArrowUp"]) {
    isJump = true;
    vy = -7;
  }

  if (inputKey["ArrowDown"]) y++;

  if (isJump == true) {
    updatedY = y + vy;
    vy += 0.5;

    if (updatedY <= 200) {
      // vy -= 0;
      updatedY = 200 + vy;
    }

    //if (updatedY > 300) updatedY = 300; //ここを修正する

    if (y + 32 < 332 && updatedY + 32 >= 332) {
      for (const block of blocks) {
        if (
          (x + 32 < block.x || x >= block.x + block.w) &&
          (updatedX + 32 < block.x || updatedX >= block.x + block.w)
        ) {
          continue;
        }
        updatedY = 300 + 32 - 32;
        isJump = false;
        break;
      }
    }
  } else {
    let isSomeblock = false;
    for (const block of blocks) {
      if (
        (x + 32 < block.x || x >= block.x + block.w) &&
        (updatedX + 32 < block.x || updatedX >= block.x + block.w)
      ) {
        continue;
      }
      isSomeblock = true;
      break;
    }
    if (isSomeblock == false) {
      isJump = true;
      vy = 0;
    }
  }

  x = updatedX;
  y = updatedY;

  window.requestAnimationFrame(update);
}
