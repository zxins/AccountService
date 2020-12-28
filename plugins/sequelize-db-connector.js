const fp = require('fastify-plugin')
const Sequelize = require('sequelize')

const newDB = () => {
    return new Sequelize(global.Config['database']['write']['uri'], {
        logging: (...msg) => global.log.debug(msg),
        freezeTableName: true,
        timezone: global.Config['timezone'],
        pool: {
            max: 30,
            idle: 30000
        }
    });
}

const dbPlugin = fp((fastify, opts, next) => {
    fastify.decorate('db', newDB());
    next();
})

module.exports = {
    newDB,
    dbPlugin
}