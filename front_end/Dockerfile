FROM node:15.7.0-alpine3.10

MAINTAINER AKASH PATEL

# Create app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Copy source files to app directory on docker
COPY . /usr/src/app

# Install dependencies
RUN npm install 

# Building app
RUN npm run build
EXPOSE 3000
 