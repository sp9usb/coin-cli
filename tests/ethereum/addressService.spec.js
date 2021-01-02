const assert = require('assert');
const addressService = require('../../src/ethereum/addressService');

describe('addressService', () => {

    describe('getAddress', () => {

        it('generate proper address for specific private key', () => {
            let validateHashIsRaised = false;
            const specificPrivateKey = '1c8aff950685c2ed4bc3174f3472287b56d9517b9c948127319a09a7a36deac8';

            const addressAsString = addressService(specificPrivateKey, () => { validateHashIsRaised = true; return true; })
                .getAddress();

            assert.equal(addressAsString, '0x5ccfa55c29f0522f062e3c15004e35a69dd45f6b');
            assert.equal(validateHashIsRaised, true);
        });

        it('private key is not defined', () =>{
            assert.throws(() => addressService(null, () => true).getAddress());
        });

        it('validate hash function is not defined', () =>{
            assert.throws(
                () => addressService('1c8aff950685c2ed4bc3174f3472287b56d9517b9c948127319a09a7a36deac8', null).getAddress()
            );
        });

        it('validate hash function is not function', () =>{
            assert.throws(
                () => addressService('1c8aff950685c2ed4bc3174f3472287b56d9517b9c948127319a09a7a36deac8', new Object()).getAddress()
            );
        });
    });
});