FROM node:24-alpine
WORKDIR /app
ENV NODE_ENV=production
ENV PORT=8000
COPY package.json package-lock.json ./
RUN npm ci --omit=dev
COPY --chown=1000:1000 . .
USER 1000:1000
EXPOSE 8000
CMD ["sh", "-c", "npx sequelize-cli db:migrate && node server.js"]