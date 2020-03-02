const electron = require("electron");
const path = require("path");
const remote = electron.remote;

const closeBtn = document.getElementById("close-btn");

closeBtn.addEventListener("click", () => {
  let window = remote.getCurrentWindow();
  window.close();
});
