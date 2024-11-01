import { Request, Response } from 'express';
import paymentModel from '../models/paymentType.model';

export const getPayment = async (req: Request, res: Response) => {
   try {
      const payments = await paymentModel.findAll();
      if (payments.length == 0) {
         return res.status(204).json({
            msg: `Lo sentimos, no encontramos resultados`
         });
      }

      return res.status(200).json({
         msg: 'Consulta realizada con exito',
         payments
      });
   } catch (error) {
      console.log('error: ', error);
      return res.status(500).json({
         msg: 'Lo sentimos hubo un error en el servidor'
      });
   }
};

export const postPayment = async (req: Request, res: Response) => {
   try {
      const { body } = req;
      const pay = paymentModel.build(body);
      await pay.save();

      return res.status(200).json({
         msg: 'Tipo de pago agregado con éxito',
         pay
      });
   } catch (error) {
      console.log('error: ', error);
      return res.status(500).json({
         msg: 'Lo sentimos hubo un error en el servidor'
      });
   }
};
