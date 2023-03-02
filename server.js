const express = require('express');
const app = express();
const connectNgrok = require('./Utilities/createTunnel');
const cors = require('cors');
const PORT = 3500;
const NGROK_TOKEN = "2LgbtduapYvw0fuls9NFO0afieX_6YkSayfWxYjQo9rJSGT1C";
module.exports = SECRET_PASSWORD = "vsevolod1234";
let url;



app.listen(PORT, (err)=>{
    if(err) return console.log(err);
    console.log(`Сервер прослушивает ${PORT} порт`);
    //connectNgrok(PORT, NGROK_TOKEN)
})

app.options('*', cors())
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, PUT, DELETE, OPTIONS');
    next();
});
app.use(cors({ origin: '*', credentials: true }));
app.use(express.json())
app.use(require('./Routes/users-routers'));
app.use(require('./Routes/products-routers'));
app.use(require('./Routes/cart-routers'));
app.use(require('./Routes/favorites-routers'));
app.use(require('./Routes/reviews-routers'));
app.use(require('./Routes/orders-routers'));

