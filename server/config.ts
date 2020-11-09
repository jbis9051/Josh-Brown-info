export default {
    mysql: {
        host: process.env.MYSQL_HOST || 'localhost',
        port: process.env.MYSQL_PORT ? parseInt(process.env.MYSQL_PORT) : 3306,
        database: process.env.MYSQL_DB || 'profile_site',
        user: process.env.MYSQL_USER || 'root',
        password: process.env.MYSQL_PASSWORD!,
    },
    mailgun: {
        apiKey: process.env.MAILGUN_KEY!,
        domain: process.env.MAILGUN_DOMAIN || "joshbrown.info"
    }
}
