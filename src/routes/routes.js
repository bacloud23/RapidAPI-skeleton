import messages from './messages.js'
import rejectSpam from "./middlewares/rejectSpam.js"

async function routes(fastify, options) {

    const englishMessage = messages('en', fastify)
    const frenchMessage = messages('fr', fastify)

    fastify.get("/", { preHandler: rejectSpam }, async (request, reply) => {
        reply.view("./index", englishMessage)
    })
    fastify.get("/examples", { preHandler: rejectSpam }, async (request, reply) => {
        reply.view("./examples", englishMessage)
    })

}

export default routes
