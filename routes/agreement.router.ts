import { Router } from 'express';
import { check } from 'express-validator';
import { validateFields } from '../middlewares/validations';
import { validateJwt } from '../middlewares/validate-jwt';
import { getAgreements, postAgreement } from '../controllers/agreement.controller';


const agreementRouter = Router();

agreementRouter.get('/agreement', getAgreements);
agreementRouter.post(
   '/agreement',
   [ check('agreement', 'El nombre del convenio es obligatorio').not().isEmpty(), validateFields ],
   [ check('numberAble', 'El número es obligatorio').not().isEmpty(), validateFields ],
   postAgreement
);

export default agreementRouter;
