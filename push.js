var webPush = require('web-push');
 
const vapidKeys = {
   "publicKey": "BCy4OswQXlu8vNiVkQ9X9BVcn8XPc-F63nq61Jz90JlbhTpYitAXqTOC3IqmVHo7eoSnua4BZ0qs_WGL1MzT8Ow",
   "privateKey": "fqCmh9rulqEreJ1stEc91YZ3NDhiPxgyjBJrgne9dD4"
};

 
webPush.setVapidDetails(
   'mailto:example@yourdomain.org',
   vapidKeys.publicKey,
   vapidKeys.privateKey
)

var pushSubscription = {
   "endpoint": "https://fcm.googleapis.com/fcm/send/cHG4VCsVf0I:APA91bERZ-KSnZqrI0B1qNDXCWHWmL4AmtFMPSkYypx1P1oNr_16hdM-pZNGxmaDdYlDHIRbUbsuZke5ui5ItQfbDnlbwVrFZHFI-9xvjjecwVN8n-xxOHDoe9PV9AMfx4siKbWDmtRZ",
   "keys": {
       "p256dh": "BPXo+7EWVyVzB9BD4WZZ/rfXrQsYgjuSE36GlkrEGNsftiERQ5D36Q59MYGJRCxLoTvUs++JN4kD/PzlwOYadu0=",
       "auth": "1TFPObk3ye+lqdPmUZQ8AA=="
   }
};
var payload = 'Lihat apa yang baru dari Aplikasi Informasi Sepak Bola!';

var options = {
   gcmAPIKey: '394832135',
   TTL: 60
};
webPush.sendNotification(
   pushSubscription,
   payload,
   options
);