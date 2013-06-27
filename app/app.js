var exec = require("child_process").exec;
var path = require("path");
var os   = require("os").platform();

exports.send = function(newOptions){
    
    options = {
        title: 'Notification',
        subtitle: new Date().toJSON(),
        message: 'Nothing',
        group: 'ALL',
        
        urgency: 'low',
        expireTime: 1000,
        icon: null
    }
    
    if( typeof(newOptions) == 'object' ){
        for(argument in newOptions){
            if(newOptions[argument]){
                options[argument] = newOptions[argument]
            }
        }
    }

    var attrs = ''
    for(option in options){
        if(options[option] != ''){
            attrs += ' -' + option + ' "' + options[option] + '"';
        }
    }

    var command = '';
    switch(os){
        case 'darwin':
            command = "'"+path.join(__dirname, '../lib/terminal-notifier.app/Contents/MacOS/terminal-notifier')+"'";
            command += macAttr(options);
            break;
        case 'win32', 'win64':
            command = "'"+path.join(__dirname, '../lib/notify-send.exe')+"'";
            command += winAttr(options);
            break;
        default:
            command = 'notify-send';
            command += linuxAttr(options);
            break;
    }

    exec(command, function(e){
        if(e){
            console.log('Error!', e);
        } else {
            console.log('Sended!');
        }
    });
}

function macAttr(options){
    var attrs = ''
    if(options.title) attrs += ' -title "' + options.title + '"';
    if(options.subtitle) attrs += ' -subtitle "' + options.subtitle + '"';
    if(options.message) attrs += ' -message "' + options.message + '"';
    if(options.group) attrs += ' -group "' + options.group + '"';
    return attrs;
}

function linuxAttr(options){
    var attrs = ''
    if(options.title) attrs += ' "' + options.title + '"';
    if(options.message) attrs += ' "' + options.message + '"';
    if(options.group) attrs += ' -c "' + options.group + '"';
    if(options.urgency) attrs += ' -u "' + options.urgency + '"';
    if(options.expireTime) attrs += ' -t "' + options.expireTime + '"';
    if(options.icon) attrs += ' -i "' + options.icon + '"';
    return attrs;
}

function winAttr(options){
    var attrs = ''
    if(options.title) attrs += ' "' + options.title + '"';
    if(options.message) attrs += ' "' + options.message + '"';
    if(options.expireTime) attrs += ' -t ' + options.expireTime;
    if(options.icon) attrs += ' -i "' + options.icon + '"';
    return attrs;
}
