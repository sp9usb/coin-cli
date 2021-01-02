const coinCli = require('../src/coinCli');
const assert = require('assert');

describe('CoinCli', () => {
    describe('isValidHash', () => {
        
        [
            "1c8aff950685c2ed4bc3174f3472287b56d9517b9c948127319a09a7a36deac8",
            "ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff",
            "0123456789abcdef0123456789abcdef0123456789abcdef0123456789abcdef",
            "000000000000000000000000000000000000000000000000000000000000123f",
        ].forEach(validHash => {
            it(`Hash "${validHash}" is valid`, () => {
                assert.equal(coinCli.isValidHash(validHash), true);
            });
        });

        [
            null,
            undefined,
            1,
            "   ",
            "000000000000000000000000000000000000000000000000000000000000123",
            "00000000000000000000000000000000000000000000000000000000000012345",
            "000000000000000000000000000000000000000000000000000000000000123g",
        ].forEach(invalidHash => {
            it(`Hash "${invalidHash}" is invalid`, () => {
                assert.throws(
                    () => addressService('1c8aff950685c2ed4bc3174f3472287b56d9517b9c948127319a09a7a36deac8', ).getAddress()
                );
            });
        });
    });
});