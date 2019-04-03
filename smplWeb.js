const http = require('http');

const startService = (route, handle) => {
  const onRequest = (request, response) => {
    route(handle, request.url, response);
  };
  const server = http.createServer(onRequest);
  server.listen(3000, '127.0.0.1');
  console.log('node web started on localhost port 3000');
}

module.exports.startService = startService;
