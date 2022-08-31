import assert from "assert";
import { nanoid } from "nanoid";
import { config as dotenv } from "dotenv";
import { createRequire } from "module";
import path from "path";
import { fileURLToPath } from "url";
const require = createRequire(import.meta.url);
let hash = require("object-hash");
const fs = require("fs");
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv();

console.log(`Running on environment ${process.env.NODE_ENV}`);

let Annoy, APIStatus;
APIStatus = ["Service is UP"];
// Prior dependencies loading
// For instance we load annoy  
// try {
//   Annoy = require("annoy");
// } catch (e) {
//   APIStatus.push("Annoy is down");
//   console.warn(
//     "oh no no annoy module. I hope this is not production environment"
//   );
//   assert(
//     process.env.NODE_ENV === "localhost",
//     "Refuse to start because: Annoy not present"
//   );
// }



// In-memory models holder
let models = {
  index: {},
  model1: {},
  model2: {},
  // ...
};


function loadModels(params) {
  // assign models to models
}

let api1Response = () => {
  return {
    model: undefined,
    input: {
      param1: undefined,
      param2: undefined,
      // ...
    },
    result: {
      /** prediction results */
    },
    error: undefined,
  };
};

let api2Response = () => {
  return {
    model: undefined,
    input: {
      param1: undefined,
      param2: undefined,
      // ...
    },
    result: {
      /** prediction results */
    },
    error: undefined,
  };
};

/**
 * @param { Object } params initialization params (scope is deployment)
 * @param { import('fastify').FastifyInstance } app the Fastify app
 */
const api = function (languages, app) {
  this.meta = async function () {
    return {
      description:
        "API description",
      deployment: app.latestDeployment,
      APIStatus,
    };
  };

  loadModels(languages);
  // Dummy API1
  this.api1 = async function (params) {
    const response = api1Response();
    response.input = params;
    response.input_hash = hash(response.input);
    response.model = "name of method of calculation";
    // Depending on parameters do the consequent processing
    // response.result = process1(params)

    return response;
  };
  // Dummy API2
  this.api2 = async function (params) {
    const response = api2Response();
    response.input = params;
    response.input_hash = hash(response.input);
    response.model = "name of method of calculation";
    // Depending on parameters do the consequent processing
    // response.result = process2(params)

    return response;
  };
}

const version = "0.0.1";
// Wrap all calls, to add some generic useful values like:
// call time, call unique ID, and to have a unified response format
// You can do logging or other things.
function traceMethodCalls(obj) {
  console.log("wrapping brain API");
  const handler = {
    get(target, propKey, receiver) {
      const origMethod = target[propKey];
      return async function (...args) {
        if (propKey === "meta") return await origMethod.apply(this, args);
        let externalResponse = {
          call_response: undefined,
          call_id: nanoid(10),
          api_name: propKey,
          api_version: version,
          call_time: new Date(),
          call_error: undefined,
          server_error: undefined,
        };
        try {
          let internalResponse = origMethod.apply(this, args);
          externalResponse.call_response = await internalResponse;
          externalResponse.call_error = internalResponse.error;
        } catch (error) {
          externalResponse.server_error = error.message;
        }
        return externalResponse;
      };
    },
  };
  return new Proxy(obj, handler);
}

export default (params, app) => traceMethodCalls(new api(params, app));
