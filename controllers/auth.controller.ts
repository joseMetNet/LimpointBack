import { Request, Response } from 'express';
import bcryptjs from 'bcryptjs';
import { generateJWT, parseJwt } from '../helpers/generateJWT';
import User from '../models/user.model';
import salePointModel from '../models/salePoint.model';

export const login = async (req: Request, res: Response) => {
   const { email, password } = req.body;
   try {
      const userExist: any = await User.findOne({
         where: {
            email
         },
         include: [
            {
               model: salePointModel,
               as: 'salePoint'
            }
         ]
      });

      if (!userExist) {
         return res.status(401).json({
            msg: 'El Correo y/o Contraseña que ingresaste son incorrectos',
            errors: 'error'
         });
      }

      const validPassword = bcryptjs.compareSync(password, userExist.password);

      if (!validPassword) {
         return res.status(400).json({
            msg: 'El Correo y/o Contraseña que ingresaste son incorrectos - Contraseña',
            errors: 'error'
         });
      }

      const token = await generateJWT(userExist.id, '5h');
      const expiresIn = await parseJwt(token);

      const user = {
         id: userExist.id,
         name: userExist.userName,
         email: userExist.email,
         salePoint: userExist.salePoint
      };

      return res.status(200).json({
         msg: 'ok',
         token,
         expiresIn,
         user
      });
   } catch (error) {
      console.log('error');
      return res.status(500).json({
         msg: 'Lo sentimos hubo un error en el servidor'
      });
   }
};
