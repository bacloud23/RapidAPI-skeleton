// TODO: this is an example to validate query parameters

import { languages } from "../../variables.js"

const api1Q = {
    type: "object",
    required: ["phrase"],
    properties: {
        phrase: {
            type: "string",
            allOf: [
                { minLength: 2 },
                { maxLength: 200 }
            ]
        }
    },
    additionalProperties: false,
}

// word, lang, ['fr', 'ar'], 3
const api2Q = {
    type: "object",
    required: ["word", "source"],
    properties: {
        word: {
            type: "string",
            allOf: [
                { minLength: 2 },
                { maxLength: 17 }
            ]
        },
        source: {
            type: "string",
            enum: languages
        },
        target: { type: "array", default: [] },
        limit: {
            type: "integer", allOf: [
                { maximum: 10 },
                { minimum: 1 }
            ]
        },
        score: {
            type: "number", allOf: [
                { maximum: 1 },
                { minimum: 0.01 }
            ]
        },
    },
    additionalProperties: false,
}

export { api1Q, api2Q }