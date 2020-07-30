const { execSync } = require('child_process')
const config = require('./../../../config/environment');
const { Project, Subdirectory, Target } = require('./../../models');

const summaryData = async () => {
    const cmdOut = execSync('df -h | grep ' + config.filesystem).toString();
    const arrOut = cmdOut.split(' ').filter((value) => value.length);

    const storageUsed = parseFloat(arrOut[2])  || 0;
    const storageAvail = parseFloat(arrOut[3]) || 0;

    const projectSuccess = await Project.count({
        where: {
            status: true
        }
    });

    const projectFailed = await Project.count({
        where: {
            status: false
        }
    });

    return {
        storageUsed,
        storageAvail,
        projectSuccess,
        projectFailed
    };
}

const getSubdirectories = async () => {
    const subdirectories = await Subdirectory.findAll({
        raw:true
    });

    return subdirectories;
}

const getTargets = async () => {
    const targets = await Target.findAll({
        raw: true
    });

    return targets;
}

module.exports = {
    summaryData,
    getSubdirectories,
    getTargets
}