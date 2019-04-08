const fs = require('fs');

const route = (handle, path, response, params) => {
  console.log('server received request at url: ' + path);

  // the handle is the obj reference of the 3 callback function
  // so, whatever the function passes in the function reference
  // as param, this function is called callback!
  if(typeof handle[path] === 'function') {
    handle[path](response, params);
  } else {
    console.log('No Handler for ' + path);
    // response.writeHead(200, { 'Content-Type': 'text/plant' });
    // response.write('Page not Found');
    response.writeHead(200, { 'Content-Type': 'text/html' });
    const myReadStrm = fs.createReadStream(__dirname + '/responseView/error.html', 'utf8');
    myReadStrm.pipe(response);
  }
}

module.exports.route = route;
