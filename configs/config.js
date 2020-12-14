const _config = require('./allConfig.json').qa;

module.exports = {
    Port: _config.port,
    db: _config.db,
    ACCESS_TOKEN_SECRET: _config.ACCESS_TOKEN_SECRET,
    REFRESH_TOKEN_SECRET: _config.REFRESH_TOKEN_SECRET
}