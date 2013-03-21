var exec = require("child_process").exec;
var path = require("path");

exports.send = function(message, header){
    
    if(header == null){
        var header = 'Message'
    }
    
    var command = path.join(__dirname, '../lib/terminal-notifier.app/Contents/MacOS/terminal-notifier');
    command += ' -message "' + message + '" -title "' + header + '"'
    
    exec(command, function(e){
        if(e){
            console.log(e);
        }
        console.log('Sended!');
    });
}
