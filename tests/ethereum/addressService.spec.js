const assert = require('assert');
const addressService = require('../../src/ethereum/addressService');

describe('addressService', () => {

    describe('getAddress', () => {

        [
            {
                pk: '1c8aff950685c2ed4bc3174f3472287b56d9517b9c948127319a09a7a36deac8',
                expectedAddress: '0x5ccfa55C29F0522f062E3C15004E35a69dD45F6B'
            },
            {
                pk: '20cb3511bfb88ed8256275d7707cb0ea9748184067d839ca04e78157178942d8',
                expectedAddress: '0x08C53301Fbe96F58882046b1a190beF808C4a013'
            },
            {
                pk: '18214d0159e14109b0d3310e4cb0e7b65a6cdaca6e2f2a077537d75004e2e296',
                expectedAddress: '0xaEdf358b02709ed441b272B6e71F1fA011dF36fb'
            }  
        ].forEach(testData => {
            it(`generate proper address for specific private key: ${testData.pk}`, () => {
                let validateHashIsRaised = false;

                const addressAsStringWithChecksum = addressService(testData.pk, () => { validateHashIsRaised = true; return true; })
                    .getAddress();

                assert.equal(addressAsStringWithChecksum, testData.expectedAddress);
                assert.equal(validateHashIsRaised, true);
            });
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