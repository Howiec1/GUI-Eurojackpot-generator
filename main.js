const { app, BrowserWindow, ipcMain } = require("electron");

let win = null;

const createWindow = () => {
  win = new BrowserWindow({
    width: 350,
    height: 600,
    resizable: false,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false
    },
  });

  win.loadFile("index.html");
};

app.whenReady().then(createWindow);

ipcMain.on("generateNumber", (event, data) => {
  const randomNumber = mainNumber(data,5,50); 
  const smallNumber = mainNumber(data,2,10); 
 
  win.webContents.send("receiveNumber", randomNumber);
  win.webContents.send("receiveSmallNumber", smallNumber);
});

function mainNumber(data,number, multi) {
  const arr = []; 

  for (y=0; y<data; y++){
    const arr2 = []; 
    for(i = 0 ; i < number ; i++ ){
      let multiplier  = arr2.length<2 ? 10:multi; 
      let Number = parseInt(Math.random()*multiplier)
      while(arr2.includes(Number) || Number===0 ){
        Number = parseInt(Math.random()*multiplier);
      }
      arr2.push(Number);
    } 
    const textNumber= arr2.sort(function (a, b) {  return a - b;  }).join(" ");
    
    arr.push(textNumber); 
  }
  
    return arr.join("\n"); 
}

