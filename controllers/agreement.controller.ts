import { Request, Response } from 'express';
import agreementModel from '../models/agreement.model';

export const getAgreements = async (req: Request, res: Response) => {
   try {
      const agreements = await agreementModel.findAll({
         attributes: {
            exclude: [ 'deleted' ]
         },
         where: {
            deleted: false
         }
      });
      if (agreements.length == 0) {
         return res.status(204).json({
            msg: `Lo sentimos, no encontramos resultados`
         });
      }

      return res.status(200).json({
         msg: 'Consulta realizada con exito',
         agreements,
         size: agreements.length
      });
   } catch (error) {
      console.log('error: ', error);
      return res.status(500).json({
         msg: 'Lo sentimos hubo un error en el servidor'
      });
   }
};

export const postAgreement = async (req: Request, res: Response) => {
   try {
      const { body } = req;
      const agreement = agreementModel.build(body);
      await agreement.save();

      return res.status(200).json({
         msg: 'Tipo de pago agregado con éxito',
         agreement
      });
   } catch (error) {
      console.log('error: ', error);
      return res.status(500).json({
         msg: 'Lo sentimos hubo un error en el servidor'
      });
   }
};
