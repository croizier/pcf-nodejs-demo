// get port number from cloud platform
const port = process.env.PORT || 8080

const host = '0.0.0.0'

let requests = 0

function metrics() {
    return {
        name: "requests",
        measurements: [
            { statistics: "Count", value: requests }
        ],
        availableTags: []
    }
}

function handler(req, res) {
    requests += 1

    let date = new Date().toISOString()
    console.log(date, req.method, req.url)

    res.setHeader('Content-Type', 'application/json')
    if (req.url === '/metrics' ||
        req.url === '/actuator/metrics') {
        res.write(JSON.stringify({ names: [ "requests" ] }))
    } else if (req.url === '/actuator/metrics/requests') {
        res.write(JSON.stringify(metrics()))
    } else if (req.url === '/health') {
        // health-check-http-endpoint
    } else {
        console.error(date, 'file not found')
        res.writeHead(404)
    }
    res.end()
}

console.log('listening on interface', host, 'on port', port, '...')
require('http').createServer(handler).listen(port, host)
