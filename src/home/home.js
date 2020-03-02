const path = require("path");
const {
  remote: {BrowserWindow},
  ipcRenderer
} = require("electron");
const axios = require("axios");

let price = document.querySelector("h1");
let targetPrice = document.getElementById("target-price");

let targetPriceVal;

const notification = {
  title: "BTC Alert",
  body: "BTC just beat your target price!",
  icon: path.join(__dirname, "../")
};

fetchBTCValue();

setInterval(fetchBTCValue, 20000);

const notifyMe = document.getElementById("notify-me");

notifyMe.addEventListener("click", openAddNotification);

function fetchBTCValue() {
  axios.get("https://min-api.cryptocompare.com/data/pricemulti?fsyms=BTC&tsyms=USD").then((res) => {
    const crypto = res.data.BTC.USD;
    price.innerHTML = crypto.toLocaleString("en-US", {style: "currency", currency: "USD"});

    if (targetPrice.innerHTML != "" && targetPriceVal < res.data.BTC.USD) {
      const myNotification = new window.Notification(notification.title, notification);
    }
  });
}

function openAddNotification() {
  const modalPath = path.join("file://", __dirname, "../add/add.html");
  let win = new BrowserWindow({
    frame: false,
    webPreferences: {
      nodeIntegration: true
    },
    movable: true,
    transparent: true,
    alwaysOnTop: true,
    width: 400,
    height: 400
  });
  win.on("close", () => (win = null));
  win.loadURL(modalPath);
  win.show();

  win.webContents.openDevTools();
}

ipcRenderer.on("targetPriceVal", (event, arg) => {
  targetPriceVal = arg;
  console.log(arg);
  targetPrice.innerHTML = targetPriceVal.toLocaleString("en-US", {
    style: "currency",
    currency: "USD"
  });
});
