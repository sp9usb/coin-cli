const ethUtil = require('ethereumjs-util');

module.exports = function addressService(privateKey, hashValidator) {
    if (!privateKey) throw 'Private key is not declared';
    if (!hashValidator && typeof(hashValidator) !== 'function') throw 'hashValidator is not declated or is not a function';

    if (!hashValidator(privateKey)) throw 'The private key hash is not valid';

    const privateKeyBuffer = Buffer.from(privateKey, 'hex');
    const address = ethUtil.Address.fromPrivateKey(privateKeyBuffer);

    return {
        'getAddress': () => address.toString(),
        'getAddressAsBuffer': () => address.toBuffer()
    };
};