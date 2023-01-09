  FROM node
  WORKDIR /app
  COPY package.json .

  RUN npm install --omit=dev;

  COPY . ./
  ENV PORT 3000
  EXPOSE $PORT
  CMD ["npm", "start" ]
