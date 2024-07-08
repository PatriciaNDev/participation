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

# Exposes the port on which the application will run
EXPOSE 5001

# Defines arguments that will be passed by Docker Compose
ARG DB_HOST
ARG DB_NAME
ARG DB_USER
ARG DB_PASSWORD
ARG DB_PORT

# Sets environment variables based on arguments
ENV DB_HOST=$DB_HOST
ENV DB_NAME=$DB_NAME
ENV DB_USER=$DB_USER
ENV DB_PASSWORD=$DB_PASSWORD
ENV DB_PORT=$DB_PORT

# Command to start the application
CMD ["npm", "start"]
