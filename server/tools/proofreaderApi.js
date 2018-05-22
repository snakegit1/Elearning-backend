var cmd = require('node-cmd');
var createHtml = require('create-html');
var fs = require('fs');
var path = require('path');

var url = path.join(__dirname, '..', '..', 'tmp', 'index.html');

//const getAsync = Promise.promisify(cmd.get, { multiArgs: true, context: cmd })

function createHtmlFile(body) {
    var html = createHtml({
        title: 'example',
        scriptAsync: true,
        lang: 'en',
        body: `<div class="content">${body}</div>`
    });
    fs.writeFileSync(url, html, 'UTF-8');
}

exports.checkFile = function (text, callback) {
    createHtmlFile(text);
    runCmd((data) => { callback(data); });
};

function runCmd(callback) {    
    cmd.get(
        `proofreader -f ${url}`,
        (err, data, stderr) => {
            callback(data);
        }
    );
}