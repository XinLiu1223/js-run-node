const fs = require("fs");

const index = response => {
  response.writeHead(200, { "Content-Type": "text/html" });
  const myReadStrm = fs.createReadStream(
    __dirname + "/responseView/index.html",
    "utf8"
  );
  myReadStrm.pipe(response);
};

const getJson = (response, params) => {
  response.writeHead(200, { "Content-Type": "application/json" });
  // const myObj = {
  //     name: 'Xin',
  //     job: 'Developer'
  // };
  console.log("check params: " + JSON.stringify(params));
  // Object.assign(myObj, params);
  // response.end(JSON.stringify(myObj));
  response.end(JSON.stringify(params));
};

module.exports = {
  index,
  getJson
};
