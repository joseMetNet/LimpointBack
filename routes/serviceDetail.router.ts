import { Router } from 'express';
import { check } from 'express-validator';
import { validateFields } from '../middlewares/validations';
import { validateJwt } from '../middlewares/validate-jwt';
import { getServiceDetails, postServiceDetail, getServiceDetailsFilter } from '../controllers/serviceDetail.controller';

const detailServiceRouter = Router();

detailServiceRouter.get('/detailServiceAll', getServiceDetails);
detailServiceRouter.get('/detailService', getServiceDetailsFilter);
detailServiceRouter.post(
   '/detailService',
   [ check('name', 'El nombre del servicio  es obligatorio').not().isEmpty(), validateFields ],
   [ check('idTypeService', 'El id tipo de servicio es obligatorio').not().isEmpty(), validateFields ],
   [ check('idTypeVehicle', 'El id tipo de vehículo es obligatorio').not().isEmpty(), validateFields ],
   [ check('cost', 'El valor del servicio es obligatorio').not().isEmpty(), validateFields ],
   postServiceDetail
);

export default detailServiceRouter;
