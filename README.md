## api-skeleton

This is an example skeleton project for a machine learning API. To be deployed on RapidAPI for instance.  
I based this skeleton on my own API which is hosted here https://rapidapi.com/bacloud22/api/word-to-word-translator1  

### Details
API relies on machine learning models. More exactly, it relies on some public dictionaries embedding which can be download from the internet.

The deployment process goes like the following:

`deploy.sh` holds initialization tasks like download the raw models. It is up to you to either use bash again to
* build your ML models from the raw models using bash
* Call `npm run your_command` to build models 
* Or use raw models directly if you don't need to build anything prior to running the node app

1. Because I tried Fastify and because it appears to be the fastest and most complete web routing framework, I based my API on NodeJS
2. To have a reproducible environment, I'm using Docker pulling the `node:Alpine` image.
3. If you need some `node-gyp` based dependencies (generally needed for c++/go NodeJS wrapping libraries), My setup is actually a perfect working matrix of versions. Otherwise it is hell actually to get these dependencies working ! 

Voila, Just check the many `TODO:` keywords inside the project and change with your particular case.

If you like the approach smash the like button !

### License
MIT
