/// <reference path="./game.ts" />

class GameView {
  private board: HTMLDivElement;
  private cellWidht: number;
  private leftOffset: number;
  private topOffset: number;
  private game: Game;

  constructor(contentElement: HTMLElement, game: Game) {
    this.board = this.createBoard(contentElement);
    this.topOffset = 32;
    this.game = game;
    this.cellWidht = Math.floor(
      (Math.min(contentElement.getBoundingClientRect().width, contentElement.getBoundingClientRect().height) * 0.8 - 16) / 9
    );
    this.leftOffset = Math.floor((contentElement.getBoundingClientRect().width - 9 * this.cellWidht) / 2);
  }

  private createBoard = (contentElement: HTMLElement) => {
    const board = document.createElement("div");
    board.className = "board";
    board.style.width = `100vw`;
    board.style.height = `100vh`;
    contentElement.appendChild(board);
    return board;
  };

  private clearBoard = () => {
    this.board.innerHTML = "";
  };

  private drawCell = (i: number, j: number) => {
    const e = document.createElement("div");
    e.className =
      "cell " +
      (i % 3 === 0 ? "lBor " : i % 3 === 2 ? "rBor " : "") +
      (j % 3 === 0 ? "tBor " : j % 3 === 2 ? "bBor " : "") +
      (this.game.board.isDefault(i, j) ? "def" : "");
    e.style.width = `${this.cellWidht}px`;
    e.style.height = `${this.cellWidht}px`;
    e.style.left = `${this.leftOffset + this.cellWidht * i}px`;
    e.style.top = `${this.topOffset + this.cellWidht * j}px`;
    e.style.fontSize = `${Math.floor(this.cellWidht * 0.8)}px`;
    e.innerHTML = (this.game.board.getValue(i, j) || " ").toString();
    e.onclick = () => {
      this.game.board.setValue(i, j, this.game.getSelectedNum());
      this.draw();
    };
    this.board.appendChild(e);
  };

  private drawBtn = (val: number) => {
    const e = document.createElement("div");
    e.className = "btn " + (this.game.getSelectedNum() === val ? "sel" : "");
    e.style.width = `${this.cellWidht}px`;
    e.style.height = `${this.cellWidht}px`;
    e.style.left = `${this.leftOffset + (val - 1) * this.cellWidht}px`;
    e.style.top = `${2 * this.topOffset + 9 * this.cellWidht}px`;
    e.style.fontSize = `${Math.floor(this.cellWidht * 0.8)}px`;
    e.innerHTML = val.toString();
    e.onclick = () => {
      this.game.setSelectedNum(val);
      this.draw();
    };
    this.board.appendChild(e);
  };

  draw = () => {
    this.clearBoard();
    // @ts-ignore
    Array.from(Array(9).keys()).forEach((i) => Array.from(Array(9).keys()).forEach((j) => this.drawCell(i, j)));
    // @ts-ignore
    Array.from(Array(9).keys()).forEach((i) => this.drawBtn(i + 1));
  };
}
