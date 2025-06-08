FROM node:alpine
WORKDIR /app
EXPOSE 3000
COPY package*.json ./
RUN npm install
RUN npm install -g vite
COPY . ./
CMD ["npm", "run", "dev"]
