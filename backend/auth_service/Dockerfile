FROM node:10.19.0

# Create app directory
WORKDIR /app

# Bundle app source
COPY . .

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
RUN npm install
# If you are building your code for production
# RUN npm ci --only=production

#Expose port to docker cient
EXPOSE 8000

#Run app
CMD npm start
