const ethUtil = require('ethereumjs-util');

module.exports = function addressService(privateKey, hashValidator) {
    if (!privateKey) throw 'Private key is not declared';
    if (!hashValidator && typeof(hashValidator) !== 'function') throw 'hashValidator is not declated or is not a function';

    if (!hashValidator(privateKey)) throw 'The private key hash is not valid';

    const privateKeyBuffer = Buffer.from(privateKey, 'hex');
    const address = ethUtil.addHexPrefix(ethUtil.privateToAddress(privateKeyBuffer).toString('hex'));
    if (!ethUtil.isValidAddress(address)) throw new Error('The address is invalid');
    const addressWithChecksum = ethUtil.toChecksumAddress(address);
    if (!ethUtil.isValidChecksumAddress(addressWithChecksum)) throw new Error('The address is invalid');    

    return {
        'getAddress': () => addressWithChecksum
    };
};