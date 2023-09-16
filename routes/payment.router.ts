import { Router } from 'express';
import { check } from 'express-validator';
import { validateFields } from '../middlewares/validations';
import { validateJwt } from '../middlewares/validate-jwt';
import { getPayment, postPayment } from '../controllers/payment.controller';

const paymentRouter = Router();

paymentRouter.get('/payment', getPayment);
paymentRouter.post(
   '/payment',
   [ check('typePay', 'El tipo de pago es obligatorio').not().isEmpty(), validateFields ],
   postPayment
);

export default paymentRouter;
