#   FROM node
#   WORKDIR /app
#   COPY package.json .

#   ARG NODE_ENV
#   RUN if [ "$NODE_ENV" = "development" ]; \
#           then npm install; \
#           else npm install --omit=dev; \
#           fi

#   COPY . ./
#   ENV PORT 8000
#   EXPOSE $PORT
#   CMD ["node", "server.js" ]

  FROM node:alpine
  
  COPY server /app/server 
  COPY client /app/client

  RUN cd /app/client && npm install
  RUN cd /app/server && npm install


  CMD [ "node", "/app/server/server.js", "npm", "start", "--prefix", "/app/client" ]