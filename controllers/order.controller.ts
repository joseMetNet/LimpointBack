import { Request, Response } from "express";
import bcryptjs from "bcryptjs";
import User from "../models/user.model";
import Vehicle from "../models/vehicle.model";

export const postOrder = async(req: Request, res: Response) => {
    
    try {
        const { body } = req;
        const emailExist = await User.findOne({
            where: {
                email: body.email,
            },
        });

        if (emailExist) {
            return res.status(400).json({
                msg: "Ya existe un usuario con este correo",
            });
        }

        // Encrypt password
        const salt = bcryptjs.genSaltSync();
        body.password = bcryptjs.hashSync(body.password, salt);

        const vehicleExist = await Vehicle.findOne({
            where: {
                vehiclePlate: body.vehiclePlate,
            },
        });

        if(vehicleExist) {
            return res.status(400).json({
                msg: "Ya existe un vehiculo con esa placa"
            });
        }
        const user = User.build(body)
        await user.save(body);

        const vehicle = Vehicle.build(body);
        await vehicle.save(body);
        return res.status(200).json({vehicle,user});
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Hable con el administrador',
        })
    }
}