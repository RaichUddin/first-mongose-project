import app from './app';
import config from './app/config';

import mongoose from 'mongoose';

async function main() {
  try {
    await mongoose.connect(config.databaseUrl as string);
    app.listen(config.port, () => {
      console.log(`Raich fakir app listening on port ${config.port}!`);
    });
  } catch (err) {
    console.error(err);
  }
}
main();
