FROM node:20.11.1

WORKDIR /app

COPY package*.json tsconfig.json ./
RUN npm install

EXPOSE 4000
CMD ["npm", "run", "dev"]