import build from './build.js'


async function start() {
  const app = await build({
    logger: { level: 'error', file: './logs/all.log' }, disableRequestLogging: true,
    ajv: {
      customOptions: {
        coerceTypes: 'array'
      }
    }
  })
  
  try {
    await app.listen({ host: '0.0.0.0', port: 3000 })
    await app.ready()
    if (process.env.NODE_ENV === 'localhost')
      app.swagger()
  } catch (err) {
    app.log.error(err)
    process.exit(1)
  }
}

start()
