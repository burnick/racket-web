# pull the Node.js Docker image
FROM node:19-alpine

# copy the package.json files from local machine to the workdir in container
COPY package*.json ./

RUN npm install

# copy the generated modules and all other files to the container
COPY . .

RUN yarn install

ARG NODE_ENV
ARG WDS_SOCKET_PORT
ARG PORT 
ARG API_URL

ENV NODE_ENV=$NODE_ENV
ENV API_URL=$API_URL
ENV WDS_SOCKET_PORT=$WDS_SOCKET_PORT
ENV PORT=$PORT

# our app is running on port 3000 within the container, so need to expose it
EXPOSE 3000

#RUN npm run prisma

# the command that starts our app
CMD ["node","server"]