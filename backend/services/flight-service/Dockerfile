FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 8086
# Run Prisma generate, deploy, seed, and start the app
CMD ["npm", "run", "generate:deploy:seed:start"]