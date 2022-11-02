FROM node:16

# Working Dir
WORKDIR /usr/rateyourlandlord-server

ENV USERNAME=StevenLimCA
ENV TOKEN=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

# Clone code from GitHub
RUN git clone https://${USERNAME}:${TOKEN}@github.com/StevenLimCA/rateyourlandlord-server.git .

# Install nodejs packages
RUN npm install

# Expose the API PORT
EXPOSE 8080

# Run the app
CMD ["node", "./index.js"]