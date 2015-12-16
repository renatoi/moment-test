var moment = require('moment-timezone');
var tz = moment().tz("America/Los_Angeles").format();
document.getElementById("app").innerHTML = tz;
