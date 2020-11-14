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
   "endpoint": "https://fcm.googleapis.com/fcm/send/cCCImtiptLo:APA91bHqlDHO4Fce0GsdMpK3dSqNX_nTRDLLhmu9kQ1sNx8Dx1uvjIPQaf35VgIsozMmnkN2l0qPc4E5VaU9P2tmF5-aX15DQMGE5ohgkcNDOmXDt45OlCH57-jMiBlpB42kgFslpnSO",
   "keys": {
       "p256dh": "BIENA4/n55/guJ3azegDoQVl34hMszpctfWwyFu5lfZlryIV3a7Q8lexDACK4d1p9G4ieqlTAIYsYNd8m79nyAs=",
       "auth": "HDfdElrQua3LfpfSqLpRcg=="
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