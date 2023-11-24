const { transports, createLogger, format } = require('winston');

const datetime = (new Date()).toISOString().slice(0, 10).split('-').join('');

const timezoned = () => {
  return new Date().toLocaleString('en-US', {
    timeZone: 'Asia/Kolkata'
  });
}

levels = {
  error: 0,
  warn: 1,
  info: 2,
  http: 3,
  verbose: 4,
  debug: 5,
  webhook: 6,
  silly: 7
}

module.exports = createLogger({
  format: format.combine(
    format.timestamp({ format: timezoned }),
    format.json()
  ),
  levels: levels,
  transports: [
    new transports.File({ name: 'info-file', filename: 'logs/info/' + datetime + '_info.log', level: 'info' }),
    new transports.File({ name: 'debug-file', filename: 'logs/debug/' + datetime + '_debug.log', level: 'debug' }),
    new transports.File({ name: 'error-file', filename: 'logs/error/' + datetime + '_error.log', level: 'error' }),
    new transports.File({ name: 'webhook-file', filename: 'logs/webhook/' + datetime + '_webhook.log', level: 'webhook'})
  ],
  exceptionHandlers: [
    new transports.File({ filename: 'logs/exception/' + datetime + '_exceptions.log' })
  ]
});
