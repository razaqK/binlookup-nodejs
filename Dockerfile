FROM node:8.11

# create the log directory
RUN mkdir -p /var/log/application/jumpay

WORKDIR /usr/src/app

# Copy from cache unless the package.json file has changed
COPY package.json /usr/src/app/

# Tell npm to use our registry
RUN npm set registry http://npm.konga.com:4873

# For development environment, we want to use pm2 to keep the code running
RUN npm install pm2@latest -g

# Install node dependencies
RUN npm install

# Map a volume for the log files and add a volume to override the code
VOLUME ["/usr/src/app", "/var/log/application/jumpay"]

# Copy entire file to docker
COPY . /usr/src/app

COPY ./bin/start.sh /usr/src/app/bin/start.sh
RUN chmod +x ./bin/start.sh /usr/src/app/bin/start.sh

EXPOSE 80
CMD [ "/usr/src/app/bin/start.sh"]