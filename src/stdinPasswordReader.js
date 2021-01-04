const prompt = require('prompt');

module.exports = async function stdinPrivateKeyReader(){

    return new Promise((resolve, reject) => {
        prompt.start();

        const schema = {
            properties: {
                password: {
                    message: 'password',
                    hidden: true,
                    required: true
                },
                repeatePassword: {
                    message: 'repeate password',
                    hidden: true,
                    hidden: true
                }
            }
        };

        prompt.get(schema, function (err, result) {
            if (err) { return onErr(err); }
            const password = result.password.trimRight();
            const password2 = result.repeatePassword.trimRight();
            if (password !== password2) { return onErr('The password is not equal repeated password!'); }
            resolve(password);
        });

        function onErr(err) {
            console.error(err);
            reject(err);
        }
    });
};
