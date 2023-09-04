import { Router } from 'express';
import { postOrder, getOrders, updateOrderInventory, getOrderById, getOrderSize } from '../controllers/order.controller';
import { check } from 'express-validator';
import { validateFields } from '../middlewares/validations';

const orderRouter = Router();

orderRouter.get('/order', getOrders);
orderRouter.get('/orderSize/:idSalePoint', getOrderSize);
orderRouter.get('/order/:id', getOrderById);
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
   [ check('id', 'El id de la orden es obligatoria').not().isEmpty(), validateFields ],
   updateOrderInventory
);

export default orderRouter;
