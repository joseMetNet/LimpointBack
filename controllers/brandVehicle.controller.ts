import { Request, Response } from 'express';
import brandVehicleModel from '../models/brandVehicle.model';

export const getBrands = async (req: Request, res: Response) => {
   try {
      const brands = await brandVehicleModel.findAll();
      if (brands.length == 0) {
         return res.status(204).json({
            msg: `Lo sentimos, no encontramos resultados`
         });
      }

      return res.status(200).json({
         msg: 'Consulta realizada con exito',
         brands
      });
   } catch (error) {
      console.log('error: ', error);
      return res.status(500).json({
         msg: 'Lo sentimos hubo un error en el servidor'
      });
   }
};

export const postBrand = async (req: Request, res: Response) => {
   try {
      const { body } = req;
      const brand = brandVehicleModel.build(body);
      await brand.save();

      return res.status(200).json({
         msg: 'Marca de vehículo agregado con éxito',
         brand
      });
   } catch (error) {
      console.log('error: ', error);
      return res.status(500).json({
         msg: 'Lo sentimos hubo un error en el servidor'
      });
   }
};
