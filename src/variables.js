import { dirname } from 'path';
import path from 'path';
import { fileURLToPath } from 'url';
import { config as dotenv } from 'dotenv'
dotenv()
// import S from 'fluent-json-schema'

const __dirname_currentDir = () => dirname(fileURLToPath(import.meta.url));

const __dirname_parentDir = () => { 
    let current = __dirname_currentDir().split(path.sep)
    current.pop()
    return current.join(path.sep)
};

const languages = process.env.LANGUAGES.split(',')

export { __dirname_currentDir, __dirname_parentDir, languages } 