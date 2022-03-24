import http from 'http';
import fs from 'fs';
import path from 'path';
import { promisify } from 'util';
let stat = promisify(fs.stat);
const __dirname = path.resolve();
console.log(__dirname);
let server = http.createServer(async function (req, res) {
  let p = path.join(__dirname, './http-header-range/content.txt');
  let statObj = await stat(p);
  let total = statObj.size;
  let start = 0;
  let end = total;

  let range = req.headers['range'];
  if (range) {
    res.setHeader('Accept-Ranges', 'bytes');
    let result = range.match(/bytes=(\d*)-(\d*)/);
    start = result[1] ? parseInt(result[1]) : start;
    end = result[2] ? parseInt(result[2]) : end;
    res.setHeader('Content-Range', `bytes ${start}-${end}/${total}`);
  }
  res.setHeader('Content-Type', 'text/plain;charset=utf8');
  fs.createReadStream(p, { start, end }).pipe(res);
});
server.listen(8080);

let options = {
  hostname: 'localhost',
  port: 8080,
  path: '/',
  method: 'GET',
};

let ws = fs.createWriteStream('./http-header-range/download.txt');
let pause = false;
let start = 0;
let speed = 10;
let end = start + speed;

download();

process.stdin.on('data', function (chunk) {
  chunk = chunk.slice(0, chunk.length - 2);
  option = chunk.toString();
  switch (option) {
    case 'p':
      pause = true;
      break;
    case 'c':
      pause = false;
      download();
    default:
      if (/^s\s-[0-9]+$/.test(option)) {
        option = option.slice(3);
        speed = parseInt(option);
      }
  }
});

//--- --- ---
function download() {
  options.headers = {
    Range: `bytes=${start}-${end}`, //请求头看这里
  };

  http.get(options, function (res) {
    let range = res.headers['content-range'];
    let total = range.split('/')[1];
    let buffers = [];
    let nextEnd;
    res.on('data', function (chunk) {
      console.log(chunk + '');
      buffers.push(chunk);
    });
    res.on('end', function () {
      ws.write(Buffer.concat(buffers));
      setTimeout(function () {
        if (pause === false && start < total) {
          start = end + 1;
          nextEnd = end + speed;
          end = nextEnd + 1 < total ? nextEnd : total;
          download();
        }
      }, 1000);
    });
  });
}
