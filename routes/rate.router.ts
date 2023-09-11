import { check } from 'express-validator';
import { getTypeRates, postRateOrder } from '../controllers/rate.controller';
import { Router } from 'express';


const rateRouter = Router();

rateRouter.get('/typeRate', getTypeRates);
rateRouter.post('/rateOrder', postRateOrder);

export default rateRouter;