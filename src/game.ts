/// <reference path="./board.ts" />
/// <reference path="./gameView.ts" />

// TODO generator
const defaultSudoku = [
  [9, 0, 0, 0, 0, 0, 3, 4, 0],
  [0, 5, 1, 9, 4, 3, 0, 0, 6],
  [4, 7, 0, 6, 5, 0, 8, 0, 0],
  [0, 0, 0, 0, 0, 1, 4, 0, 0],
  [0, 1, 9, 0, 6, 0, 0, 3, 0],
  [7, 0, 0, 8, 9, 5, 1, 0, 0],
  [0, 0, 2, 0, 0, 0, 0, 8, 7],
  [5, 6, 8, 7, 0, 4, 0, 0, 3],
  [0, 9, 0, 0, 0, 6, 2, 0, 4],
];

class Game {
  readonly board: Board;
  private gameView: GameView;
  private selectedNum: number;

  constructor(contentElement: HTMLElement) {
    this.board = new Board(defaultSudoku);
    this.selectedNum = 1;
    this.gameView = new GameView(contentElement, this);
    this.gameView.draw();
  }

  setSelectedNum = (val: number) => (this.selectedNum = val);
  getSelectedNum = () => this.selectedNum;
}
