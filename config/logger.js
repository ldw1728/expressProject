const winston = require('winston');
const winstonDaily = require('winston-daily-rotate-file') ;

const logDir = 'logs' //로그파일 저장할 디렉토리
const { combine, timestamp, printf} = winston.format;

//// winston log 설정.

const custom_level = {
    levels: {
        error : 0,
        login: 1,
        info: 2,
        http: 3,
        verbose: 4,
        debug: 5,
        silly: 6,
    },
    colors: {
        login: 'yellow'
    }
}
  
//define log format
const logFormat = printf(info=>{
    return `${info.timestamp} ${info.level}: ${info.message}`;
});

/*
 * Log Level
 * error: 0, warn: 1, info: 2, http: 3, verbose: 4, debug: 5, silly: 6
 */
winston.addColors(custom_level.colors);
const logger = winston.createLogger({
    format: combine(
        timestamp({
            format: 'YYYY-MM-DD HH:mm:ss',
        }),
        logFormat,
    ),
    levels: custom_level.levels,
    transports: [
        //info 
        new winstonDaily({
            level:'info', 
            datePattern: 'YYYY-MM-DD',
            dirname: logDir,
            filename: `%DATE%.log`, 
            maxFiles: 30,   //30일치 로그 파일 저장
            zippedArchive: true,
        }),

        //http 
        new winstonDaily({
            level:'http', 
            datePattern: 'YYYY-MM-DD',
            dirname: logDir + '/req',
            filename: `%DATE%.req.log`, 
            maxFiles: 30,   //30일치 로그 파일 저장
            zippedArchive: true,
        }),

        //error 레벨 로그 파일 설정
        new winstonDaily({
            level: 'error',
            datePattern: 'YYYY-MM-DD',
            dirname: logDir + '/error',
            filename: `%DATE%.error.log`,
            maxFile: 30,
            zippedArchive: true,
        }),

        //login 레벨 로그 파일 설정
        new winstonDaily({
            level: 'login',
            datePattern: 'YYYY-MM-DD',
            dirname: logDir + '/login',
            filename: `%DATE%.login.log`,
            maxFile: 30,
            zippedArchive: true,
        }),
    ],
});


 const stream = {// morgan wiston 설정
    write: message => {
        logger.http(message);
    }
} 

//prod 환경이 아닌경우
if(process.env.NODE_ENV !== 'production'){
    logger.add(new winston.transports.Console({
        format: winston.format.combine(
            winston.format.colorize(), //색깔 출력
            winston.format.simple(), //`${info.level}: ${info.message} JSON.stringify({ ...rest })` 포맷으로 출력
        )
    }));
}

//전역객체 설정.
global.logger = logger;


 //// morgan log 설정
var morgan = require('morgan');
var env = prop.getEnv() === 'production' ? 'combined' : 'dev';
morgan = morgan(env, {stream});

module.exports = {morgan};
