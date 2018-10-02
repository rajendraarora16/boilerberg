const Koa = require('koa');
const Router = require('koa-router');
const cors = require('@koa/cors');
const cookiesMiddleware = require('universal-cookie-koa')
const { join } = require('path');
const next = require('next');
const LRUCache = require('lru-cache');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

const port = parseInt(process.env.PORT, 10) || 3000

app.nextConfig.poweredByHeader = false

/**
 * This is where we cache our rendered HTML pages
 */
const ssrCache = new LRUCache({
  max: 100,
  maxAge: 1000 * 60 * 60, // It makes 1 hour.
});

app
  .prepare()
  .then(() => {
    const server = new Koa();
    const router = new Router();   

    server.use(require('koa-cash')({
      get (key, maxAge) {
        return ssrCache.get(key)
      },
      set (key, value) {
        ssrCache.set(key, value)
      }
    }))

    router.get('/service-worker.js', async ctx => {
      const pathname = await join(__dirname, '.next', 'service-worker.js')
      ctx.body = await app.serveStatic(ctx.req, ctx.res, pathname)
      ctx.respond = true
    })
    
    router.get('*', async (ctx) => {
      await handle(ctx.req, ctx.res)
      ctx.respond = false
    })

    server.use(cors({
      origin: '*',
      allowMethods: ['GET', 'PUT', 'POST', 'PATCH', 'DELETE', 'HEAD', 'OPTIONS'],
    }))
    .use(cookiesMiddleware())

    server.use(async (ctx, next) => {
      ctx.res.statusCode = 200
      ctx.set('X-Frame-Options', 'SAMEORIGIN')
      await next()
    })

    /* Main router middleware - should be used after other routes */
    server.use(router.routes())

    /* eslint-disable no-console */
    server.listen(port, (err) => {
      if (err) throw err;
      console.log('DEV server running at http://localhost:3000');
    });
  })
  .catch((ex) => {
    console.error(ex.stack);
    process.exit(1);
  });
