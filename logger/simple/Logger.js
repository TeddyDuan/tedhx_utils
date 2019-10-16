const colors = require('colors');

const config = {
  silly: 'rainbow',
  input: 'grey',
  verbose: 'cyan',
  prompt: 'grey',
  info: 'green',
  data: 'grey',
  help: 'cyan',
  warn: 'yellow',
  debug: 'blue',
  error: 'red',
};

colors.setTheme(config);

class Logger {
  static do(action, msg) {
    if (action && msg) console.log(colors[action].call(null, msg));
  }
}

for (const action of Object.keys(config)) {
  Logger[action] = (msg) => Logger.do(action, msg);
}

module.exports = Logger;
