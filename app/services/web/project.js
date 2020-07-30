const fs = require('fs');
const { Op } = require('sequelize');
const { exec } = require('child_process');
const pug = require('pug');

const { Project, User, Subdirectory, Target } = require('./../../models');

const create = async (requestBody, user) => {
    Project.create({
        ...requestBody,
        ...{
            userId: user.id
        }
    }).then(async (project) => {        
        const destination = await Subdirectory.findOne({
            where: {
                id: project.subdirectoryId
            },
            raw: true
        });

        const target = await Target.findOne({
            where: {
                id: project.targetId
            },
            raw: true
        });

        if (destination && target) {
            project.isInProgress = true;
            await project.save();
            const command = `scp -r -P ${target.port} ${target.user}@${target.host}:${target.path}/${project.pathSource} ${destination.path}/${project.pathDest}`;            

            exec(command, (err, stdout, stderr) => {
                project.isInProgress = false;
                project.status = err ? false : true

                project.save();
            });
        }
    });
}

const data = async () => {
    const projects = await Project.findAll({
        attributes: {
            exclude: ['logOutputFile', 'logOutputText']
        },
        include: [
            {
                model:User,
                raw: true,
                attributes: {
                    exclude: ['htmlProfile', 'password', 'username', 'email']
                },
            },
            {
                model:Subdirectory,
                raw: true,
                attributes: {
                    exclude: ['path']
                },
            },
            {
                model:Target,
                raw: true,
                attributes: {
                    exclude: ['path', 'host', 'user', 'port']
                },
            }
        ]
    });

    for (const project of projects) {
        if (project.dataValues.status === null) 
            project.dataValues.statusBadge = project.dataValues.isInProgress ? pug.render('span(class="badge badge-primary") In Progress') : pug.render('span(class="badge badge-secondary") Waiting');
        else
            project.dataValues.statusBadge = project.dataValues.status ? pug.render('span(class="badge badge-success") Success') : pug.render('span(class="badge badge-danger") Failed');
    }

    return {
        data: projects
    }
}

const checkExists = async (requestBody) => {
    const pathSource = requestBody.pathSource;
    const pathDest = requestBody.pathDest;
    const subdirectoryId = requestBody.subdirectoryId;

    console.log(subdirectoryId);

    const subdirectory = await Subdirectory.findOne({
        where: {
            id: subdirectoryId
        }
    });

    const path = subdirectory.path + pathDest;
    const dirExists = fs.existsSync(path.replace(/([^:]\/)\/+/g, "$1"));

    const projectExists = !dirExists ? await Project.count({
        where: {
            [Op.or]: [{
                pathDest: pathDest
            }, {
                pathSource: pathSource
            }]
        }
    }) : 0;

    const isExist = dirExists || projectExists > 0;

    return {
        data: {
            isExist: isExist,
            message: isExist ? 'Project already migrated' : null
        } 
    }
}

module.exports = {
    create,
    data,
    checkExists
}