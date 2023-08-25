import { Router } from 'express';
import { check } from 'express-validator';
import { validateFields } from '../middlewares/validations';
import { validateJwt } from '../middlewares/validate-jwt';
import { getTypeServices, postTypeService } from '../controllers/typeService.controller';

const typeServiceRouter = Router();

typeServiceRouter.get('/service', getTypeServices);
typeServiceRouter.post(
   '/service',
   [ check('name', 'El nombre tipo de servicio es obligatorio').not().isEmpty(), validateFields ],
   postTypeService
);

export default typeServiceRouter;
