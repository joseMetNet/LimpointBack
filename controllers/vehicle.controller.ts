import { Request, Response } from 'express';
import Vehicle from '../models/vehicle.model';
import { Op, Sequelize, QueryTypes } from 'sequelize';
import clientModel from '../models/client.model';

export const getVehicles = async (req: Request, res: Response) => {
   try {
      const vehicles = await Vehicle.findAll();

      if (vehicles.length == 0) {
         return res.status(204).json({
            msg: `Lo sentimos, no encontramos resultados`
         });
      }

      return res.status(200).json({
         msg: 'Consulta realizada con exito',
         vehicles
      });
   } catch (error) {
      return res.status(500).json({
         msg: 'Lo sentimos hubo un error en el servidor'
      });
   }
};

export const getVehicle = async (req: Request, res: Response) => {
   try {
      const { id } = req.params;
      const vehicle = await Vehicle.findByPk(id);

      if (!vehicle) {
         return res.status(404).json({
            msg: `No existe un vehiculo con el id ${id}`
         });
      }
      return res.status(200).json({
         msg: 'Consulta realizada con exito',
         vehicle
      });
   } catch (error) {
      console.log(error);
      return res.status(500).json({
         msg: 'Lo sentimos hubo un error en el servidor'
      });
   }
};

export const getVehicleByPlate = async (req: Request, res: Response) => {
   try {
      const { plate } = req.params;
      const vehicle = await Vehicle.findOne({
         where: {
            plate
         },
         include: [
            {
               model: clientModel,
               as: 'client'
            }
         ]
      });

      if (!vehicle) {
         return res.status(404).json({
            msg: `No existe un vehiculo con la placa ${plate}`
         });
      }
      return res.status(200).json({
         msg: 'Consulta realizada con exito',
         vehicle
      });
   } catch (error) {
      console.log(error);
      return res.status(500).json({
         msg: 'Lo sentimos hubo un error en el servidor'
      });
   }
};

export const postVehicle = async (req: Request, res: Response) => {
   try {
      const { body } = req;
      const vehicleExist = await Vehicle.findOne({
         where: {
            vehiclePlate: body.vehiclePlate
         }
      });

      if (vehicleExist) {
         return res.status(400).json({
            msg: 'Ya existe un vehiculo con esa placa'
         });
      }

      const vehicle = Vehicle.build(body);
      await vehicle.save();
      return res.status(200).json(vehicle);
   } catch (error) {
      console.log(error);
      return res.status(500).json({
         msg: 'Lo sentimos hubo un error en el servidor'
      });
   }
};

export const putVehicle = async (req: Request, res: Response) => {
   try {
      const { id } = req.params;
      const { body } = req;
      const vehicleExist = await Vehicle.findByPk(id);
      if (!vehicleExist) {
         return res.status(404).json({
            msg: `No existe un vehiculo con el id ${id}`
         });
      }

      await vehicleExist.update(body);

      return res.json({
         msg: 'putVehicle actualizado',
         body
      });
   } catch (error) {
      console.log('error');
      return res.status(500).json({
         msg: 'Lo sentimos hubo un error en el servidor'
      });
   }
};

export const deleteVehicle = async (req: Request, res: Response) => {
   try {
      const { id } = req.params;

      const vehicle = await Vehicle.findByPk(id);
      if (!vehicle) {
         return res.status(404).json({
            msg: `No existe un vehiculo con el id ${id}`
         });
      }

      await vehicle.destroy();
      res.status(200).json({
         msg: 'Vehiculo elimado exitosamente'
      });
   } catch (error) {
      return res.status(500).json({
         msg: 'Lo sentimos hubo un error en el servidor'
      });
   }
};
