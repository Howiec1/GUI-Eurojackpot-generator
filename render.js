const ipcRenderer = require("electron").ipcRenderer;
const generateNumber = () => {
  ipcRenderer.send(
    "generateNumber",
    document.querySelector(".keyWord").value
  );
};

ipcRenderer.on("receiveNumber", (event, data) => {
  const numberTag = document.querySelector("#number");
  numberTag.innerText = data;
});
ipcRenderer.on("receiveSmallNumber",(event, data)=> {
  const smallTag = document.querySelector("#SmallNumber"); 
  smallTag.innerText= data;
});