import MyBestAPI from "../../brain/MyBestAPI.js";
import rejectForeigners from "./middlewares/rejectForeigners.js"
import { api1Q, api2Q } from "./middlewares/queries.js"
import { languages } from "../variables.js";


function trim(obj) {
    for (const [key, value] of Object.entries(obj)) {
        if (typeof (value) === 'string')
            obj[key] = value.trim()
        if (Array.isArray(value))
            obj[key] = value.map(v => typeof (v) === 'string' ? v.trim() : v)
    }
    return obj
}

/**
 * Validation rules: Some are already handeled with Fastify schema.querystring
 * Other complicated validations are to be implemented here
 * @param {*} inputs 
 * @returns 
 */
function valid(inputs) {
    let valid = true
    for (const [key, value] of Object.entries(inputs)) {
        switch (key) {
            case 'param1':

                break;
            case 'param2':

                break;
        }
    }
    return valid
}

async function routes(fastify, options) {
    // Prepare your initialization parameters 'params' 
    const myBestAPI = MyBestAPI(params, fastify);

    fastify.get(
        "/meta",
        async (request, reply) => {
            return await myBestAPI.meta()
        }
    )

    fastify.get(
        "/api1",
        {
            schema: { querystring: api1Q },
            preHandler: rejectForeigners
        },
        async (request, reply) => {
            const params = trim(request.query)
            let response1 = await myBestAPI.api1(params);
            return response1
        }
    )

    fastify.get(
        "/api2",
        {
            schema: { querystring: api2Q },
            preHandler: rejectForeigners
        },
        async (request, reply) => {
            const params = trim(request.query)
            const isValid = valid(params)
            if (!isValid) {
                reply.code(400).send({
                    error: 'validation error',
                    message: `Request failed validation. Check '/api/meta' for more`
                });
                return
            }
            let response1 = await myBestAPI.api2(params)
            return response1
        }
    )
}

export default routes
