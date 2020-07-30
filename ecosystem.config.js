module.exports = {                                         
    apps: [{                                               
        name: 'Project Migration Management',         
        script: 'app.js',                                  
        watch: true, 
        watch: ['app', 'config', 'routes', 'resources'],
        ignore_watch: ['node_modules', 'temp'],            
        watch_delay: 1000,                                 
        watch_options: {                                   
            followSymlinks: false                           
        },                                                 
        log_file: `temp/logs/app-combined.log`,            
        time: true,
        env: {
            NODE_ENV: 'development'
        }                                         
    }]                                                     
};