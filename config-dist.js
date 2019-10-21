const config = {
    mysql: {
        host: '',
        user: '',
        password: '',
        database: ''
    },
    mailgun: {
        apiKey: "",
        domain: ""
    }
};
Object.freeze(config);
module.exports = config;
