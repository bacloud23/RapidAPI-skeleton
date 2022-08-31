// TODO: to be run on demand. Language by language
// ex: run node build_annoy.js en

// READ models

import { createRequire } from "module";
import path from "path";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const require = createRequire(import.meta.url);

process.argv.shift();
process.argv.shift();
const filePath = path.join(
  __dirname,
  `./raw_models/model.${process.argv[0]}.vec`
);