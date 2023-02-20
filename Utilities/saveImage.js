const fs = require('fs');

module.exports = (path, name) =>{
    try{
        const readStream = fs.createReadStream(path);
        const writeStream = fs.createWriteStream(`Products-images/${name}`);
        readStream.pipe(writeStream);
        writeStream.on('finish', () => {
            fs.unlinkSync(path);
        });
        return {flag: true, name: `Products-images/${name}`}
    }catch (e){
        return {flag: false}
    }

}