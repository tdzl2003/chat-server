/**
 * Created by tdzl2003 on 3/7/16.
 */

import Umzug from 'umzug';
import { Sequelize, sequelize } from '../../models';
import path from 'path';

export default async function doMigrate() {
  const umzug = new Umzug({
    storage: 'sequelize',
    storageOptions: {
      sequelize,
      tableName: 'SequelizeMeta',
    },
    logging: console.log,
    migrations: {
      params:  [ sequelize.getQueryInterface(), Sequelize ],
      path: path.resolve(__dirname, '../../db/migrate'),
      pattern: /\.js$/,
    }
  });
  await umzug.up();
}