# Uses a Node.js image as a base
FROM node:latest

# Sets the working directory
WORKDIR /app

# Copy the package.json and package-lock.json files
COPY package*.json ./

# Install project dependencies
RUN npm install

# Copy the rest of the project code
COPY . .

# Compiles the frontend code
RUN npm run build

# Install static HTTP server
RUN npm install -g serve

# Exposes the port the server will run on
EXPOSE 5173

# Command to start the application
# CMD ["serve", "-s", "build"]
CMD ["npm", "run", "dev"]

