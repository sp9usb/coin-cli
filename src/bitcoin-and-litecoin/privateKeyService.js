const hash = require('hash.js');

module.exports = function generateKeccakHashFrom(str) {
    return hash.sha256().update(str).digest('hex');
};