const path = require("path");
const {
  remote: {BrowserWindow},
  ipcRenderer
} = require("electron");
const axios = require("axios");

let price = document.querySelector("h1");
let targetPrice = document.getElementById("target-price");

fetchBTCValue();

setInterval(fetchBTCValue, 60000);

const notifyMe = document.getElementById("notify-me");

notifyMe.addEventListener("click", openAddNotification);

function fetchBTCValue() {
  axios.get("https://min-api.cryptocompare.com/data/pricemulti?fsyms=BTC&tsyms=USD").then((res) => {
    const crypto = res.data.BTC.USD;
    price.innerHTML = crypto.toLocaleString("en", {style: "currency", currency: "USD"});
  });
}

function openAddNotification() {
  const modalPath = path.join("file://", __dirname, "../add/add.html");
  let win = new BrowserWindow({
    frame: false,
    transparent: true,
    alwaysOnTop: true,
    width: 400,
    height: 400
  });
  win.on("close", () => (win = null));
  win.loadURL(modalPath);
  win.show();
}

ipcRenderer.on("targetPriceVal", (event, arg) => {
  targetPriceVal = Number(arg);
  targetPrice.innerHTML = targetPriceVal.toLocaleString("en", {style: "currency", currency: "USD"});
});
