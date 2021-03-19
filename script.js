"use strict"
const DESK = {
  properties: {
    size: 8,
    matrix: [
      [1 , 2 , 3 , 4 , 5 , 6 , 7 ,  8],
      [9 , 10, 11, 12, 13, 14, 15, 16],
      [17, 18, 19, 20, 21, 22, 23, 24],
      [25, 26, 27, 28, 29, 30, 31, 32],
      [33, 34, 35, 36, 37, 38, 39, 40],
      [41, 42, 43, 44, 45, 46, 47, 48],
      [49, 50, 51, 52, 53, 54, 55, 56],
      [57, 58, 59, 60, 61, 62, 63, 64]
    ],
    solution: [],
  },

  show() {
    let matrix = DESK.properties.matrix;
    let desk = document.createElement("div");
    desk.classList.add("board");
    for(let r = 0; r < matrix.length; r++) {
      for (let c = 0; c < matrix[r].length; c++) {
        let cell = document.createElement("div");
        let value = DESK.properties.solution.indexOf(matrix[r][c]) + 1;
        cell.classList.add("cell", ((r + c) % 2) ? "black" : "white");
        cell.id = value;
        cell.innerHTML = `<div class="value">${value}</div>`;
        desk.appendChild(cell);
      }
    }
    document.body.appendChild(desk);
  },

  solve(x, y) {
    let matrix = this.properties.matrix;
    let sol = this.properties.solution;
    let size = this.properties.size;
    let nextArr = [];
    let nextVal;
    let min = 100;
    let steps = [
      [x + 2, y - 1],
      [x + 2, y + 1],
      [x - 2, y - 1],
      [x - 2, y + 1],
      [x + 1, y - 2],
      [x + 1, y + 2],
      [x - 1, y - 2],
      [x - 1, y + 2],
    ];

    if (sol.length === 0) sol.push(1);
    if (sol.length === size ** 2) {
      this.show();
      return;
    } 

    steps.forEach(b => {
      if (!(b[0] < size && b[0] >= 0 && b[1] < size && b[1] >= 0)) {
        nextArr.push(100);
        return;
      }

      if (sol.indexOf(matrix[b[0]][b[1]]) === -1) {
        nextArr.push(this.checkNext(b[0], b[1]));
      } else {
        nextArr.push(100);
      }
    });

    for(let i = 0; i < nextArr.length; i++) {
      if (nextArr[i] < min) {
        min = nextArr[i];
        nextVal = i;
      }
    }

    sol.push(matrix[steps[nextVal][0]][steps[nextVal][1]]);
    this.solve(steps[nextVal][0], steps[nextVal][1]);
  },

  checkNext(x, y) {
    let matrix = this.properties.matrix;
    let sol = this.properties.solution;
    let size = this.properties.size;
    let ways = 0;
    let steps = [
      [x + 2, y - 1],
      [x + 2, y + 1],
      [x - 2, y - 1],
      [x - 2, y + 1],
      [x + 1, y - 2],
      [x + 1, y + 2],
      [x - 1, y - 2],
      [x - 1, y + 2],
    ];

    steps.forEach(b => {
      if (b[0] < size && b[0] >= 0 
       && b[1] < size && b[1] >= 0) {
        if (sol.indexOf(matrix[b[0]][b[1]]) === -1) {
          ++ways;
        }
      }
    });

    return ways;
  },
};

DESK.solve(0, 0);

document.querySelector(".start__btn").onclick = () => {
  let step = 0,
      prevVal;
  document.querySelectorAll(".value").forEach(b => {
    b.style.display = "none";
  });
  
  const showSteps = () => {
    if (step === 64) clearInterval(timer);
    ++step;
    let elem = document.getElementById(`${step}`);
    if (step !== 1) {
      let prevElem = document.getElementById(`${step - 1}`);
      prevElem.innerHTML = prevVal;
      prevElem.firstChild.style.display = "";
    }
    if (step <= 64) {
      prevVal = elem.innerHTML;
      elem.innerHTML = "&#9816;";
    }
  }
  
 let timer = setInterval(showSteps, 500);
}