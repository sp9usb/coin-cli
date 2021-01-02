const assert = require('assert');
const addressService = require('../../src/ethereum/addressService');
const privateKeyService = require('../../src/ethereum/privateKeyService');

describe('addressService', () => {

    describe('getAddress', () => {

        it('generate proper address for specific private key', () => {
            const specificPrivateKey = '1c8aff950685c2ed4bc3174f3472287b56d9517b9c948127319a09a7a36deac8';

            const addressAsString = addressService(specificPrivateKey, () => true).getAddress();

            assert.equal(addressAsString, '0x5ccfa55c29f0522f062e3c15004e35a69dd45f6b');
        });
    });
});