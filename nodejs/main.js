const http = require('http')
const url = require('url')

const helloWorldHandler = (req, res, name) => {
    switch (req.method) {
    case "GET":
        res.write(`Hello ${name}`)
        res.end()
        break
    default:
        res.statusCode = 404
        res.end()
    }
}

const loggingMiddleware = (req, res, next, options) => {
    console.log("logging...")
    next(req, res, options)
}

const router = (req, res) => {
    // GET /hello/{name}
    const parsedUrl = url.parse(req.url)
     // path: /a/b/c => ['', a, b, c]
     // path: / => ["",""]
    const splitedPath = parsedUrl.path.split("/")
    
    const firstDepthAction = splitedPath[1]
    switch (firstDepthAction) {
    case "hello":
        const helloNameParams = splitedPath[2]
        loggingMiddleware(req, res, helloWorldHandler, helloNameParams)
    break
    default:
        res.statusCode = 404
        res.end()
    }
}

const server = http.createServer((req, res) => {
    router(req, res)
})
server.on('clientError', (err, socket) => {
    socket.end('HTTP/1.1 400 Bad Request\r\n\r\n')
})
server.listen(8000)