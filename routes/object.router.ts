import { Router } from 'express';
import { check } from 'express-validator';
import { validateFields } from '../middlewares/validations';
import { validateJwt } from '../middlewares/validate-jwt';
import { postObject, getObjects } from '../controllers/object.controller';

const objectRouter = Router();

objectRouter.get('/object', getObjects);
objectRouter.post(
   '/object',
   [ check('name', 'El nombre del objeto es obligatorio').not().isEmpty(), validateFields ],
   postObject
);

export default objectRouter;
