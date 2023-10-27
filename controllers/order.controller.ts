import { Request, Response } from 'express';
import bcryptjs from 'bcryptjs';

import Vehicle from '../models/vehicle.model';
import clientModel from '../models/client.model';
import orderModel from '../models/order.model';
import orderDetailServiceModel from '../models/orderDetailService.model';
import objectOrderModel from '../models/objectOrder.model';
import { Op } from 'sequelize';
import ResourceModel from '../models/resource.model';
import serviceDetailModel from '../models/serviceDetail.model';
import vehicleTypeModel from '../models/vehicleType.model';
import brandVehicleModel from '../models/brandVehicle.model';
import agreementModel from '../models/agreement.model';
import typeServiceModel from '../models/typeServices.model';
import objectModel from '../models/objects.model';
import statusOrderModel from '../models/statusOrder.model';

import fetch from 'node-fetch';
import { StatusOrderOptions } from '../models/interfaces-general.model';
import salePointModel from '../models/salePoint.model';
import RateModel from '../models/rateOrder.model';

const statusOptions = StatusOrderOptions;

// const baseUrl = process.env.URL_FRONT;
// const baseUrl = process.env.URL_FRONT || 'http://localhost:4200/'
const baseUrl = process.env.URL_FRONT || 'https://limpointfron.azurewebsites.net/#/';

