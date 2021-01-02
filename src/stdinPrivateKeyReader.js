const prompt = require('prompt');

module.exports = async function stdinPrivateKeyReader(){

    return new Promise((resolve, reject) => {
        prompt.start();

        prompt.get({
            name: 'privateKey',
            hidden: true
        }, function (err, result) {
            if (err) { return onErr(err); }
            resolve(result.privateKey);
        });

        function onErr(err) {
            console.log(err);
            return 1;
        }
    });
};
