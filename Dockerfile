FROM seleniarm/standalone-chromium:latest

USER root

# Install Node.js
RUN apt-get update && apt-get install -y \
    curl \
    && curl -fsSL https://deb.nodesource.com/setup_20.x | bash - \
    && apt-get install -y nodejs \
    && rm -rf /var/lib/apt/lists/*

# Create app directory and set permissions
WORKDIR /app
RUN mkdir -p /home/seluser/.npm && \
    chown -R 1000:1000 /app /home/seluser/.npm

# Switch to non-root user for npm operations
USER 1000:1000

# Install app dependencies
COPY --chown=1000:1000 package*.json ./
RUN npm install

# Bundle app source
COPY --chown=1000:1000 . .

CMD ["npm", "run", "test"] 