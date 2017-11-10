FROM node:8.9.1

ENV NPM_CONFIG_LOGLEVEL "warn"

WORKDIR /usr/src/app/

# Install global dependencies first
RUN npm install cross-env

# Install frontend dependencies to make use of the docker cache
COPY ./package.json ./
RUN npm install && npm cache clean --force

# Copy frontend source
COPY ./ ./
