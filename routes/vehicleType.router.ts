import { Router } from 'express';
import { check } from 'express-validator';
import { validateFields } from '../middlewares/validations';
import { validateJwt } from '../middlewares/validate-jwt';
import { getVehicleTypes, postVehicleType } from '../controllers/vehicleType.controller';

const vehicleTypeRouter = Router();

vehicleTypeRouter.get('/vehicleType', getVehicleTypes);
vehicleTypeRouter.post(
   '/vehicleType',
   [ check('typeVehicle', 'El tipo de vehículo es obligatorio').not().isEmpty(), validateFields ],
   postVehicleType
);


export default vehicleTypeRouter;
