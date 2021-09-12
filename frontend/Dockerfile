FROM node:14.17.3

# set working directory
WORKDIR /src

# add `/app/node_modules/.bin` to $PATH
ENV PATH /node_modules/.bin:$PATH

# install app dependencies
COPY package.json .
RUN npm install
RUN npm install react-scripts@3.4.1 -g --silent

# add app
COPY . .

# start app
CMD ["npm", "start"]