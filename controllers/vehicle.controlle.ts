import { Request, Response } from "express";
import Vehicle from "../models/vehicle.model";

export const getVehicles = async(req: Request, res: Response) => {
    const vehicles = await Vehicle.findAll();
    res.json(vehicles);
}

export const getVehicle = async(req: Request, res: Response) => {
    const { id } = req.params;
    const vehicle = await Vehicle.findByPk(id);

    if(vehicle){
        res.json(vehicle);
    } else {
        res.status(404).json({
            msg: `No existe un vehiculo con el id ${id}`
        });
    }
}

export const postVehicle = async(req: Request, res:Response) => {
    
    try {
        const { body } = req;
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

        const vehicle = Vehicle.build(body);
        await vehicle.save();
        return res.status(200).json(vehicle);

    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Hable con el administrador'
        })
    }
}

export const putVehicle = async(req: Request, res:Response) => {
    const { id } = req.params;
    const { body } = req;

    try {
        const vehicleExist = await Vehicle.findByPk(id);
        if(!vehicleExist) {
            return res.status(404).json({
                msg: `No existe un vehiculo con el id ${id}`,
            });
        } 

        await vehicleExist.update(body);

        return res.json({
            msg: "putVehicle actualizado",
            body,
        });
    } catch (error) {
        console.log("error");
        res.status(500).json({
            msg: "Error en el servidor"
        });
    }
}

export const deleteVehicle = async(req: Request, res:Response) => {
    const { id } = req.params;

    const vehicle = await Vehicle.findByPk(id);
    if(!vehicle) {
        return res.status(404).json({
            msg: `No existe un vehiculo con el id ${id}`,
        });
    }

    await vehicle.destroy();
    res.status(200).json({
        msg: "Vehiculo elimado exitosamente"
    })

}