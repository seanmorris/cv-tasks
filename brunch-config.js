exports.files = {
  javascripts: {joinTo: 'app.js'},
  stylesheets: {joinTo: 'app.css'}
};

exports.npm = {
  styles: {
    highlightjs: ['styles/foundation.css']
  }
};

exports.plugins = {
  babel: {presets: ['latest']},
  raw: {
    pattern: /\.(html)$/,
    wrapper: content => `module.exports = ${JSON.stringify(content)}`
  }
};

exports.watcher = {
    awaitWriteFinish: true,
    usePolling: true
};