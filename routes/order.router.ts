import { Router } from 'express';
import {
   postOrder,
   getOrders,
   updateOrderInventory,
   getOrderById,
   getOrderSize,
   getStatusOrder,
   updateStatusOrder,
   getOrderRateById,
   updateDataStatusOrder,
   deleteDetailOrderService,
   getSummaryOrder
} from '../controllers/order.controller';
import { check } from 'express-validator';
import { validateFields } from '../middlewares/validations';
import { updateOrder, getOrdersAll } from '../controllers/order.controller';

const orderRouter = Router();

orderRouter.get('/order', getOrders);
orderRouter.get('/ordersHistory', getOrdersAll);
orderRouter.get('/orderStatus', getStatusOrder);
orderRouter.get('/orderSize/:plate', getOrderSize);
orderRouter.get('/order/:id', getOrderById);
orderRouter.get('/orderSummarize', getSummaryOrder);
orderRouter.get('/orderRate/:id', getOrderRateById);
orderRouter.post(
   '/order',
   [
      check('car.plate', 'La placa del vehiculo es obligatoria').not().isEmpty(),
      check('car.idTypeVehicle', 'El tipo de vehiculo es obligatorio').not().isEmpty(),
      check('car.idBrand', 'La marca del vehiculo es obligatoria').not().isEmpty(),
      check('car.idAgreement', 'La marca del vehiculo es obligatoria').not().isEmpty(),
      validateFields
   ],
   postOrder
);
orderRouter.put(
   '/order',
   [
      check('car.plate', 'La placa del vehiculo es obligatoria').not().isEmpty(),
      check('car.idTypeVehicle', 'El tipo de vehiculo es obligatorio').not().isEmpty(),
      check('car.idBrand', 'La marca del vehiculo es obligatoria').not().isEmpty(),
      check('car.idAgreement', 'La marca del vehiculo es obligatoria').not().isEmpty(),
      validateFields
   ],
   updateOrder
);

orderRouter.put(
   '/orderInventory',
   [ check('id', 'El id de la orden es obligatoria').not().isEmpty(), validateFields ],
   updateOrderInventory
);

orderRouter.put(
   '/orderStatusOrder',
   [ check('id', 'El id de la orden es obligatoria').not().isEmpty(), validateFields ],
   [ check('idStatusOrder', 'El estado de la orden es obligatorio').not().isEmpty(), validateFields ],
   updateStatusOrder
);
orderRouter.put(
   '/orderStatus',
   [ check('id', 'El id es obligatorio').not().isEmpty(), validateFields ],
   [ check('name', 'El nombre es obligatorio').not().isEmpty(), validateFields ],
   updateDataStatusOrder
);

orderRouter.delete('/deleteServices/:id', deleteDetailOrderService);

export default orderRouter;
