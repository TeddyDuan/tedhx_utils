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

class Coloring {
  static do(action, msg) {
    if (action && msg) return colors[action].call(null, msg);
    return '';
  }
}

for (const action of Object.keys(config)) {
  Coloring[action] = (msg) => Coloring.do(action, msg);
}

module.exports = Coloring;
