import { Router } from "express";
import { deleteUsuario, getUsuario, getUsuarios, postUsuario, putUsuario } from "../controllers/users.controller";
import { check } from "express-validator";
import { validateFields } from "../middlewares/validations";
import { validateJwt } from "../middlewares/validate-jwt";

const userRouter = Router();

userRouter.get('/user', getUsuarios);
userRouter.get('/user/:id', getUsuario);
userRouter.post('/user', [
    check('userName', 'El nombre es obligatorio').not().isEmpty(),
    // check('lastName', 'El apellido es obligatorio').not().isEmpty(),
    // check('phone', 'El celular es obligatorio').not().isEmpty(),
    check('email', 'El correo es obligatorio').not().isEmpty(),
    check('password', 'La contraseña es obligatoria').not().isEmpty(),
    check('idRol', 'El id del rol es obligatorio').not().isEmpty(),
    check('idSalePoint', 'El punto de venta es obligatorio').not().isEmpty(),
    check('email', 'El correo no es válido').isEmail(),
    validateFields
], postUsuario);
userRouter.put('/user/:id', putUsuario);
userRouter.delete('/user/:id', [validateJwt], deleteUsuario);


export default userRouter;