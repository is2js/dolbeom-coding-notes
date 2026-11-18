// Run this file beside the three course card files.
var http = require('http');
var fs = require('fs');
var path = require('path');

// Only the files needed by this card are served.
var files = {
  '/': ['index.html', 'text/html; charset=utf-8'],
  '/index.html': ['index.html', 'text/html; charset=utf-8'],
  '/style.css': ['style.css', 'text/css; charset=utf-8'],
  '/script.js': ['script.js', 'text/javascript; charset=utf-8']
};

http.createServer(function (request, response) {
  var route = request.url.split('?')[0];
  if (!Object.prototype.hasOwnProperty.call(files, route)) {
    response.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
    response.end('파일을 찾을 수 없습니다.');
    return;
  }

  var file = files[route];
  fs.readFile(path.join(__dirname, file[0]), function (error, data) {
    if (error) {
      response.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
      response.end('카드 파일이 없습니다. 같은 폴더에 ' + file[0] + '을 확인하세요.');
      return;
    }

    response.writeHead(200, { 'Content-Type': file[1] });
    response.end(data);
  });
}).listen(5173, '127.0.0.1', function () {
  console.log('강의 카드 주소: http://127.0.0.1:5173/');
  console.log('서버 종료: Ctrl+C');
});
