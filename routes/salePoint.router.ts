import { Router } from 'express';
import { check } from 'express-validator';
import { validateFields } from '../middlewares/validations';
import { validateJwt } from '../middlewares/validate-jwt';
import { getSalePoints, postSalePoint } from '../controllers/salePoint.controller';


const salePointRouter = Router();

salePointRouter.get('/salePoint', getSalePoints);
salePointRouter.post(
   '/salePoint',
   [ check('name', 'El nombre es obligatorio').not().isEmpty(), validateFields ],
   postSalePoint
);


export default salePointRouter;
