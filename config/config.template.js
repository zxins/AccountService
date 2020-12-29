const Config = {
    logger: {
        level: "info",
        prettyPrint: {colorize: true}
    },
    timezone: "+08:00",
    database: {
        cache: {
            uri: "redis://127.0.0.1:6379/0",
        },
        write: {
            uri: `mysql://root:${process.env.MYSQL_PASS}@127.0.0.1:3306/nodeBlog`,
        },
    },
}

module.exports = Config;