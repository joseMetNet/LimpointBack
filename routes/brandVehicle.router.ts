import { Router } from 'express';
import { check } from 'express-validator';
import { validateFields } from '../middlewares/validations';
import { validateJwt } from '../middlewares/validate-jwt';
import { getBrands, postBrand } from '../controllers/brandVehicle.controller';

const brandVehicleRouter = Router();

brandVehicleRouter.get('/brand', getBrands);
brandVehicleRouter.post(
   '/brand',
   [ check('brand', 'La marca del vehículo es obligatoria').not().isEmpty(), validateFields ],
   postBrand
);


export default brandVehicleRouter;
