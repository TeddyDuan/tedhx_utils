const path = require('path');
const { createLogger, format, transports } = require('winston');
const { LEVELS } = require('./definition.json');

const {
  combine,
  errors,
  splat,
  timestamp,
  ms,
  metadata,
  cli,
  simple,
  prettyPrint,
} = format;

/**
 *
 * @param {String} logBase 存放日志文件的基础目录
 * @param {Object} options winston配置选项
 */
const winstonBuilder = (logBase = process.cwd(), options = {}) => {
  const basic = {
    format: combine(
      errors({ stack: true }),
      splat(),
      timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
      ms(),
      metadata(),
      prettyPrint(),
    ),
    transports: [
      new transports.Console({
        format: combine(cli({ all: true }), simple()),
        stderrLevels: [LEVELS.ERROR.KEY],
        consoleWarnLevels: [LEVELS.WARN.KEY],
      }),
      new transports.File({
        filename: path.resolve(logBase, './logs/warn.log'),
        level: LEVELS.WARN.KEY,
      }),
    ],
    exceptionHandlers: [
      new transports.File({
        filename: path.resolve(logBase, './logs/exception.log'),
      }),
    ],
  };
  return createLogger(Object.assign(basic, options));
};

module.exports = winstonBuilder;
