import { Request, Response } from 'express';
import TypeRateModel from '../models/typeRate.model';
import ResourceModel from '../models/resource.model';
import orderModel from '../models/order.model';
import RateModel from '../models/rateOrder.model';

export const getTypeRates = async (req: Request, res: Response) => {
   try {
      const typeRates: any = await TypeRateModel.findAll({
         attributes: [ 'id', 'name' ],
         include: [
            {
               model: ResourceModel,
               as: 'resource',
               attributes: [ 'id', 'url' ]
            }
         ]
      });

      if (typeRates.length == 0) {
         return res.status(404).json({
            msg: `Lo sentimos no encontramos resultados`
         });
      }

      return res.status(200).json({
         msg: 'Consulta realizada con exito',
         typeRates
      });
   } catch (error) {
      console.log('error: ', error);
      return res.status(500).json({
         msg: 'Lo sentimos hubo un error en el servidor'
      });
   }
};

export const postRateOrder = async (req: Request, res: Response) => {
   try {
      const { idTypeRate, idOrder, observation } = req.body;

      const order: any = await orderModel.findByPk(idOrder);

      if (!order) {
         return res.status(404).json({
            msg: `La orden con el id ${idOrder} no existe`
         });
      }

      const rateCreated: any = RateModel.build({ idTypeRate, observation });
      await rateCreated.save();

      await order.update({ idRate: rateCreated.id });

      return res.status(200).json({
         msg: 'Se ha registrado la calificación exitosamente',
         rate: rateCreated
      });
   } catch (error) {
      console.log(error);
      return res.status(500).json({
         msg: 'Lo sentimos hubo un error en el servidor'
      });
   }
};

export const updateTypeRate = async (req: Request, res: Response) => {
   try {
      const { id, name } = req.body;
      const typeRateExist: any = await TypeRateModel.findByPk(id);

      if (!typeRateExist) {
         return res.status(404).json({
            msg: `El tipo de calificacion con el id ${id} no existe`
         });
      }

      await typeRateExist.update({ name });

      return res.status(200).json({
         msg: 'Consulta realizada con exito',
         typeRateExist
      });
   } catch (error) {
      console.log('error: ', error);
      return res.status(500).json({
         msg: 'Lo sentimos hubo un error en el servidor'
      });
   }
};
