const ngrok = require('ngrok');
const connectNgrok = async (port, ngrokToken) => {
    ngrok.authtoken(ngrokToken);
    const url = await ngrok.connect(port);
    console.log(`Your app is available at ${url}`);
    return url
};
module.exports = connectNgrok;