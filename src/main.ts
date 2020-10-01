/// <reference path="./game.ts" />

const init = () => {
  // @ts-ignore
  new GTheme().apply();
  // @ts-ignore
  if (new GTheme().get() === "dark") document.body.style.setProperty("--theme-secondary", "#4a4a4a");
  else document.body.style.setProperty("--theme-secondary", "#d3d3d3");
  const content = document.getElementById("game-content");
  content.innerHTML = "";
  new Game(content, init);
};

window.onload = init;
