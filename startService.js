const server = require('./webServices/smplWeb');
const router = require('./webServices/router');
const handler = require('./webServices/routerRespHandler');

// services API
let handle = {};
handle['/'] = handler.index;
handle['/index'] = handler.index;
handle['/getJson'] = handler.getJson;

// It is the same with how we implement callback function
// the callback wrapper function
// in welcome.js from line 92 to 219
// the startService it the callback function, wrapper
// route is the callback, handle is the pass in param0
// for the callback, similar with reducer callback
// of the initial value
// and handle infact is the 3 callback function obj reference!
server.startService(router.route, handle);
