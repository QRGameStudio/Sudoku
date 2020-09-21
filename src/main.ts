/// <reference path="./game.ts" />

const init = () => {
  const content = document.getElementById("game-content");
  content.innerHTML = "";
  new Game(content, init);
};

window.onload = init;
