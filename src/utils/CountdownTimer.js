import dayjs from 'dayjs';

export function getRemainingTimeUnitMsTimestamp(timestampMs){
    console.log(timestampDayjs);
    const timestampDayjs = dayjs(timestampMs);
    const nowDayjs = dayjs();
    return {
        seconds: getRemainingSeconds(nowDayjs, timestampDayjs),
        minutes: getRemainingMinutes(nowDayjs, timestampDayjs)
    };
}

function getRemainingSeconds(nowDayjs , timestampDayjs){
    const seconds = timestampDayjs.diff(nowDayjs, 'seconds') % 60;
    return padWithZeros(seconds, 2);
}

function getRemainingMinutes(nowDayjs , timestampDayjs){
    const minutes = timestampDayjs.diff(nowDayjs, 'minutes') % 60;
    return padWithZeros(minutes, 2);
}

function padWithZeros(number, minLength) {
    const numberString = number.toString();
    if(numberString.length >= minLength) return numberString;
    return "0".repeat(minLength-numberString.length) + numberString;
}