const http = require("http");
const url = require("url");
const queryString = require("querystring");

const startService = (route, handle) => {
  // first layer closure is the most outer layer
  // now the route callback function reference
  // and the handle of the 3 callback function obj reference
  // are set to be provate
  const onRequest = (request, response) => {
    // second layer closure
    // the request and response are private
    // execute the route callback with the param of
    // these 3 private reference variable:
    // the callback function obj reference - handle
    // the path - request url and the response
    const pathName = url.parse(request.url).pathname;
    let data = [];
    request
      .on("error", err => {
        console.log(err);
      })
      .on("data", chunk => {
        data.push(chunk);
      })
      .on("end", () => {
        if (request.method === "POST") {
          data = Buffer.concat(data).toString();
          route(handle, pathName, response, queryString.parse(data));
        } else {
          let params = url.parse(request.url, true).query;
          route(handle, pathName, response, params);
        }
      });
  };
  const server = http.createServer(onRequest); // onRequest is the callback
  server.listen(3000, "127.0.0.1");
  console.log("node web started on localhost port 3000");
};

module.exports.startService = startService;
