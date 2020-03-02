const {remote, ipcRenderer} = require("electron");

const closeBtn = document.getElementById("close-btn");

closeBtn.addEventListener("click", () => {
  let window = remote.getCurrentWindow();
  window.close();
});

const updateBtn = document.getElementById("update-btn");

updateBtn.addEventListener("click", () => {
  ipcRenderer.send("update-notify-value", document.querySelector("#notify-val input").value);

  let window = remote.getCurrentWindow();
  window.close();
});
