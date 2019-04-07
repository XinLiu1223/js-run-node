const fs = require('fs');

const index = (response) => {
  response.writeHead(200, { 'Content-Type': 'text/html' });
  const myReadStrm = fs.createReadStream(__dirname + '/responseView/index.html', 'utf8');
  myReadStrm.pipe(response);
};

const getJson = (response) => {
  response.writeHead(200, { 'Content-Type': 'application/json' });
  const myObj = {
      name: 'Xin',
      job: 'Developer'
  };
  response.end(JSON.stringify(myObj));
};

module.exports = {
  index,
  getJson
}
