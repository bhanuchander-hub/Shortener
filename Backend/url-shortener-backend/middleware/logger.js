const winston = require("winston");

const logger = winston.createLogger({
  transports: [
    new winston.transports.File({ filename: "logs/app.log" })
  ],
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  )
});

const loggingMiddleware = (req, res, next) => {
  logger.info({
    method: req.method,
    url: req.originalUrl,
    body: req.body,
    time: new Date().toISOString()
  });
  next();
};

module.exports = { loggingMiddleware, logger };
