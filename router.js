const fs = require('fs');

const route = (handle, path, response) => {
  console.log('server received request at url: ' + path);

  if(typeof handle[path] === 'function') {
    handle[path](response);
  } else {
    console.log('No Handler for ' + path);
    // response.writeHead(200, { 'Content-Type': 'text/plant' });
    // response.write('Page not Found');
    response.writeHead(200, { 'Content-Type': 'text/html' });
    const myReadStrm = fs.createReadStream(__dirname + '/error.html', 'utf8');
    myReadStrm.pipe(response);
  }
}

module.exports.route = route;
