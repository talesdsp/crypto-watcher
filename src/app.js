const {app, BrowserWindow, Menu, shell} = require("electron");
const path = require("path");
const url = require("url");

let win;

function createWindow() {
  win = new BrowserWindow({width: 800, height: 600});

  win.loadURL(
    url.format({
      pathname: path.join(__dirname, "src/index.html"),
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

app.on("ready", createWindow);
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});
app.on("activate", () => {
  if (win === null) {
    createWindow();
  }
});
