import { createServer } from 'node:http';
import * as fs from 'node:fs';
import * as process from 'node:process';
import buttonClick from '#root/test';
import { alert2, alert3 } from '#root/test';
import * as everything from '#root/test';


const hostname = '127.0.0.1';
const port = 3000;

let contentEncoding;

console.log('everything: ', everything);
console.log('alert: ', buttonClick);
console.log('alert2: ', alert2);
console.log('alert3: ', alert3);

function parseURL(request) {
  if (request.url == '/') {
    request.url = '/index.html';
  }
}

function parseHeaders(request) {
  let headers = request.headers;
  if (headers.hasOwn('accept-encoding')) {
    let encodings = headers['accept-encoding'].split(',');
    if (encodings.includes('gzip')) {
      contentEncoding = 'gzip';
    }
  }
}

function parseRequest(request) {
  parseURL(request);
  parseHeaders(request);
};

const server = createServer((req, res) => {
  parseRequest(req);
  fs.readFile(`${req.url}`, (err, data) => {
    if (err) {
      throw err;
    }
    if (req.url.endsWith('.html')) {
      res.setHeader = ('Content-Type', 'text/html; charset=utf-8');
    }
    else if (req.url.endsWith('.js')) {
      res.setHeader = ('Content-Type', 'application/javascript');
    }
    if (contentEncoding) {
      res.setHeader('Content-Encoding', contentEncoding);
    }
    res.statusCode = 200;
    res.write(data)
    res.end();
  });
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
