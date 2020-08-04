const log = function(to, from, next) {
    console.log('Logger is running!');
    next();
  }

export default {
    log:log
}