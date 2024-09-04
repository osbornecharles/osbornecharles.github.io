import { createServer } from 'node:http';
import * as fs from 'node:fs';
import * as process from 'node:process';

const hostname = '127.0.0.1';
const port = 3000;

let contentEncoding;

console.log('test');

function parseRequest(request) {
  let headers = request.headers;
  if (headers.hasOwn('accept-encoding')) {
    let encodings = headers['accept-encoding'].split(',');
    if (encodings.includes('gzip')) {
      contentEncoding = 'gzip';
    }
  }
};

const server = createServer((req, res) => {
  //parseRequest(req);
  fs.readFile('./index.html', (err, html) => {
    if (err) {
      throw err;
    }
    res.statusCode = 200;
    res.setHeader = ('Content-Type', 'text/html; charset=utf-8');
    if (contentEncoding) {
      res.setHeader('Content-Encoding', contentEncoding);
    }
    res.write(html)
    res.end();
  });

});
server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
