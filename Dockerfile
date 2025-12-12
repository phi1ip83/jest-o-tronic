#docker file for fragments  microservice
#Reminder: no secrets here
#LTS node version
FROM node:22.21.0

LABEL maintainer="Philip Dos Santos <philip.dossantos.com>"
LABEL description="jest-o-tronic discord bot"

#set env to production for node
ENV NODE_ENV=production

# Reduce npm spam when installing within Docker
# https://docs.npmjs.com/cli/v8/using-npm/config#loglevel
ENV NPM_CONFIG_LOGLEVEL=warn

# Disable colour when run inside Docker
# https://docs.npmjs.com/cli/v8/using-npm/config#color
ENV NPM_CONFIG_COLOR=false

#dependencies for building
FROM node:22.21.0 AS dependencies
#default working directory
WORKDIR /app
#copy package files over to working directory
COPY package*.json ./
#install dependencies
RUN npm ci --production


# Stage 2: Production
#trimmed down node image for production use
FROM node:22.21.0-alpine AS production
#setting working dir
WORKDIR /app
#copying node modules from dependencies stage
COPY --from=dependencies /app/node_modules ./node_modules
#copy the needed source files
COPY . .
# example to copy files from ignored directories if needed
#COPY ./tests/.htpasswd ./tests/.htpasswd



# Change ownership of files to node user DISABLED FOR PROPER AWS container management
COPY --chown=node:node . /app
# Switch to non-root user
USER node

# Start server, now from correct ./src/ file instead of root....
CMD ["node", "./src/index.js"]

