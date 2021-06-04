export default {
    environment: process.env.NODE_ENV || 'development',
    devto: {
        apiKey: process.env.DEVTO_KEY!,
    },
    db: {
        connection_string: process.env.DB_CONNECTION_STRING,
    },
    mailgun: {
        apiKey: process.env.MAILGUN_KEY!,
        domain: process.env.MAILGUN_DOMAIN || 'joshbrown.info',
    },
};
