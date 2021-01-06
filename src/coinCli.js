const stdinPasswordReader = require('./stdinPasswordReader');
const ethereumAddressService = require('./ethereum/addressService');
const ethereumPrivateKeyService = require('./ethereum/privateKeyService');

const bitcoinAndLitecoinAddressService = require('./bitcoin-and-litecoin/addressService');
const bitcoinAndLitecoinPrivateKeyService = require('./bitcoin-and-litecoin/privateKeyService');
const coinKind = require('./bitcoin-and-litecoin/coinKind');

const qrCodeService = require('./qrCodeService');

const isValidHash = (hash) => {
    const validHashRegex = /^[0-9a-f]{64}$/;

    return hash != null && validHashRegex.test(hash.toLowerCase());
};

const presentQrCode = async (asQrCode, address, stdout) => {
    if (asQrCode) {
        const qrCode = await qrCodeService(address.toString());
        stdout(qrCode);
    }
}

const coinCli = {
    __description__: 'Coin Cli tools',

    isValidHash: isValidHash,
    eth: {
        getMyAddress: async (privateKey = null, asQrCode = false) => {

            if (!privateKey) {
                console.log('Put the password phrase to generate private key hash: ');
                const privateKeyAsString = await stdinPasswordReader();
                privateKey = ethereumPrivateKeyService(privateKeyAsString);
            }
            if (!isValidHash(privateKey)) throw 'Private key is not valid';
            
            const myAddress = ethereumAddressService(privateKey, isValidHash).getAddress();

            console.log(`Your Ethereum address is: ${myAddress.toString()}`);

            presentQrCode(asQrCode, myAddress, console.log);
        },

        getWalletInfo: async (privateKey = null) => {
            if (!privateKey) {
                console.log('Put the password phrase to generate private key hash: ');
                const privateKeyAsString = await stdinPasswordReader();
                privateKey = ethereumPrivateKeyService(privateKeyAsString);
            }
            if (!isValidHash(privateKey)) throw 'Private key is not valid';
            
            console.log(`Your private key is: ${privateKey}`);
            console.log(await qrCodeService(privateKey));

            const myAddress = ethereumAddressService(privateKey, isValidHash).getAddress();
            console.log(`Your Ethereum address is: ${myAddress.toString()}`);
            console.log(await qrCodeService(myAddress.toString()));
        }
    },
    btc: {
        getMyAddress: async (privateKey = null, asQrCode = false) => {

            if (!privateKey) {
                console.log('Put the password phrase to generate private key hash: ');
                const privateKeyAsString = await stdinPasswordReader();
                privateKey = bitcoinAndLitecoinPrivateKeyService(privateKeyAsString);
            }
            if (!isValidHash(privateKey)) throw 'Private key is not valid';

            const myAddress = bitcoinAndLitecoinAddressService(privateKey, isValidHash, coinKind.bitcoin).getAddress();

            console.log(`Your Bitcoin address is: ${myAddress.toString()}`);

            presentQrCode(asQrCode, myAddress, console.log);
        },
    },

    ltc: {
        getMyAddress: async (privateKey = null, asQrCode = false) => {

            if (!privateKey) {
                console.log('Put the password phrase to generate private key hash: ');
                const privateKeyAsString = await stdinPasswordReader();
                privateKey = bitcoinAndLitecoinPrivateKeyService(privateKeyAsString);
            }
            if (!isValidHash(privateKey)) throw 'Private key is not valid';

            const myAddress = bitcoinAndLitecoinAddressService(privateKey, isValidHash, coinKind.litecoin).getAddress();

            console.log(`Your Litecoin address is: ${myAddress.toString()}`);

            presentQrCode(asQrCode, myAddress, console.log);
        },
    },
};

module.exports = coinCli;
