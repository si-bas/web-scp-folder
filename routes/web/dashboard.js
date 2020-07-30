const { request } = require('express');

const router = require('express').Router();
const dashboardService = require('./../../app/services/web/dashboard');

router.get('/dashboard', async (req, res) => {
    const summary = await dashboardService.summaryData();
    const subdirectories = await dashboardService.getSubdirectories();
    const targets = await dashboardService.getTargets();    

    return res.render('contents/dashboard/index', {
        ...summary,
        ...{
            message: req.flash('message'),
            subdirectories: subdirectories,
            targets: targets
        }
    });
});

module.exports = router