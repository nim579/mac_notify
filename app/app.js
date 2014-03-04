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
            options[argument] = arguments[0][argument]
        }
    } else {
        var i = 0;
        for(option in options){
            if(typeof arguments[i] !== 'undefined' && arguments[i] != null){
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
    
    var command = "'"+path.join(__dirname, '../lib/terminal-notifier.app/Contents/MacOS/terminal-notifier')+"'";
    command += attrs
    
    exec(command, function(e){
        if(e){
            console.log('Error', e);
        } else {
            console.log('Sended!');
        }
    });
}
