import winston from "winston";

export let logger; 

const customLevels = {
    levels: {
        fatal: 0,
        error: 1,
        warn: 2,
        info: 3,
        http: 4,
        debug: 5,
    },
    colors: {
        fatal: "red",
        error: "orange",
        warn: "yellow",
        info: "green",
        http: "blue",
        debug: "purple",
    },
};

console.log(process.env.ENVIROMENT); 

if (process.env.ENVIROMENT === "production") {
    logger = winston.createLogger({
        levels: customLevels.levels,
        transports: [
            new winston.transports.Console({
                level: "info",
            }),
            new winston.transports.File({
                filename: "src/logstest/errors.log",
                level: "error",
            }),
        ],
    });
} else { 
    logger = winston.createLogger({
        levels: customLevels.levels,
        transports: [
            new winston.transports.Console({
                level: "debug",
            }),
            new winston.transports.File({
                filename: "src/logstest/errors.log",
                level: "error",
            }),
        ],
    });
}


