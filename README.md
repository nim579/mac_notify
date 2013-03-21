MacOS notify
============

Notifications from Node.js apps.

Methods
-------

**send**

```js
var mac_notify = require('mac_notify');

//attributes
mac_notify.send('Title', 'subtitle', 'message', 'group');

//object
mac_notify.send({title: 'Title', subtitle: 'subtitle', message: 'message', group: 'group'});
```

Defaults
 * **title** — Notification
 * **subtitle** — NOW_DATE
 * **message** — Nothing
 * **group** — ALL

If you specify empty string (''), attribute will be turned off.
If you padd *null* or *undefined*, attribute will be default.

Specifies the ‘group’ a notification belongs to. For any ‘group’ only _one_
notification will ever be shown, replacing previously posted notifications.
See terminal-notifier [documentation](https://github.com/alloy/terminal-notifier/blob/master/README.markdown).


©
-----
Using [terminal-notifier](https://github.com/alloy/terminal-notifier) by [alloy](https://github.com/alloy)
