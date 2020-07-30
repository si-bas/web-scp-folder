require('dotenv').config()

const {
    APP_NAME,
    APP_URL,
    APP_PORT,
    APP_KEY,
    APP_DIR,

    DB_HOST,
    DB_PORT,
    DB_DATABASE,
    DB_USERNAME,
    DB_PASSWORD,
    DB_CONNECTION,

    FILESYSTEM,

    TARGET_URL,
    TARGET_APP_SYNC,
} = process.env;

module.exports = {
    app: {
        name: APP_NAME,
        env: process.env.NODE_ENV,
        url: APP_URL,
        port: APP_PORT || 80,
        baseUrl: (path = '/') => {
            path = '/' + path;
            const url = APP_URL + path.replace(/\/\//g, "/");
            return url.replace(/([^:])(\/\/+)/g, '$1/');
        },        
        key: APP_KEY,
        dir: APP_DIR
    },

    db: {
        host: DB_HOST,
        port: DB_PORT,
        database: DB_DATABASE,
        username: DB_USERNAME,
        password: DB_PASSWORD,
        dialect: DB_CONNECTION
    },

    filesystem: FILESYSTEM,

    target: {
        url: TARGET_URL,
        appSync: TARGET_APP_SYNC
    }
}
