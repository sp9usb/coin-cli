const CoinKey = require('coinkey');

module.exports = function addressService(privateKey, hashValidator, coinKind) {
    if (!privateKey) throw 'Private key is not declared';
    if (!hashValidator && typeof (hashValidator) !== 'function') throw 'hashValidator is not declated or is not a function';

    if (!hashValidator(privateKey)) throw 'The private key hash is not valid';

    const privateKeyBuffer = Buffer.from(privateKey, 'hex');    
    const walletInfo = new CoinKey(privateKeyBuffer, coinKind);

    return {
        'getAddress': () => walletInfo.publicAddress
    };
};