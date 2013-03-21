var exec = require("child_process").exec;
var path = require("path");

exports.send = function(){
    
    options = {
        title: 'Notification',
        subtitle: new Date().toJSON(),
        message: 'Nothing',
        group: 'ALL'
    }
    
    if( typeof(arguments[0]) == 'object' ){
        for(argument in arguments[0]){
            if(options[argument] != null && arguments[0] != undefined){
                options[argument] = arguments[0][argument]
            }
        }
    } else {
        var i = 0;
        for(option in options){
            if(arguments[i] != null && arguments[i] != undefined){
                options[option] = arguments[i];
            }
            i++;
        }
    }

    var attrs = ''
    for(option in options){
        if(options[option] != ''){
            attrs += ' -' + option + ' "' + options[option] + '"';
        }
    }
    
    var command = path.join(__dirname, '../lib/terminal-notifier.app/Contents/MacOS/terminal-notifier');
    command += attrs
    
    exec(command, function(e){
        if(e){
            console.log(e);
        }
        console.log('Sended!');
    });
}
