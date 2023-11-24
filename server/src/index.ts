import { setupServer } from './server';

const PORT = 8080;

const server = setupServer();

server.listen(PORT, () => {
  console.log('server is running');
});
