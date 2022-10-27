FROM node:17

# Working Dir
WORKDIR /usr

# Copy Package Json Files
COPY Package*.json ./

# Install Prettier (for our package's build function)
RUN npm install Prettier -g 

# Install Files
RUN npm install

#Copy Source Files
Copy . .

# Build
# RUN npm run build

# Expose the API PORT
EXPOSE 8080

CMD["node", "./index.js"]