import app from './app';
import config from './app/config';

import mongoose from 'mongoose';
import { Server } from 'http';
import seedSuperAdmin from './app/DB';

let server: Server;

async function main() {
  try {
    await mongoose.connect(config.databaseUrl as string);
    seedSuperAdmin();
    server = app.listen(config.port, () => {
      console.log(`Raich fakir app listening on port ${config.port}!`);
    });
  } catch (err) {
    console.error(err);
  }
}
main();

process.on('unhandledRejection', () => {
  console.log(`🤣 unhandle Rejection shouting down`);
  if (server) {
    server.close(() => {
      process.exit(1);
    });
  }
  process.exit(1);
});

process.on('uncaughtException', () => {
  console.log(`👍 uncaughtException Detected shouting down`);
  process.exit(1);
});
