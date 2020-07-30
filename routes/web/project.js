const router = require('express').Router();

const projectService = require('./../../app/services/web/project');
const config = require('./../../config/environment');

router.get('/project/data', async (req, res) => {
    const data = await projectService.data();
    
    return res.json(data);
});

router.post('/project/create', async (req, res) => {
    projectService.create(req.body, req.session.user);
    
    return res.redirect(config.app.baseUrl('/'));
});

router.post('/project/check/exists', async (req, res) => {
    const data = await projectService.checkExists(req.body);
    
    return res.json(data);
});

module.exports = router