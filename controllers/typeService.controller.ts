import { Request, Response } from 'express';
import typeServiceModel from '../models/typeServices.model';

export const getTypeServices = async (req: Request, res: Response) => {
   try {
      const services = await typeServiceModel.findAll();
      if (services.length == 0) {
         return res.status(204).json({
            msg: `Lo sentimos, no encontramos resultados`
         });
      }

      return res.status(200).json({
         msg: 'Consulta realizada con exito',
         services
      });
   } catch (error) {
      console.log('error: ', error);
      return res.status(500).json({
         msg: 'Lo sentimos hubo un error en el servidor'
      });
   }
};

export const postTypeService = async (req: Request, res: Response) => {
   try {
      const { body } = req;
      const service = typeServiceModel.build(body);
      await service.save();

      return res.status(200).json({
         msg: 'Tipo de servicio agregado con éxito',
         service
      });
   } catch (error) {
      console.log('error: ', error);
      return res.status(500).json({
         msg: 'Lo sentimos hubo un error en el servidor'
      });
   }
};
