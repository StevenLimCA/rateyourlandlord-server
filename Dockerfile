<<<<<<< HEAD
FROM node:18.7.0
RUN apt-get update && apt-get install -y \
  nano \
  Vim

# Working Dir
WORKDIR /code

COPY package.json package.json
COPY package-lock.json package-lock.json

# Install nodejs packages
RUN npm install

COPY . .
# Expose the API PORT
EXPOSE 8080

# Run the app
CMD ["node", "./index.js"]
=======
>>>>>>> parent of 69ca70c ( added DockerFile for deploy)
