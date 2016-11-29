var fs = require('fs');
var path = require('path');
var async = require('async');
var Handlebars = require('handlebars');

var readline = require('readline');


var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
var templates = [
    {
        templatePath: 'templates/config/default.tpl.json',
        destinationPath: 'config/default.json'
    }
];

var config = {
    packageName:  __dirname.split(path.sep).pop(),
    deploymentEndpoint: 'http://deployment.me-ventures.com/api/v1/image-update'
};

async.series([
    promptUserForConfirmation,
    promptUserForPackageName,
    rewritePackageFileName,
    writeTemplates,
    exit
]);


function promptUserForConfirmation( callback ){
    rl.question('Do you want to init this project? (y/n) [n]: ', function(answer){
        switch( answer ){
            case 'y':
                return callback();

            default:
                exit();
        }
    });
}

function promptUserForPackageName( callback ){
    rl.question(`Please enter package name [${config.packageName}]: `, function(answer){
        if( answer ){
            config.packageName = answer;
        }

        return callback();
    });
}

/**
 * Open the package.json and do the following things:
 *
 *  - Change the project name
 *  - Remove the post-install
 *
 * @param callback
 * @returns {*}
 */
function rewritePackageFileName( callback ){
    var data = JSON.parse(fs.readFileSync('package.json').toString());

    data.name = config.packageName;
    delete data.scripts.postinstall;

    fs.writeFileSync('package.json', JSON.stringify(data, null, 2));

    return callback();
}

function writeTemplates( callback ){
    var jobs = [];
    templates.forEach((tpl) => {
        jobs.push(function(done){
            var source = fs.readFileSync(tpl.templatePath).toString();
            var template = Handlebars.compile(source);

            fs.writeFileSync(tpl.destinationPath, template(config));

            return done();
        });
    });

    async.parallel(jobs, function(){
        return callback();
    });
}

function exit(){
    rl.close();
    process.exit();
}




