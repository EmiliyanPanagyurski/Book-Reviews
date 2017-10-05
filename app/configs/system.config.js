SystemJS.config({
    // tell SystemJS which transpiler to use
    transpiler: 'plugin-babel',
    // tell SystemJS where to look for the dependencies
    map: {
        'plugin-babel': 'https://cdn.rawgit.com/systemjs/plugin-babel/master/plugin-babel.js',
        'systemjs-babel-build': 'https://cdn.rawgit.com/systemjs/plugin-babel/master/systemjs-babel-browser.js',

        // app script 
        'main': '../scripts/main.js',
        'router': '../configs/sammy.config.js',

        'firebase-config': '../configs/firebase.congif.js',
        'database': '../scripts/data/database.js',

        // utils
        'img-upload': '../scripts/utils/img.upload.js',
        'html-handler': '../scripts/utils/html.handler.js',
        'template-handler': '../scripts/utils/template.handler.js',
        'user-controls': '../scripts/utils/user.control.js',
        'validator': '../scripts/utils/validator.js',

        // models
        'user-model': '../scripts/data/models/user.model.js',
        'review-model': '../scripts/data/models/review.model.js',
        'comment-model': '../scripts/data/models/comment.model.js',

        //controllers
        'user-controller': '../scripts/controllers/user.controller.js',
        'review-controller': '../scripts/controllers/review.controller.js',

    },
    packages: {
        '/': {
            defaultExtension: 'js'
        }
    }
});