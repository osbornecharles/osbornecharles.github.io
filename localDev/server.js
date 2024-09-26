import { createServer } from 'node:http';
import * as fs from 'node:fs';

const hostname = '127.0.0.1';
const port = 3000;
const devEnv = 'development';
const env = process.env.NODE_ENV;

let contentEncoding;

function parseURL(request) {
  if (request.url == '/') {
    request.url = '/index.html';
  }
  //all static files are in src 
  request.url = `./src${request.url}`;
}

function parseHeaders(request) {
  let headers = request.headers;
  /**
  if (headers.hasOwnProperty('accept-encoding')) {
    let encodings = headers['accept-encoding'].split(',');
    if (encodings.includes('gzip')) {
      contentEncoding = 'gzip';
    }
  }
  */
}

function parseRequest(request) {
  parseURL(request);
  parseHeaders(request);
};

const server = createServer((req, res) => {
  console.log(`request to: ${req.url}`);
  parseRequest(req);
  if (contentEncoding) {
    res.setHeader('Content-Encoding', contentEncoding);
  }
  if (req.url.endsWith('.html')) {
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    fs.readFile(`${req.url}`, 'utf8', (err, data) => {
      if (err) {
        throw err;
      }
      if (env === devEnv) {
        data = data.replace(/<meta name="environment" content="\w*"/, '<meta name="environment" content="development"');
      }
      res.statusCode = 200;
      console.log(`response header: ${res.getHeader('Content-Type')}`)
      res.write(data);
      res.end();
    });
  }
  else if (req.url.endsWith('.js')) {
    res.setHeader('Content-Type', 'application/javascript');
    fs.readFile(`${req.url}`, (err, data) => {
      if (err) {
        throw err;
      }
      res.statusCode = 200;
      console.log(`response header: ${res.getHeader('Content-Type')}`)
      res.write(data);
      res.end();
    });
  }
  else if (req.url.endsWith('.css')) {
    res.setHeader('Content-Type', 'text/css');
    fs.readFile(`${req.url}`, (err, data) => {
      if (err) {
        throw err;
      }
      res.statusCode = 200;
      console.log(`response header: ${res.getHeader('Content-Type')}`)
      res.write(data);
      res.end();
    });
  }
  else if (req.url.endsWith('.jpg')) {
    res.setHeader('Content-Type', 'image/jpeg');
    fs.readFile(`${req.url}`, (err, data) => {
      if (err) {
        throw err;
      }
      res.statusCode = 200;
      console.log(`response header: ${res.getHeader('Content-Type')}`)
      res.write(data);
      res.end();
    });
  }
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
