const {remote, ipcRenderer} = require("electron");

const closeBtn = document.getElementById("close-btn");

closeBtn.addEventListener("click", () => {
  let window = remote.getCurrentWindow();
  window.close();
});

const updateBtn = document.getElementById("update-btn");

updateBtn.addListener("click", () => {
  ipcRenderer.send("update-notify-value", document.getElementById("notify-val").value);

  let window = remote.getCurrentWindow();
  window.close();
});