export const getStatusOrder = async (req: Request, res: Response) => {
   try {
      const statusOrders: any = await statusOrderModel.findAll();

      if (statusOrders.length == 0) {
         return res.status(400).json({
            msg: `Lo sentimos, no encontramos resultados`
         });
      }

      return res.status(200).json({
         msg: 'Consulta realizada con exito',
         statusOrders
      });
   } catch (error) {
      console.log('error: ', error);
      return res.status(500).json({
         msg: 'Lo sentimos hubo un error en el servidor'
      });
   }
};
export const updateDataStatusOrder = async (req: Request, res: Response) => {
   try {
      const { id, name } = req.body;
      const statusOrderExist: any = await statusOrderModel.findByPk(id);

      if (!statusOrderExist) {
         return res.status(404).json({
            msg: `El estado de orden con el id ${id} no existe`
         });
      }

      await statusOrderExist.update({ name });

      return res.status(200).json({
         msg: 'Consulta realizada con exito',
         statusOrderExist
      });
   } catch (error) {
      console.log('error: ', error);
      return res.status(500).json({
         msg: 'Lo sentimos hubo un error en el servidor'
      });
   }
};

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

      const { count, rows }: any = await orderModel.findAndCountAll({
         where: {
            [Op.or]: [
               { idStatusOrder: statusOptions.PENDING },
               { idStatusOrder: statusOptions.ACCEPTED },
            ],
            // idStatusOrder: statusOptions.PENDING,
            idSalePoint: salePoint
         },
         include: [
            {
               model: statusOrderModel,
               as: 'status'
            },
            vehicleJson,
            clientJson
         ],
         offset: parseInt(skip.toString()),
         limit: parseInt(size.toString()),
         order: [ [ 'id', 'DESC' ] ]
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

export const getOrdersAll = async (req: Request, res: Response) => {
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

      const { count, rows }: any = await orderModel.findAndCountAll({
         where: {
            idSalePoint: salePoint
         },
         include: [
            {
               model: statusOrderModel,
               as: 'status'
            },
            vehicleJson,
            clientJson
         ],
         offset: parseInt(skip.toString()),
         limit: parseInt(size.toString()),
         order: [ [ 'id', 'DESC' ] ]
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

      const order: any = await orderModel.findByPk(id, {
         include: [
            {
               model: Vehicle,
               as: 'vehicle',
               include: [
                  {
                     model: vehicleTypeModel,
                     as: 'typeVehicle'
                  },
                  {
                     model: brandVehicleModel,
                     as: 'brand'
                  },
                  {
                     model: agreementModel,
                     as: 'agreement'
                  }
               ]
            },
            {
               model: statusOrderModel,
               as: 'status'
            },
            {
               model: clientModel,
               as: 'client'
            },
            {
               model: ResourceModel,
               as: 'resource',
               through: { attributes: [] }
            },
            {
               model: objectModel,
               as: 'inventary',
               through: { attributes: [] }
            },
            {
               model: serviceDetailModel,
               as: 'typeWash',
               through: { attributes: [ 'id' ] },
               include: [
                  {
                     model: typeServiceModel,
                     as: 'service'
                  }
               ]
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

export const getOrderRateById = async (req: Request, res: Response) => {
   try {
      const { id } = req.params;

      const order: any = await orderModel.findByPk(id, {
         attributes: [ 'id', 'idStatusOrder' ],
         include: [
            {
               model: RateModel,
               as: 'rate'
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
      const { plate } = req.params;

      const vehicle: any = await Vehicle.findOne({
         // attributes: [ 'id' ],
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
         return res.status(204).json({
            msg: `no hay datos`
         });
      }
      const date = new Date();
      const finalDate = `${date.getFullYear()}-${`0${date.getMonth() + 1}`.slice(-2)}`;

      const { count, rows }: any = await orderModel.findAndCountAll({
         where: {
            createdAt: {
               [Op.substring]: `${finalDate}`
            },
            idVehicle: vehicle.id
         }
      });

      return res.status(200).json({
         msg: 'Consulta realizada con exito',
         totalOrders: count,
         vehicle
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
      const orderCreated: any = orderModel.build(finalOrder);
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

export const updateOrder = async (req: Request, res: Response) => {
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
      const orderCreated: any = await orderModel.findByPk(order.id);
      await orderCreated.update(finalOrder);
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
         msg: 'Orden actulizada exitosamente',
         order: orderCreated
      });
   } catch (error) {
      console.log(error);
      return res.status(500).json({
         msg: 'Lo sentimos hubo un error en el servidor'
      });
   }
};

export const updateStatusOrder = async (req: Request, res: Response) => {
   try {
      const { id, idStatusOrder } = req.body;
      const order: any = await orderModel.findByPk(id, {
         include: [
            {
               model: clientModel,
               as: 'client'
            },
            {
               model: serviceDetailModel,
               as: 'typeWash',
               through: { attributes: [] },
               include: [
                  {
                     model: typeServiceModel,
                     as: 'service'
                  }
               ]
            },
            {
               model: Vehicle,
               as: 'vehicle',
               include: [
                  {
                     model: vehicleTypeModel,
                     as: 'typeVehicle'
                  },
                  {
                     model: brandVehicleModel,
                     as: 'brand'
                  }
               ]
            },
            {
               model: salePointModel,
               as: 'salePoint'
            }
         ]
      });

      if (!order) {
         return res.status(404).json({
            msg: `La orden con el id ${id} no existe`
         });
      }

      await order.update({ idStatusOrder });

      let message = '';
      let link = '';

      switch (idStatusOrder) {
         case statusOptions.PENDING:
            link = `${baseUrl}orden-de-servicio/${order.id}`;
            const services = await returnServices(order.typeWash);
            message = `${order.client.name} ${order.client.lastname} usted ha adquirido el servicio de ${services} para ${order.vehicle.typeVehicle.typeVehicle}, en nuestro centro de servicio ${order.salePoint.name}, por favor ACEPTE EL SERVICIO EN EL SIGUIENTE ${link}`;
            await sendMsm(message, order.client.phone);
            break;
         case statusOptions.FINALIZED:
            link = `${baseUrl}calificar-servicio/${order.id}`;
            message = `Gracias por haber adquirido nuestros servicios, con el ánimo de mejorar cada día, les pedimos califiquen nuestro servicio a través de este link ${link}`;
            await sendMsm(message, order.client.phone);
            break;

         default:
            break;
      }

      return res.status(200).json({
         msg: 'Orden actualizada exitosamente'
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

      const orderExist: any = await orderModel.findByPk(order.id);

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

         await objectOrderModel.destroy({
            where: {
               idOrder: order.id
            }
         });
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

const sendMsm = async (message: string, phone: any) => {
   try {
      const host: string = 'https://api-sms.masivapp.com/send-message';
      const options: any = {
         method: 'POST',
         headers: {
            'Content-Type': 'application/json',
            Authorization: 'Basic YXBpLnNpZm1hOlhWSTN5NkhHR1EySHk2djhFUHRv'
         },
         body: `
               {
                  "to": "57${phone}",
                  "text": "${message}",
                  "customdata": "CUS_ID_0125",
                  "isPremium": false,
                  "isFlash": false,
                  "isLongmessage": true,
                  "isRandomRoute": false
               }
         `
      };
      let response: any;

      await fetch(host, options)
         .then(res => res.json())
         .then((json: any) => {
            console.log('res', json);
            if ((json.status = '200')) {
               response = true;
            } else {
               response = false;
            }
         });

      return response;
   } catch (error) {
      console.log(`error on sendEmail${error}`);
      return false;
   }
};

const returnServices = async (services: any) => {
   try {
      let counter = 0;
      let res = '';
      for await (const item of services) {
         if (counter > 0) {
            res = `${res}, ${item.service.name} (${item.name})`;
         } else {
            res = `${item.service.name} (${item.name})`;
         }
         counter += 1;
      }

      return res;
   } catch (error) {}
};

export const deleteDetailOrderService = async (req: Request, res: Response) => {
   try {
      const { id } = req.params;

      const detailExist = await orderDetailServiceModel.findOne({ where: { id } });

      if (!detailExist) {
         return res.status(400).json({
            msg: `Lo sentimos, no encontramos resultados`
         });
      }

      await detailExist.destroy();

      return res.status(200).json({
         msg: 'Se eliminó con éxito',
         detailExist
      });
   } catch (error) {
      console.log('error: ', error);
      return res.status(500).json({
         msg: 'Lo sentimos hubo un error en el servidor'
      });
   }
};
