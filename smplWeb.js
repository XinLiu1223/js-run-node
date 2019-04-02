const http = require('http');

const onRequest = (request, response) => {
  console.log('server received request');
  response.writeHead(200, { 'Content-Type': 'text/plant' });
  response.write('Hello from node web');
  response.end();
};

const server = http.createServer(onRequest);

server.listen(3000, '127.0.0.1');
console.log('node web started on localhost port 3000');
