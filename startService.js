const server = require('./smplWeb');
const router = require('./router');
const handler = require('./routerRespHandler');

let handle = {};
handle['/'] = handler.index;
handle['/index'] = handler.index;
handle['/getJson'] = handler.getJson;

server.startService(router.route, handle);
