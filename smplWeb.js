const http = require('http');
const fs = require('fs');

const onRequest = (request, response) => {
  console.log('server received request');
  // response.writeHead(200, { 'Content-Type': 'text/plant' });
  // response.write('Hello from node web');
  // response.writeHead(200, { 'Content-Type': 'application/json' });
  // const myObj = {
  //     name: 'Xin',
  //     job: 'Developer'
  // };
  // response.end(JSON.stringify(myObj));
  response.writeHead(200, { 'Content-Type': 'text/html' });
  const myReadStrm = fs.createReadStream(__dirname + '/index.html', 'utf8');
  myReadStrm.pipe(response);
};

const server = http.createServer(onRequest);

server.listen(3000, '127.0.0.1');
console.log('node web started on localhost port 3000');

// json test
const testObj = {
    name: 'Xin',
    job: 'Developer'
};

// let jsonStr = JSON.stringify(testObj);
// console.log('json string: ' + jsonStr);

JSON.parse(JSON.stringify(testObj));
// console.log('json obj: ' + jsonObj);
