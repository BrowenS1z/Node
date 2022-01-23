const moment = require('moment');
const EventEmitter = require('events');
const emitter = new EventEmitter();

const dates = process.argv.slice(2);
let timers = [];

const createTimer = (date) => {
    date = date.split('-');

    let timerTime = new Date(date[3], date[2] - 1, date[1], date[0]);

    if (isNaN(timerTime)) {
        console.log('Ошибка! Неправильный формат');
        return;
    }

    if (timerTime < new Date().getTime()) {
        console.log('Ошибка! Неверная дата');
        return;
    }

    timers.push(timerTime);
}

for (let i = 0; i < dates.length; i++) {
    createTimer(dates[i]);
}

const timerWork = (timerTime) => {
    let flag = false;
    setInterval(function () {
        if (!flag) {
            let currentTime = new Date().getTime();
            let diffTime = timerTime - currentTime;
            let duration = moment.duration(diffTime, 'milliseconds');
            let payload = `${duration._data.years} years, ${duration._data.months} months, ${duration._data.days} days, ${duration._data.hours} hours, ${duration._data.minutes} minutes, ${duration._data.seconds} seconds`;
            if (duration <= 0) {
                payload = `Таймер закончился`;
                flag = true;
            }
            else {
                emitter.emit('timerTick', payload);
            }
        }
        else {
            return;
        }
    }, 1000)
}

const run = () => {
    let currentTime = new Date().getTime();
    for (let i = 0; i < timers.length; i++) {
        timerWork(timers[i]);
    }
}

class TimerHandler {
    static timerTick(payload) {
        console.log('До окончания таймера: ', payload);
    }
}

emitter.on('timerTick', TimerHandler.timerTick);

run();