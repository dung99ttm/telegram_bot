FROM node:16-alpine3.15
WORKDIR /app
COPY . .
RUN npm install
CMD ["node", "index.js"]
EXPOSE 5000
