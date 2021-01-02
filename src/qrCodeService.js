const qrcode = require('qrcode-terminal');

module.exports = async function generateQrCodeFrom(str) {
    return new Promise((resolve, reject) => {
        qrcode.generate(str, {
            small: true
        }, (code) => {
            resolve(code);
        });
    });
}