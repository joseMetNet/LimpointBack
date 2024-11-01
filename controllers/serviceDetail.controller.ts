import { Request, Response } from 'express';
import serviceDetailModel from '../models/serviceDetail.model';

export const getServiceDetails = async (req: Request, res: Response) => {
   try {
      const details = await serviceDetailModel.findAll();
      if (details.length == 0) {
         return res.status(204).json({
            msg: `Lo sentimos, no encontramos resultados`
         });
      }

      return res.status(200).json({
         msg: 'Consulta realizada con exito',
         details
      });
   } catch (error) {
      console.log('error: ', error);
      return res.status(500).json({
         msg: 'Lo sentimos hubo un error en el servidor'
      });
   }
};

export const getServiceDetailsFilter = async (req: Request, res: Response) => {
   try {
      const { idTypeService, idTypeVehicle }: any = req.query;

      if (!idTypeService) {
         return res.status(404).json({
            msg: `El id del servicio es requerido`
         });
      }
      if (!idTypeVehicle) {
         return res.status(404).json({
            msg: `El id del vehiculo es requerido`
         });
      }

      const details = await serviceDetailModel.findAll({
         where: {
            idTypeService,
            idTypeVehicle
         }
      });
      if (details.length == 0) {
         return res.status(204).json({
            msg: `Lo sentimos, no encontramos resultados`
         });
      }

      return res.status(200).json({
         msg: 'Consulta realizada con exito',
         details
      });
   } catch (error) {
      console.log('error: ', error);
      return res.status(500).json({
         msg: 'Lo sentimos hubo un error en el servidor'
      });
   }
};

export const postServiceDetail = async (req: Request, res: Response) => {
   try {
      const { body } = req;
      const detail = serviceDetailModel.build(body);
      await detail.save();

      return res.status(200).json({
         msg: 'Detalle agregado con éxito',
         detail
      });
   } catch (error) {
      console.log('error: ', error);
      return res.status(500).json({
         msg: 'Lo sentimos hubo un error en el servidor'
      });
   }
};
