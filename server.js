const express = require('express');
const helmet = require('helmet');

const projectRouter = require('./projects/projectRouter');

const server = express();

server.use(helmet());
server.use(logger);
server.use(express.json());

server.use('/projects', projectRouter);

server.get('/', (req, res) => {
  res.send(`<h2>Welcome to my Sprint Challenge API</h2>
            <p>Cohort: ${process.env.COHORT}</p>
            <p>Sprint: ${process.env.SPRINT}</p>`);
})

server.use((req, res) => {
  res.status(400).json({
    message: "Route was not found."
  })
})

server.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({
    message: "An internal error occurred. Please try again later."
  })
})

// Logger Function
function logger(req, res, next) {
  console.log(`${req.method} - ${req.url} - ${Date(Date.now())}`);
  next();
}

module.exports = server;