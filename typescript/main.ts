import { createServer, IncomingMessage, ServerResponse, Server } from 'http'
import { parse, UrlWithStringQuery } from 'url'

const helloWorldHandler = (req: IncomingMessage, res: ServerResponse, name: string) => {
  switch (req.method) {
    case "GET":
      res.write(`Hello ${name}`)
      break
    default:
      res.statusCode = 404
      break
    }

    res.end()
}

const loggingMiddleware = (req: IncomingMessage, res: ServerResponse, next: (req: IncomingMessage, res: ServerResponse, name: string) => void, options: string) => {
    console.log("logging...")
    next(req, res, options)
}

const router = (req: IncomingMessage, res: ServerResponse) => {
  // GET /hello/{name}
  const parsedUrl: UrlWithStringQuery = parse(req.url)
  // path: /a/b/c => ['', a, b, c]
  // path: / => ["",""]
  const splitedPath: string[] = parsedUrl.path.split("/")
    
  const firstDepthAction: string = splitedPath[1]
  switch (firstDepthAction) {
    case "hello":
      const helloNameParams: string = splitedPath[2]
      loggingMiddleware(req, res, helloWorldHandler, helloNameParams)
      break
    default:
      res.statusCode = 404
      res.end()
      break
    }
}

const server: Server = createServer(router)
server.listen(8000)