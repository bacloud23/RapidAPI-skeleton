import fastify from "fastify"
import serve from '@fastify/static'
import view from '@fastify/view'
import * as Eta from 'eta'
import * as path from 'path'
import { languages, __dirname_parentDir } from './variables.js'
import routes from "./routes/routes.js"
import APIs from "./routes/api.js"
import fastifySwagger from '@fastify/swagger'
import configuration from "./configuration.js"
import { config as dotenv } from 'dotenv'
dotenv()

export default async function build(opts) {
  const app = fastify(opts)

  app.register(view, {
    engine: {
      eta: Eta,
    },
    templates: 'templates',
    options: { useWith: true }
  })

  app.register(serve, {
    root: path.join(__dirname_parentDir(), 'public'),
    prefix: '/p'
  })

  app.register(function (instance, options, done) {
    instance.setNotFoundHandler(function (request, reply) {
      return reply.status(404).send({ message: 'Resource not found. Please check API documentation' })
    })
    done()
  }, { prefix: '/v1' })

  app.decorate('latestDeployment', {
    time: new Date().toLocaleString(),
    version: '0.0.1',
    supported: languages
  })
  
  app.setErrorHandler(function (error, request, reply) {
    if (error.validation) {
      app.log.warn({
        error: 'validation error',
        message: `Request failed validation: ${error.validationContext}`
      })
      reply.code(400).send({
        error: 'validation error',
        message: `Request failed validation: ${error}. Check '/api/meta' for more`
      });
    }
    reply.status(422).send(error)
  })

  app.register(routes)
  app.register(APIs, { prefix: 'api' })

  if (process.env.NODE_ENV === 'localhost') {
    await app.register(fastifySwagger, configuration.swagger)
    app.put('/some-route/:id', configuration.swaggerExample, (req, reply) => { })
  }
  return app
}