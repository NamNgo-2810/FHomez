FROM node:10.19.0

# Create app directory
WORKDIR /app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY . .

RUN cd backend/home_service/
#RUN cd backend/auth_service/
RUN npm install
# If you are building your code for production
# RUN npm ci --only=production

EXPOSE 5001
CMD sh ./home-service.sh
#CMD sh ./auth-service.sh
