import { Request, Response } from 'express';
import { BlobServiceClient } from '@azure/storage-blob';
import ResourceModel from '../models/resource.model';
import { uploadFileCopy, deleteFileSystem } from '../helpers/uploadFile';
import { uploadFileAzure, deleteFileAzure } from '../helpers/uploadAzureFile';
import { azureConfig } from '../config/azureStorage-config';
import orderResourceModel from '../models/orderResource.model';
import orderModel from '../models/order.model';

export const postResource = async (req: Request, res: Response) => {
   try {
      const observation: any = req.body.observation ? req.body.observation : '';

      if (!req.files || Object.keys(req.files).length == 0 || !req.files.file) {
         res.status(400).json({
            msg: 'no hay archivos para subir'
         });
      }

      const imageExtensions = [ 'jpg', 'jpeg', 'png', 'raw', 'webp' ];

      const files: any = req.files!.file;
      let arrayFiles: any = [];
      if (!Array.isArray(files)) {
         arrayFiles.push(files);
      } else {
         arrayFiles = files;
      }
      const resources: any = [];
      for (const file of arrayFiles) {
         const splitName = file.name.split('.');
         const extension = splitName[splitName.length - 1];
         const folder = 'images';
         const pathData = await uploadFileCopy(file, folder)
            .then(data => data)
            .catch(err => {
               console.log(err);
               return res.status(404).json({
                  msg: err
               });
            });

         const blobService = BlobServiceClient.fromConnectionString(azureConfig);
         const urlFile = await uploadFileAzure(blobService, folder, pathData, folder);

         await deleteFileSystem(pathData, folder);

         const resource: any = {
            name: splitName[0],
            observation,
            url: urlFile
         };

         resources.push(resource);
      }

      const resourcesCreated = await ResourceModel.bulkCreate(resources);

      return res.status(201).json({
         msg: 'ok',
         data: resourcesCreated
      });
   } catch (error) {
      console.log(error);

      return res.status(500).json({
         msg: 'error'
      });
   }
};

export const getResources = async (req: Request, res: Response) => {
   try {
      const page: any = req.query.page ? req.query.page : 0;
      const size: any = req.query.size ? req.query.size : 50;
      const skip = page * size;

      const { count, rows } = await ResourceModel.findAndCountAll({
         order: [ [ 'id', 'DESC' ] ],
         offset: parseInt(skip.toString()),
         limit: parseInt(size.toString())
      });

      if (rows.length == 0) {
         return res.status(204).json({
            msg: `Lo sentimos, no hay archivos para mostrar`
         });
      }

      return res.json({
         resources: rows,
         pagination: { sizeItems: count, page, size }
      });
   } catch (error) {
      return res.status(500).json({
         msg: 'Lo sentimos hubo un error en el servidor'
      });
   }
};

export const deleteResource = async (req: Request, res: Response) => {
   try {
      const { id } = req.params;

      const resource: any = await ResourceModel.findByPk(id);
      if (!resource) {
         return res.status(404).json({
            msg: `El archivo con el id: ${id} no existe!`
         });
      }

      // Delete image storage azure
      const blobService = BlobServiceClient.fromConnectionString(azureConfig);

      if (!resource.url) {
         return res.status(400).json({
            msg: `No se pudo eliminar el archivo`
         });
      }
      const imageSplit = resource.url.split('/');
      const name = imageSplit[imageSplit.length - 1];
      await deleteFileAzure(blobService, 'images', name);
      await resource.destroy();
      return res.status(200).json({
         msg: `Archivo eliminado`
      });
   } catch (error) {
      console.log(error);
      return res.status(200).json({
         msg: `Lo sentimos hubo un error en el servidor`
      });
   }
};

export const postResourceOrder = async (req: Request, res: Response) => {
   try {
      const observation: any = req.body.observation ? req.body.observation : '';
      const idOrder: any = req.body.idOrder;

      if (!req.files || Object.keys(req.files).length == 0 || !req.files.file) {
         res.status(400).json({
            msg: 'no hay archivos para subir'
         });
      }

      const file: any = req.files!.file;
      const splitName = file.name.split('.');
      const folder = 'images';
      const pathData = await uploadFileCopy(file, folder)
         .then(data => data)
         .catch(err => {
            console.log(err);
            return res.status(404).json({
               msg: err
            });
         });

      const blobService = BlobServiceClient.fromConnectionString(azureConfig);
      const urlFile = await uploadFileAzure(blobService, folder, pathData, folder);

      await deleteFileSystem(pathData, folder);

      const resource: any = {
         name: splitName[0],
         observation,
         url: urlFile
      };

      // const resourcesCreated = await ResourceModel.bulkCreate(resources);

      const resourceCreated: any = ResourceModel.build(resource);
      const finalResource = await resourceCreated.save();

      const orderResource = orderResourceModel.build({
         idOrder,
         idResource: finalResource.id
      });

      const orderResourceCreated = await orderResource.save();

      return res.status(201).json({
         msg: 'ok',
         data: orderResourceCreated
      });
   } catch (error) {
      console.log(error);

      return res.status(500).json({
         msg: 'error'
      });
   }
};

export const getResourcesOrder = async (req: Request, res: Response) => {
   try {
      const { idOrder }: any = req.params;

      const resources = await ResourceModel.findAll({
         attributes: [ 'id', 'observation', 'url' ],
         include: {
            model: orderModel,
            as: 'order',
            where: { id: idOrder },
            through: { attributes: [ 'id' ] },
            attributes: [ 'id' ]
         }
      });

      return res.json({
         msg: 'Consulta realizada con éxito',
         resources
      });
   } catch (error) {
      console.log(error);

      return res.status(500).json({
         msg: 'Lo sentimos hubo un error en el servidor'
      });
   }
};

export const deleteResourcesOrder = async (req: Request, res: Response) => {
   try {
      const { id }: any = req.params;

      const resource: any = await orderResourceModel.findOne({ where: { id } });

      if (!resource) {
         return res.status(404).json({
            msg: `Lo sentimos no existe el archivo`
         });
      }

      await deleteResourceLocal(resource.idResource);

      await resource.destroy();

      return res.json({
         msg: 'Archivo eliminado con éxito',
         resource
      });
   } catch (error) {
      console.log(error);

      return res.status(500).json({
         msg: 'Lo sentimos hubo un error en el servidor'
      });
   }
};

const deleteResourceLocal = async (id: any) => {
   try {
      const resource: any = await ResourceModel.findByPk(id);
      if (!resource) {
      }

      // Delete image storage azure
      const blobService = BlobServiceClient.fromConnectionString(azureConfig);
      const imageSplit = resource.url.split('/');
      const name = imageSplit[imageSplit.length - 1];
      await deleteFileAzure(blobService, 'images', name);
      await resource.destroy();
   } catch (error) {
      console.log(error);
   }
};
