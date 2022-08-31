FROM node:14-alpine3.15

RUN mkdir -p /usr/src/api-skeleton
WORKDIR /usr/src/api-skeleton

# RUN apt-get update
RUN apk add git curl

COPY package.json /usr/src/api-skeleton
RUN npm i -g npm

# CONTEXT: if you have a dependency which is node-gyp dependant 
# use the following line without adding the library like you normally do in package.json 
# RUN apk add \
#     build-base vips-dev make g++ python3 go && yarn add XXXXXXXXXXXX

RUN yarn install

COPY . /usr/src/api-skeleton

# Whatever other builds
RUN yarn run build

CMD [ "yarn", "run", "start" ]


# sudo docker build -t api-skeleton .
# sudo docker run -d -it api-skeleton
# or sudo docker compose up -d --build
