const router = require('express').Router();
const glob = require('glob');
const path = require('path');

const config = require('./../config/environment');

router.get('/', (req, res) => {
    return res.redirect(config.app.baseUrl('/dashboard'));
});

glob.sync(path.join(__dirname, 'web/*.js')).forEach(file => {
    router.use('/', require(path.resolve(file)));
});

module.exports = router