const projectTable = $('#project-table');
const projectWarning = $('#project-warning');

const modalCreateProject = $('#modal-create-project');

$(function () {
    Codebase.helpers(['select2']);

    projectTable.DataTable({
        language: dtLang,
        ajax: {
            url: document.baseURI + 'project/data'
        },
        columnDefs: [
            {
                targets: [4],
                className: 'text-center'
            }
        ],
        columns: [{
                data: 'name',
                name: 'name'
            },
            {
                data: 'Target.name',
                name: 'Target.name'
            },
            {
                data: 'pathSource',
                name: 'pathSource'
            },                        
            {
                data: 'pathDest',
                name: 'pathDest'
            },
            {
                data: 'statusBadge',
                name: 'statusBadge'
            },
            {
                data: 'createdAt',
                name: 'createdAt',
                visible: false
            }
        ],
        order: [
            [5, 'desc']
        ]
    });
});

const reloadProjectData = () => {
    Codebase.blocks('#project-block', 'state_loading');
    projectTable.DataTable().ajax.reload(() => {
        Codebase.blocks('#project-block', 'state_normal');
    }, false);
}

const projectCreateSubmit = () => {
    const pathSource = modalCreateProject.find('input[name=pathSource]').val();
    const pathDest = modalCreateProject.find('input[name=pathDest]').val();
    const subdirectoryId = modalCreateProject.find('select[name=subdirectoryId]').val();
    
    if (pathDest && subdirectoryId && pathSource) {
        Codebase.blocks('#modal-create-project .block', 'state_loading');
        $.post(document.baseURI + "project/check/exists", {
            pathSource,
            pathDest,
            subdirectoryId
        }).done((result) => {
            Codebase.blocks('#modal-create-project .block', 'state_normal');

            if (!result.data.isExist) {
                projectWarning.hide();
                modalCreateProject.find(':submit').click();
            } else {
                projectWarning.html(result.data.message);
                projectWarning.show();
            }
        });
    } else {
        modalCreateProject.find(':submit').click();
    }
}