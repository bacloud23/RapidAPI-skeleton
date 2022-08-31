#!/bin/bash

echo "pulling"
git pull

# TODO: download models to /brain/raw_models and build models to /brain/models before running the application
# For instance do the following:

# RUN for item in model1 \model2 \model3 \model4 \model5; do \
#     echo "Loading model: $item"; \
#     cd /usr/src/api-skeleton/brain/raw_models/ && curl -L -O https://the-internet.com/download/$item.vec --output $item.vec; \
#     cd /usr/src/api-skeleton; \
#     yarn run model:build -- $item; \
#     rm -rf /usr/src/api-skeleton/brain/raw_models/$item.vec; \
#     done;

echo "Building application"
sudo docker compose up -d --build
