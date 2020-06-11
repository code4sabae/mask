const http = require('http')
const fs = require('fs')

const CONTENT_TYPE = {
  'html' : 'text/html; charset=utf-8',
  'png' : 'image/png',
  'gif' : 'image/gif',
  'jpg' : 'image/jpeg',
  'txt' : 'text/plain',
  'js' : 'text/javascript',
  'json' : 'application/json',
  'csv' : 'text/csv',
  'css' : 'text/css',
  'pdf' : 'application/pdf',
  'ico' : 'image/vnd.microsoft.icon',
}

const serveWeb = function(res, fn) {
  fn = '.' + fn
  if (fn.indexOf('..') >= 0) {
    return
  }
  if (fn.endsWith('/'))
    fn += "index.html"
  
  const ext = fn.substring(fn.lastIndexOf('.') + 1)
  let type = CONTENT_TYPE[ext]
  if (!type)
    type = 'text/plain'
  try {
    const b = fs.readFileSync(fn)
    res.writeHead(200, { 'Content-Type' : type })
    res.write(b)
  } catch (e) {
    res.writeHead(404)
  }
}

const server = http.createServer()
server.on('request', function(req, res) {
  console.log(req.url)
  serveWeb(res, req.url)
  res.end()
})
server.listen(8880)
