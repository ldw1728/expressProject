import winston from 'winston';
import winstonDaily from 'winston-daily-rotate-file';

const logDir = 'logs' //로그파일 저장할 디렉토리
const { combine, timestamp, printf} = winston.format;

//define log format
const logFormat = printf(info=>{
    return `${info.timestamp} ${info.level}: ${info.message}`;
});

/*
 * Log Level
 * error: 0, warn: 1, info: 2, http: 3, verbose: 4, debug: 5, silly: 6
 */
const logger = winston.createLogger({
    format: combine(
        timestamp({
            format: 'YYYY-MM-DD HH:mm:ss',
        }),
        logFormat,
    ),
    transports: [
        //info 
        new winstonDaily({

        })
    ]
})
