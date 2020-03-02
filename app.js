const {app, BrowserWindow, Menu, shell, ipcMain} = require("electron");
const path = require("path");
const url = require("url");

let win;

initApp();

function initApp() {
  app.on("ready", createWindow);
  app.on("window-all-closed", allClosed);
  app.on("activate", activate);
  ipcMain.on("update-notify-value", updateNotifyValue);
}

function createWindow() {
  win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true
    }
  });

  win.loadURL(
    url.format({
      pathname: path.join(__dirname, "src/home/home.html"),
      protocol: "file:",
      slashes: true
    })
  );

  win.webContents.openDevTools();

  win.on("closed", () => {
    win = null;
  });

  const menu = Menu.buildFromTemplate([
    {
      label: "Menu",
      submenu: [
        {
          label: "Item"
        },
        {
          label: "CoinMarketCap",
          click() {
            shell.openExternal("http://coinmarketcap.com");
          }
        },
        {type: "separator"},
        {
          label: "Exit",
          click() {
            app.quit();
          }
        }
      ]
    },
    {label: "Info"}
  ]);

  Menu.setApplicationMenu(menu);
}

function allClosed() {
  if (process.platform !== "darwin") {
    app.quit();
  }
}

function activate() {
  if (win === null) {
    createWindow();
  }
}

function updateNotifyValue(event, arg) {
  win.webContents.send("targetPriceVal", arg);
}
