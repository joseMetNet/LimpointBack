import { Request, Response } from 'express';
import salePointModel from '../models/salePoint.model';


export const getSalePoints = async (req: Request, res: Response) => {
   try {
      const salePoints = await salePointModel.findAll();
      if (salePoints.length == 0) {
         return res.status(204).json({
            msg: `Lo sentimos, no encontramos resultados`
         });
      }

      return res.status(200).json({
         msg: 'Consulta realizada con exito',
         salePoints
      });
   } catch (error) {
      console.log('error: ', error);
      return res.status(500).json({
         msg: 'Lo sentimos hubo un error en el servidor'
      });
   }
};

export const postSalePoint = async (req: Request, res: Response) => {
   try {
      const { body } = req;
      const salePoint = salePointModel.build(body);
      await salePoint.save();

      return res.status(200).json({
         msg: 'Tienda agregada con éxito',
         salePoint
      });
   } catch (error) {
      console.log('error: ', error);
      return res.status(500).json({
         msg: 'Lo sentimos hubo un error en el servidor'
      });
   }
};
