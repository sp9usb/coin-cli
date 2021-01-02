const keccak = require('keccak');

module.exports = function generateKeccakHashFrom(str) {
    return keccak('keccak256').update(str).digest('hex');
};