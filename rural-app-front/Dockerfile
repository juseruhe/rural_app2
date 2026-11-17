FROM node:24-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install -g @ionic/cli && npm install
COPY . .
EXPOSE 8100
CMD ["ionic", "serve", "--external", "--port=8100"]