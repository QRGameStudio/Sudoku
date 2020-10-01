/// <reference path="./board.ts" />
/// <reference path="./generator.ts" />

class Game {
  readonly board: Board;
  readonly restart: () => void;
  private selectedNum: number;
  private content: HTMLElement;
  private cellWidht: number;
  private leftOffset: number;
  private topOffset: number;

  constructor(contentElement: HTMLElement, restart: () => void) {
    this.board = new Board(new SudokuGenerator().generate());
    this.selectedNum = 1;
    this.restart = restart;
    this.content = contentElement;
    this.topOffset = 32;
    this.cellWidht = Math.floor(
      (Math.min(contentElement.getBoundingClientRect().width, contentElement.getBoundingClientRect().height) * 0.8 - 16) / 9
    );
    this.leftOffset = Math.floor((contentElement.getBoundingClientRect().width - 9 * this.cellWidht) / 2);
    this.draw();
  }

  private clearBoard = () => {
    this.content.innerHTML = "";
  };

  private win = () => {
    const gameOverElement = document.createElement("div");
    gameOverElement.innerHTML = "SUDOKU SOLVED";
    gameOverElement.className = "go";
    gameOverElement.onclick = this.restart;
    this.content.appendChild(gameOverElement);
  };

  private drawCell = (i: number, j: number) => {
    const e = document.createElement("div");
    e.className =
      "cell " +
      (i % 3 === 0 ? "lBor " : i % 3 === 2 ? "rBor " : "") +
      (j % 3 === 0 ? "tBor " : j % 3 === 2 ? "bBor " : "") +
      (this.board.isDefault(i, j) ? "def" : "");
    e.style.width = `${this.cellWidht}px`;
    e.style.height = `${this.cellWidht}px`;
    e.style.left = `${this.leftOffset + this.cellWidht * i}px`;
    e.style.top = `${this.topOffset + this.cellWidht * j}px`;
    e.style.fontSize = `${Math.floor(this.cellWidht * 0.8)}px`;
    e.innerHTML = (this.board.getValue(i, j) || " ").toString();
    e.onclick = () => {
      this.board.setValue(i, j, this.selectedNum);
      if (this.board.isValid()) this.win();
      else this.draw();
    };
    this.content.appendChild(e);
  };

  private drawBtn = (val: number) => {
    const e = document.createElement("div");
    e.className = "bttn " + (this.selectedNum === val ? "sel" : "");
    e.style.width = `${this.cellWidht}px`;
    e.style.height = `${this.cellWidht}px`;
    e.style.left = `${this.leftOffset + (val - 1) * this.cellWidht}px`;
    e.style.top = `${2 * this.topOffset + 9 * this.cellWidht}px`;
    e.style.fontSize = `${Math.floor(this.cellWidht * 0.8)}px`;
    e.innerHTML = val.toString();
    e.onclick = () => {
      this.selectedNum = val;
      this.draw();
    };
    this.content.appendChild(e);
  };

  private draw = () => {
    this.clearBoard();
    // @ts-ignore
    Array.from(Array(9).keys()).forEach((i) => Array.from(Array(9).keys()).forEach((j) => this.drawCell(i, j)));
    // @ts-ignore
    Array.from(Array(9).keys()).forEach((i) => this.drawBtn(i + 1));
  };
}
