const fastify = require('fastify')
const Config = require('./config/config')

const app = fastify({
    trustProxy: true,
    bodyLimit: 1048576 * 2,
    logger: Config.logger
})


const buildApp = () => {
    return app
}

module.exports = buildApp