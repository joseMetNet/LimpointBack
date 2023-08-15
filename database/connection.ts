import { Sequelize } from 'sequelize';
import { sqlServer } from '../config/database-config';


// const db = new Sequelize('Limpoint','Limpoint','limp#123',{
//     host: 'limpoint.database.windows.net,
//     dialect: 'mssql',
// });

const db = new Sequelize(sqlServer.DB_DATABASE, sqlServer.DB_USERNAME, sqlServer.DB_PASSWORD, {
   host: sqlServer.DB_HOST,
   dialect: 'mssql',
   pool: {
      max: 50,
      min: 0,
      acquire: 9200000,
      idle: 9000000
   },

   dialectOptions: {
      options: {
         requestTimeout: 900000
      },
      useUTC: false //for reading from database
   },
   timezone: '-05:00' // for writng
});

export default db;
