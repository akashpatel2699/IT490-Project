FROM node:15.7.0-alpine3.10

MAINTAINER AKASH PATEL

# Create app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Installing dependencies
COPY package*.json /usr/src/app/
RUN npm install 

# Copying source files
COPY . /usr/src/app

# Building app
RUN npm run build

# Expose port 3000 to local machine
EXPOSE 3000

# Running the app in production mode
CMD ["npm", "run","start"]
