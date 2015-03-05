exec = require("child_process").exec
path = require("path")
os   = require("os").platform()

defaults =
    title: 'Notification'
    subtitle: new Date().toJSON()
    message: 'Nothing'
    group: 'ALL'
    urgency: 'low'
    expireTime: 3000
    icon: ''

class SendNotify
    constructor: ->
        @defaults = defaults
        return @

    send: (options, callback)->
        options = @_extend options
        @_showNotify options, callback
        return null

    _showNotify: (options, callback)->
        command = @_generateCommand options
        exec command, (err)->
            if err
                console.error 'Error:', e
                callback? err

            else
                console.log 'Send success'
                callback?()

    _extend: (options={})->
        if typeof options is 'object'
            newOptions = {}
            for key of @defaults
                if options[key]?
                    newOptions[key] = options[key]

                else
                    newOptions[key] = @defaults[key]

            return newOptions

        else
            return @defaults

    _generateCommand: (options)->
        switch os
            when 'darwin'
                return @_generateCommandMac options

            when 'win32', 'win64'
                return @_generateCommandWin options

            else
                return @_generateCommandLin options

    _generateCommandMac: (options)->
        command = []
        command.push path.join __dirname, '../lib/terminal-notifier.app/Contents/MacOS/terminal-notifier'

        command.push "-title \"#{options.title}\""       if options.title
        command.push "-subtitle \"#{options.subtitle}\"" if options.subtitle
        command.push "-message \"#{options.message}\""   if options.message
        command.push "-group \"#{options.group}\""       if options.group

        return command.join ' '

    _generateCommandWin: (options)->
        command = []
        command.push path.join(__dirname, '../lib/notify-send.exe')

        command.push "\"#{options.title}\""              if options.title
        command.push "\"#{options.message}\""            if options.message
        command.push "-c \"#{options.group}\""           if options.group
        command.push "-u \"#{options.urgency}\""         if options.urgency
        command.push "-t \"#{options.expireTime}\""      if options.expireTime
        command.push "-i \"#{options.icon}\""            if options.icon

        return command.join ' '

    _generateCommandLin: (options)->
        command = []
        command.push 'notify-send'

        command.push "\"#{options.title}\""              if options.title
        command.push "\"#{options.message}\""            if options.message
        command.push "-t \"#{options.expireTime}\""      if options.expireTime
        command.push "-i \"#{options.icon}\""            if options.icon

        return command.join ' '

module.exports = new SendNotify()
