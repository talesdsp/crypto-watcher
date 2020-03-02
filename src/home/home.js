const electron = require("electron");
const path = require("path");
const BrowserWindow = electron.remote.BrowserWindow;

const notifyBtn = document.getElementById("notify-btn");

notifyBtn.addEventListener("click", () => {
  const modalPath = path.join("file://", __dirname, "add.html");
  let win = new BrowserWindow({
    frame: false,
    transparent: true,
    alwaysOnTop: true,
    width: 400,
    height: 400
  });
  win.on("close", () => (win = null));
  win.loadUrl(modalPath);
  win.show();
});
