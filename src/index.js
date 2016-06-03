/**
 * Created by tdzl2003 on 3/7/16.
 */

import app from './app';
import path from 'path';
import doMigrate from './utils/doMigrate';

async function main() {
  const port = process.env['PORT'] || 8901;
  const host = process.env['HOST'] || '';

  await doMigrate();
  await new Promise((res, rej) => {
    const server = app.listen(port, host, res);
    server.on('error', rej);
  });
  console.log('Ready');
}

main()
  .catch(err => {
    setImmediate(() => {
      throw err;
    });
  });
