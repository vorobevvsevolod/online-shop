const jwt = require("jsonwebtoken");
const SECRET_PASSWORD = require("../server");

module.exports = function decodeToken(token){
    const tokenUser = (token || '').replace(/Bearer\s?/, '');
    if(!token) return {status: false};
    const decoded =  jwt.verify(tokenUser, SECRET_PASSWORD);
    return {flag: true, id: decoded.id}
}
