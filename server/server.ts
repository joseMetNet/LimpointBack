import express, { Application } from 'express';
import cors from 'cors';

import db from '../database/connection';
import userRouter from '../routes/user.router';
import vehicleRouter from '../routes/vehicle.router';
import authRouter from '../routes/auth.router';
import orderRouter from '../routes/order.router';
import vehicleTypeRouter from '../routes/vehicleType.router';
import brandVehicleRouter from '../routes/brandVehicle.router';
import paymentRouter from '../routes/payment.router';
import agreementRouter from '../routes/agreement.router';
import objectRouter from '../routes/object.router';
import typeServiceRouter from '../routes/typeService.router';
import detailServiceRouter from '../routes/serviceDetail.router';
import resourceRouter from '../routes/resource.router';

import fileUpload from 'express-fileupload';

class Server {
   private app: Application;
   private port: string;

   constructor () {
      this.app = express();
      this.port = process.env.PORT || '8000';

      // Métodos iniciales
      this.dbConnection();
      this.middlewares();
      this.routes();
   }

   async dbConnection () {
      try {
         await db.authenticate();
         console.log('database online');
      } catch (error) {
         console.log('error: ', error);
         throw new Error('error');
      }
   }

   middlewares () {
      // CORS
      this.app.use(cors());
      // Lectura del body
      this.app.use(express.json());
      // Carpeta pública
      this.app.use(express.static('public'));

      this.app.use(fileUpload({ useTempFiles: true, tempFileDir: '/tmp/' }));
   }

   routes () {
      this.app.use('/api/auth', authRouter);
      this.app.use('/api', userRouter);
      this.app.use('/api', vehicleRouter);
      this.app.use('/api', orderRouter);
      this.app.use('/api', vehicleTypeRouter);
      this.app.use('/api', brandVehicleRouter);
      this.app.use('/api', paymentRouter);
      this.app.use('/api', agreementRouter);
      this.app.use('/api', objectRouter);
      this.app.use('/api', typeServiceRouter);
      this.app.use('/api', detailServiceRouter);
      this.app.use('/api', resourceRouter);
   }

   listen () {
      this.app.listen(this.port, () => {
         console.log(`Servidor corriendo en puerto ${this.port}`);
      });
   }
}
export default Server;
