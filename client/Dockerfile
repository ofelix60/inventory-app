  FROM node
  WORKDIR /app
  COPY package.json .

  ARG NODE_ENV
  RUN if [ "$NODE_ENV" = "development" ]; \
          then npm install; \
          else npm install --omit=dev; \
          fi

  COPY . ./
  ENV PORT 3000
  EXPOSE $PORT
  CMD ["npm", "start" ]




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


# v2
# FROM node:18-alpine

# COPY server /app/server 
# COPY client /app/client

# RUN cd /app/server && npm install
# RUN cd /app/client && npm install

# # Install concurrently to run both processes in parallel
# RUN npm install -g concurrently

# # Expose ports for the server and client
# EXPOSE 8000
# EXPOSE 3000

# # Run the server and client in parallel
# CMD concurrently \
#   "node /app/server/server.js" \
#   "npm start --prefix /app/client -- --port 3000"




# v3

#   FROM node:18-alpine

#   ENV NODE_ENV=production
  
#   COPY server /app/server 
#   COPY client /app/client

#   RUN cd /app/server && npm install
# #   ENV PORT=8000
# #   EXPOSE $PORT

#   RUN cd /app/client && npm install
#   ENV PORT=3000
#   EXPOSE $PORT

#   CMD [ "node", "/app/server/server.js", "npm", "start", "--prefix", "/app/client" ]