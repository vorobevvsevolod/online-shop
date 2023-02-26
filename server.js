const express = require('express');
const app = express();
const connectNgrok = require('./Utilities/createTunnel');
const cors = require('cors');
const PORT = 3500;
const NGROK_TOKEN = "2LgbtduapYvw0fuls9NFO0afieX_6YkSayfWxYjQo9rJSGT1C";
module.exports = SECRET_PASSWORD = "vsevolod1234";

app.use(express.json())
app.use(cors())
app.use(require('./Routes/users-routers'));
app.use(require('./Routes/products-routers'));
app.use(require('./Routes/cart-routers'));
app.use(require('./Routes/favorites-routers'));
app.use(require('./Routes/reviews-routers'));

app.listen(PORT, (err)=>{
    if(err) return console.log(err);
    console.log(`Сервер прослушивает ${PORT} порт`);
    //connectNgrok(PORT, NGROK_TOKEN);
})

