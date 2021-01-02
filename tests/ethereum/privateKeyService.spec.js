const assert = require('assert');
const privateKeyService = require('../../src/ethereum/privateKeyService');

describe('privateKeyService', () => {

    [
        {
            phrase: 'hello moto',
            expectedHash: '4d804bbfbbb858aa285ac1355872f8e3f8997d505f6e9daabe30e60a70dcb81f'
        },
        {
            phrase: '1234567890',
            expectedHash: '38301fb0b5fcf3aaa4b97c4771bb6c75546e313b4ce7057c51a8cc6a3ace9d7e'
        },
        {
            phrase: 'Keccak-256',
            expectedHash: 'dcadc5b34d1f8e8a13eee82bcc441a48654f5430aeb3e20e58f0f74767cf0472'
        }
    ].forEach(testData => {
        it(`generate proper hash for ${testData.phrase} phrase`, () => {
            const result = privateKeyService(testData.phrase);
            assert.equal(result, testData.expectedHash);
        });
    });    
});