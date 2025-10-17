const http = require("http");
const fs = require("fs");
const path = require("path");

const port = 8000;

const mimeTypes = {
  ".html": "text/html",
  ".css": "text/css",
  ".js": "application/javascript",
  ".jpeg": "image/jpeg",
  ".json": "application/json"
};

const server = http.createServer((req, res) => {
  console.log("Server received a request:", req.url);

  let filePath = req.url === "/" ? "index.html" : req.url.substring(1);
  let extname = path.extname(filePath).toLowerCase();
  let contentType = mimeTypes[extname] || "application/octet-stream";

  fs.readFile(filePath, (err, data) => {
    if (err) {
      if (err.code === "ENOENT") {
        res.writeHead(404, { "Content-Type": "text/plain" });
        res.end("404 Not Found");
      } else {
        res.writeHead(500, { "Content-Type": "text/plain" });
        res.end("500 Internal Server Error");
      }
    } else {
      res.writeHead(200, { "Content-Type": contentType });
      res.end(data);
    }
  });
});

server.listen(port, () => {
  console.log(`Node server running on ${port}`);
});
