import { Request, Response } from 'express';
import objectModel from '../models/objects.model';

export const getObjects = async (req: Request, res: Response) => {
   try {
      const objects = await objectModel.findAll();
      // if (objects.length == 0) {
      //    return res.status(204).json({
      //       msg: `Lo sentimos, no encontramos resultados`
      //    });
      // }

      return res.status(200).json({
         msg: 'Consulta realizada con exito',
         objects
      });
   } catch (error) {
      console.log('error: ', error);
      return res.status(500).json({
         msg: 'Lo sentimos hubo un error en el servidor'
      });
   }
};

export const postObject = async (req: Request, res: Response) => {
   try {
      const { body } = req;
      const obj = objectModel.build(body);
      await obj.save();

      return res.status(200).json({
         msg: 'Tipo de pago agregado con éxito',
         objetc: obj
      });
   } catch (error) {
      console.log('error: ', error);
      return res.status(500).json({
         msg: 'Lo sentimos hubo un error en el servidor'
      });
   }
};
