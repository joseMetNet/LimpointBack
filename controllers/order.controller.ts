import { Request, Response } from 'express';
import bcryptjs from 'bcryptjs';

import Vehicle from '../models/vehicle.model';
import clientModel from '../models/client.model';
import orderServiceModel from '../models/order.model';
import orderDetailServiceModel from '../models/orderDetailService.model';
import objectOrderModel from '../models/objectOrder.model';
import { Op } from 'sequelize';

export const getOrders = async (req: Request, res: Response) => {
   try {
      const { salePoint, plate, name, phone } = req.query;
      const page: any = req.query.page ? req.query.page : 0;
      const size: any = req.query.size ? req.query.size : 10;
      const skip = page * size;

      let clientJson: any = {
         model: clientModel,
         as: 'client'
      };

      if (name) {
         clientJson = {
            ...clientJson,
            where: { name: { [Op.substring]: `${name}` } }
         };
      }
      if (phone) {
         clientJson = {
            ...clientJson,
            where: { ...clientJson.where, phone: { [Op.substring]: `${phone}` } }
         };
      }

      let vehicleJson: any = {
         model: Vehicle,
         as: 'vehicle'
         // include: [ clientJson ]
      };

      if (plate) {
         vehicleJson = {
            ...vehicleJson,
            where: { plate: { [Op.substring]: `${plate}` } }
         };
      }

      if (!salePoint) {
         return res.status(404).json({
            msg: `El id del punto de venta es requerido`
         });
      }

      const { count, rows }: any = await orderServiceModel.findAndCountAll({
         where: {
            idStatusOrderService: 1,
            idSalePoint: salePoint
         },
         include: [
            vehicleJson,
            clientJson
            // {
            //    model: Vehicle,
            //    as: 'vehicle',
            //    where: {
            //       plate
            //    },
            //    include: [
            //       {
            //          model: clientModel,
            //          as: 'client'
            //       }
            //    ]
            // }
         ]
      });

      if (rows.length == 0) {
         return res.status(400).json({
            msg: `Lo sentimos, no encontramos resultados`
         });
      }

      return res.status(200).json({
         msg: 'Consulta realizada con exito',
         orders: rows,
         pagination: { sizeItems: count, page, size }
      });
   } catch (error) {
      console.log('error: ', error);
      return res.status(500).json({
         msg: 'Lo sentimos hubo un error en el servidor'
      });
   }
};

export const getOrderById = async (req: Request, res: Response) => {
   try {
      const { id } = req.params;

      const order: any = await orderServiceModel.findByPk(id, {
         include: [
            {
               model: Vehicle,
               as: 'vehicle'
            },
            {
               model: clientModel,
               as: 'client'
            }
         ]
      });

      if (!order) {
         return res.status(404).json({
            msg: `La orden con el id ${id} no existe`
         });
      }

      return res.status(200).json({
         msg: 'Consulta realizada con exito',
         order
      });
   } catch (error) {
      console.log('error: ', error);
      return res.status(500).json({
         msg: 'Lo sentimos hubo un error en el servidor'
      });
   }
};

export const getOrderSize = async (req: Request, res: Response) => {
   try {
      const { idSalePoint } = req.params;
      const date = new Date();
      const finalDate = `${date.getFullYear()}-${`0${date.getMonth() + 1}`.slice(-2)}`;

      const { count, rows }: any = await orderServiceModel.findAndCountAll({
         where: {
            createdAt: {
               [Op.substring]: `${finalDate}`
            },
            idSalePoint
         }
      });

      return res.status(200).json({
         msg: 'Consulta realizada con exito',
         totalOrders: count
      });
   } catch (error) {
      console.log('error: ', error);
      return res.status(500).json({
         msg: 'Lo sentimos hubo un error en el servidor'
      });
   }
};

export const postOrder = async (req: Request, res: Response) => {
   try {
      const { car, client, services, order } = req.body;

      car.plate = car.plate.toString().toUpperCase();

      let vehicle: any, clientToSave: any;

      const vehicleExist: any = await Vehicle.findOne({
         where: {
            plate: car.plate
         }
      });

      if (vehicleExist) {
         vehicle = await vehicleExist.update(car);
         const clientExist = await clientModel.findByPk(vehicleExist.idClient);
         if (clientExist) {
            clientToSave = await clientExist.update(client);
         }
      } else {
         clientToSave = clientModel.build(client);
         await clientToSave.save();
         car.idClient = clientToSave.id;
         vehicle = Vehicle.build(car);
         await vehicle.save();
      }

      const finalOrder = { ...order, idVehicle: vehicle.id, idClient: clientToSave.id };
      const orderCreated: any = orderServiceModel.build(finalOrder);
      await orderCreated.save();
      const orderServices = [];

      for await (const item of services) {
         const newItem = {
            idDetailService: item.id,
            idOrder: orderCreated.id
         };
         orderServices.push(newItem);
      }

      await orderDetailServiceModel.bulkCreate(orderServices);

      return res.status(200).json({
         msg: 'Orden creada exitosamente',
         order: orderCreated
      });
   } catch (error) {
      console.log(error);
      return res.status(500).json({
         msg: 'Lo sentimos hubo un error en el servidor'
      });
   }
};

export const updateOrderInventory = async (req: Request, res: Response) => {
   try {
      const order = req.body;

      const orderExist: any = await orderServiceModel.findByPk(order.id);

      if (!orderExist) {
         return res.status(404).json({
            msg: `No existe una orden con el id ${order.id}`
         });
      }

      await orderExist.update(order);

      const objectList = [];
      if (order.objectList.length > 0) {
         for await (const item of order.objectList) {
            const newItem = {
               idObject: item,
               idOrder: orderExist.id
            };
            objectList.push(newItem);
         }

         await objectOrderModel.bulkCreate(objectList);
      }

      return res.status(200).json({
         msg: 'Orden actualizada exitosamente',
         order: orderExist
      });
   } catch (error) {
      console.log(error);
      return res.status(500).json({
         msg: 'Lo sentimos hubo un error en el servidor'
      });
   }
};
