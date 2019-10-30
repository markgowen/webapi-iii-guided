const express = require('express'); // importing a CommonJS module
const helmet = require('helmet');
const morgan = require('morgan');

const hubsRouter = require('./hubs/hubs-router.js');

const server = express();

function Logger(req, res, next) {
  console.log(
    ` The Logger: [${new Date().toISOString()}] ${req.method} to ${req.url}`
  );

  next();
}

function gateKeeper(req, res, next) {
  const password = req.headers.password || '';
  if (!password.toLowerCase) {
    res.status(401).json({ message: `please provide a password` });
    return;
  }
  if (password.toLowerCase() === 'mellon') {
    next();
  } else {
    res.status(400).json({ you: 'cannot pass!!' });
  }
}

// Global Middleware
server.use(gateKeeper);
server.use(express.json());
server.use(helmet());
server.use(logger);
server.use(morgan('dev'));

server.use('/api/hubs', hubsRouter);

server.get('/', (req, res) => {
  const nameInsert = req.name ? ` ${req.name}` : '';

  res.send(`
    <h2>Lambda Hubs API</h2>
    <p>Welcome${nameInsert} to the Lambda Hubs API</p>
    `);
});

module.exports = server;
