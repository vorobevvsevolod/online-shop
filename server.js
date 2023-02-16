const express = require('express');
const ngrok = require('ngrok');
const app = express();
const PORT = 3000;
const NGROK_TOKEN = "2LgbtduapYvw0fuls9NFO0afieX_6YkSayfWxYjQo9rJSGT1C";
app.use(express.json())

//Подключение роутеров
app.use(require('./routes/users-routers'));

app.listen(PORT, (err)=>{
    if(err) return console.log(err);
    console.log("Сервер прослушивает 3000 порт");

    ngrok.authtoken(NGROK_TOKEN);
    (async function (){
        var URL = await ngrok.connect(PORT);
        console.log(URL);
    })();
})
