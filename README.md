MacOS notify
============

Notifications from Node.js apps for MacOS, Windows and Linux (Ubuntu).

Methods
-------

**send**

```js
var mac_notify = require('mac_notify');

mac_notify.send({title: 'Title', subtitle: 'subtitle', message: 'message', group: 'group'});
```

For MacOS
---------

 * **title** — Notification
 * **subtitle** — NOW_DATE
 * **message** — Nothing
 * **group** — ALL

For Windows
-----------

 * **title** — Notification
 * **message** — Nothing
 * **expireTime** — 3000 (in miliseconds)
 * **icon** — "" (available *error*, *important* and paths to images)

For Linux
---------

 * **title** — Notification
 * **message** — Nothing
 * **group** — ALL
 * **expireTime** — 3000 (in miliseconds)
 * **icon** — "" (available *error*, *important* and paths to images)
 * **urgency** — low (available *low*, *normal*, *critical*)

If you specify empty string (''), attribute will be turned off.
If you padd *null* or *undefined*, attribute will be default.

Specifies the ‘group’ a notification belongs to. For any ‘group’ only _one_
notification will ever be shown, replacing previously posted notifications.
See terminal-notifier [documentation](https://github.com/alloy/terminal-notifier/blob/master/README.markdown).


©
-----
Using [terminal-notifier](https://github.com/alloy/terminal-notifier) by [alloy](https://github.com/alloy).

For Linux notify-send (libnotify-bin package).

For Windows [notify-send](http://rodnic.net/notify-send/ru-index.html).
