import { Router } from "express";
import { deleteVehicle, getVehicle, getVehicles, postVehicle, putVehicle, getVehicleByPlate } from '../controllers/vehicle.controller';
import { check } from "express-validator";
import { validateFields } from "../middlewares/validations";
import { validateJwt } from "../middlewares/validate-jwt";

const vehicleRouter = Router();

vehicleRouter.get('/vehicle', getVehicles);
vehicleRouter.get('/vehicle/:id', getVehicle);
vehicleRouter.get('/vehicleByPlate/:plate', getVehicleByPlate);
vehicleRouter.post('/vehicle', [
    check('idUser', 'El id del usuario es obligatorio').not().isEmpty(),
    check('vehiclePlate', 'La placa del vehiculo es obligatoria').not().isEmpty(),
    check('idTypeVehicle', 'El tipo de vehiculo es obligatorio').not().isEmpty(),
    check('idBrand', 'La marca del vehiculo es obligatoria').not().isEmpty(),
    check('observations', 'Las observaciones son obligatorias').not().isEmpty(),
    validateFields
], postVehicle);
// vehicleRouter.post('/vehicle', postVehicle);
vehicleRouter.put('/vehicle/:id', putVehicle);
vehicleRouter.delete('/vehicle/:id', deleteVehicle);

export default vehicleRouter;