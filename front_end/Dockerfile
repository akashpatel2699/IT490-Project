FROM node:15.7.0-alpine3.10

MAINTAINER AKASH PATEL

# Create app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Copy source files to app directory on docker
COPY package*.json  /usr/src/app/

# Install dependencies
RUN npm install 

# Copying source files
COPY . /usr/src/app

# Building app
RUN npm run build

EXPOSE 3000

# Running the app
CMD "npm" "run" "dev"
 
