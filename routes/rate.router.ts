import { check } from 'express-validator';
import { getTypeRates, postRateOrder, updateTypeRate } from '../controllers/rate.controller';
import { Router } from 'express';
import { validateFields } from '../middlewares/validations';

const rateRouter = Router();

rateRouter.get('/typeRate', getTypeRates);
rateRouter.post('/rateOrder', postRateOrder);
rateRouter.put(
   '/typeRate',
   [ check('id', 'El id es obligatorio').not().isEmpty(), validateFields ],
   [ check('name', 'El nombre es obligatorio').not().isEmpty(), validateFields ],
   updateTypeRate
);

export default rateRouter;
