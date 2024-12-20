import { Request, Response } from 'express';
import bcryptjs from 'bcryptjs';
import User from '../models/user.model';

export const getUsuarios = async (req: Request, res: Response) => {
   try {
      const users = await User.findAll();

      if (users.length == 0) {
         return res.status(204).json({
            msg: `Lo sentimos, no encontramos resultados`
         });
      }

      return res.status(200).json({
         msg: 'Consulta realizada con exito',
         users
      });
   } catch (error) {
      console.log(error);
      return res.status(500).json({
         msg: 'Lo sentimos hubo un error en el servidor'
      });
   }
};

export const getUsuario = async (req: Request, res: Response) => {
   const { id } = req.params;

   const user = await User.findByPk(id);

   if (user) {
      res.json(user);
   } else {
      res.status(404).json({
         msg: `No existe un usuario con el id ${id}`
      });
   }
};

export const postUsuario = async (req: Request, res: Response) => {
   const { body } = req;

   try {
      //correo dupicado
      const emailExist = await User.findOne({
         where: {
            email: body.email
         }
      });

      if (emailExist) {
         return res.status(400).json({
            msg: 'Ya existe un usuario con este correo'
         });
      }

      // Encrypt password
      const salt = bcryptjs.genSaltSync();
      body.password = bcryptjs.hashSync(body.password, salt);

      const user = User.build(body);
      await user.save();

      res.json(user);
   } catch (error) {
      console.log(error);
      return res.status(500).json({
         msg: 'Hable con el administrador'
      });
   }
};

export const putUsuario = async (req: Request, res: Response) => {
   const { id } = req.params;
   const { body } = req;

   try {
      const userExist = await User.findByPk(id);
      if (!userExist) {
         return res.status(404).json({
            msg: `No existe un usuario con el id ${id}`
         });
      }
      const salt = bcryptjs.genSaltSync();
      body.password = bcryptjs.hashSync(body.password, salt);

      await userExist.update(body);

      return res.json({
         msg: 'putUser actualizado',
         body
      });
   } catch (error) {
      console.log('error');
      res.status(500).json({
         msg: 'Error en el servidor'
      });
   }
};

export const deleteUsuario = async (req: Request, res: Response) => {
   const { id } = req.params;

   const user = await User.findByPk(id);
   if (!user) {
      return res.status(404).json({
         msg: `El usuario con el id: ${id} no existe!!!`
      });
   }

   //await user.update({ active: false });
   await user.destroy();

   res.status(200).json({
      msg: 'Usuario eliminado exitosamente'
   });
};

export const testForm = async (req: Request, res: Response) => {
   try {
      const { body } = req;

      return res.status(200).json({
         msg: 'Datos con existo',
         body,
         req
      });
   } catch (error) {
      console.log(error);
      return res.status(500).json({
         msg: 'Hable con el administrador'
      });
   }
};
export const testForm2 = async (req: Request, res: Response) => {
   try {
      // let data = req
      console.log('REQUEST GET');
      
      return res.status(200).json({
         msg: 'Datos con existo',
         email: ''
         // data
      });
   } catch (error) {
      console.log(error);
      return res.status(500).json({
         msg: 'Hable con el administrador'
      });
   }
};
