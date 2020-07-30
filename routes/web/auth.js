const router = require('express').Router();

const authService = require('./../../app/services/web/auth');
const config = require('./../../config/environment');

router.post('/auth/login', async (req, res) => {
    const attemptLogin = await authService.attemptLogin(req.body);
    
    if (attemptLogin.status) {
        req.session.user = attemptLogin.user;
        return res.redirect(config.app.baseUrl('/'));
    }

    req.flash('message', attemptLogin.message);
    return res.redirect(config.app.baseUrl('/'));
});

router.get('/auth/logout', (req, res) => {
    req.session.destroy();
    return res.redirect(config.app.baseUrl('/'));
});

module.exports = router