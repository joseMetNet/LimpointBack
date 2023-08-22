import { Request, Response } from 'express';
import vehicleTypeModel from '../models/vehicleType.model';

export const getVehicleTypes = async (req: Request, res: Response) => {
   try {
      const vehicleTypes = await vehicleTypeModel.findAll();
      if (vehicleTypes.length == 0) {
         return res.status(204).json({
            msg: `Lo sentimos, no encontramos resultados`
         });
      }

      return res.status(200).json({
         msg: 'Consulta realizada con exito',
         vehicleTypes
      });
   } catch (error) {
      console.log('error: ', error);
      return res.status(500).json({
         msg: 'Lo sentimos hubo un error en el servidor'
      });
   }
};

export const postVehicleType = async (req: Request, res: Response) => {
   try {
      const { body } = req;
      const vehicleType = vehicleTypeModel.build(body);
      await vehicleType.save();

      return res.status(200).json({
         msg: 'Tipo de vehículo agregado con exito',
         vehicleType
      });
   } catch (error) {
      console.log('error: ', error);
      return res.status(500).json({
         msg: 'Lo sentimos hubo un error en el servidor'
      });
   }
};
