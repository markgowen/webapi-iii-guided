const express = require('express'); // importing a CommonJS module
const helmet = require('helmet');

const hubsRouter = require('./hubs/hubs-router.js');

const server = express();

const Logger = (req, res, next) => {
  const { url, method } = req;
  console.log(`Logged ${url} and ${method}`);
  next();
};

server.use(express.json());
server.use(helmet());
server.use('/api/hubs', hubsRouter);

server.get('/', (req, res) => {
  const nameInsert = req.name ? ` ${req.name}` : '';

  res.send(`
    <h2>Lambda Hubs API</h2>
    <p>Welcome${nameInsert} to the Lambda Hubs API</p>
    `);
});

module.exports = server;
