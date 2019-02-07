import { createServer, IncomingMessage, ServerResponse, } from 'http'
import { parse, UrlWithStringQuery, } from 'url'

enum Method {
  GET, POST, // ...
}

type Handler = (req: IncomingMessage, res: ServerResponse) => void

class Router {
  public constructor(private method: Method, private path: string, private handler: Handler) { }

  public isAllow(method: string, path: string): boolean {
    return this.isAllowMethod(method) && this.isAllowPath(path)
  }

  public get handle(): Handler {
    return this.handler
  }

  private isAllowMethod(method: string): boolean {
    return Method[this.method] === method 
  }
  private isAllowPath(path: string): boolean {
    const url: UrlWithStringQuery = parse(path)
    return url.path.startsWith(this.path)
  }
}

class Server {
  private routers: Router[] = []
  private middlewares: Handler[] = []

  public middleware(middleware: Handler): Server {
    this.middlewares.push(middleware)
    return this
  }
  public get(path: string, handler: Handler): Server {
    this.routers.push(new Router(Method.GET, path, handler))
    return this
  }
  public post(path: string, handler: Handler): Server {
    this.routers.push(new Router(Method.POST, path, handler))
    return this
  }

  public listen(port: number): void {
    createServer((req, res) => { this.route(req, res) }).listen(port, () => console.info(`Server running at http://localhost:${port}/`))
  }

  private route(req: IncomingMessage, res: ServerResponse): void {
    this.middlewares.forEach(middleware => middleware(req, res))

    let handler: Handler
    for (const i in this.routers) {
      const router: Router = this.routers[i]
      if (!router.isAllow(req.method, req.url)) {
        continue
      }
      
      handler = router.handle
      break
    }

    // 404 not found
    if (!handler) {
      handler = (_, res: ServerResponse) => res.statusCode = 404
    }

    handler(req, res)
    res.end()
  }
}

const loggingMiddleware: Handler = (req: IncomingMessage, res: ServerResponse) => console.info('logging...')
const helloWorldHandler: Handler = (req: IncomingMessage, res: ServerResponse) => res.write('Hello World')

//
//

new Server().middleware(loggingMiddleware)
  .get('/get', helloWorldHandler)
  .post('/post', helloWorldHandler)
  .listen(8000)