module.exports = () => {
    const currentTime = new Date();
    let hours = currentTime.getHours();
    let minutes = currentTime.getMinutes();
    let seconds = currentTime.getSeconds();
    hours = (hours < 10) ? hours = '0' + hours : hours;
    minutes = (minutes < 10) ? minutes = '0' + minutes : minutes;
    seconds = (seconds < 10) ? seconds = '0' + seconds : seconds;
    let date = new Date().toISOString().slice(0, 10)
    let time = hours + ":" + minutes + ":" + seconds;
    let correntDate = date + " " + time;

    return correntDate;
}