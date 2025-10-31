FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 8088
# Run Prisma generate, deploy, and start the app
CMD ["npm", "run", "generate:deploy:start"]