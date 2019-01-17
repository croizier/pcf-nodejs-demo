let counter = 0
let host = '0.0.0.0'
// PORT PCF
let port = process.env.PORT || 8080
console.log('listening on interface', host, 'on port', port)
require('http').createServer((req, res) => {
  counter += 1

  let date = new Date().toISOString()
  console.log(date, req.method, req.url)

  res.setHeader('Content-Type', 'application/json')
  if (req.url === '/counter') {
    res.write(JSON.stringify({counter}))
  } else if (req.url === '/health') { // health-check-http-endpoint
  } else {
    console.error(date, 'file not found')
    res.writeHead(404)
  }
  res.end()
}).listen(port, host)
