const app = require('./app');

const PORT = 8888;

const server = app.listen(PORT, () =>
  console.log(`Listen on server port ${PORT}`)
);

process.on('SIGINT', () => {
  server.close(() => console.log('Exit server express'));
});
