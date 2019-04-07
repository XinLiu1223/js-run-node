const http = require('http');
const url = require('url');

const startService = (route, handle) => {
  // first layer closure is the most outer layer
  // now the route callback function reference
  // and the handle of the 3 callback function obj reference
  // are set to be provate
  const onRequest = (request, response) => {
    const pathName = url.parse(request.url).pathname;
    // second layer closure
    // the request and response are private
    // execute the route callback with the param of
    // these 3 private reference variable:
    // the callback function obj reference - handle
    // the path - request url and the response
    route(handle, pathName, response); 
  };
  const server = http.createServer(onRequest); // onRequest is the callback
  server.listen(3000, '127.0.0.1');
  console.log('node web started on localhost port 3000');
}

module.exports.startService = startService;
