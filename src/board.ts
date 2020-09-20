/// <reference path="./types.d.ts" />

class Board {
  private content: cellContent[][];

  constructor(defaultContent: number[][]) {
    this.content = [];
    for (let i = 0; i < 9; i++) {
      this.content.push([]);
      for (let j = 0; j < 9; j++) {
        this.content[i].push(defaultContent[i][j] === 0 ? { state: "BLANK" } : { state: "DEFAULT", num: defaultContent[i][j] });
      }
    }
  }

  setValue = (i: number, j: number, val: number) => {
    if (this.content[i][j].state === "DEFAULT") return;
    if (this.content[i][j].state === "BLANK") this.content[i][j] = { state: "FILLED", num: val };
    else {
      if (this.content[i][j].num === val) this.content[i][j] = { state: "BLANK" };
      else this.content[i][j] = { state: "FILLED", num: val };
    }
  };

  getValue = (i: number, j: number) => {
    if (this.content[i][j].state === "BLANK") return undefined;
    return this.content[i][j].num;
  };

  isDefault = (i: number, j: number) => {
    return this.content[i][j].state === "DEFAULT";
  };

  isValid = () => {
    if (this.content.filter((row) => row.filter((cell) => cell.state !== "BLANK").length > 0).length > 0) return false;
    // TODO check validity
    return true;
  };
}
