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

  private testGroup = (group: number[]) => {
    return [1, 2, 3, 4, 5, 6, 7, 8, 9].reduce((acc, i) => acc + (group.includes(i) ? 0 : 1), 0) === 0;
  };

  isValid = () => {
    if (this.content.filter((row) => row.filter((cell) => cell.state === "BLANK").length > 0).length > 0) return false;
    return (
      [0, 1, 2, 3, 4, 5, 6, 7, 8].reduce((acc, i) => {
        let act = acc;
        act += this.testGroup(this.content[i].map((c) => c.num)) ? 0 : 1;
        act += this.testGroup(this.content.map((c) => c[i].num)) ? 0 : 1;
        const iStart = 3 * Math.floor(i / 3);
        const jStart = 3 * (i % 3);
        act += this.testGroup(
          [
            [iStart, jStart],
            [iStart, jStart + 1],
            [iStart, jStart + 2],
            [iStart + 1, jStart],
            [iStart + 1, jStart + 1],
            [iStart + 1, jStart + 2],
            [iStart + 2, jStart],
            [iStart + 2, jStart + 1],
            [iStart + 2, jStart + 2],
          ].map((c) => this.content[c[0]][c[1]].num)
        )
          ? 0
          : 1;
        return act;
      }, 0) === 0
    );
  };
}
