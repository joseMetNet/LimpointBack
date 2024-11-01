import path from 'path';
import { v4 } from 'uuid';
// import mkdirp from 'mkdirp';
import fs from 'fs';

const assetsPath = '../../assets/';

export const uploadFile = (files: any, folder = 'images') => {
   const extensionesValidas = [ 'jpg', 'jpeg', 'png', 'raw' ];
   return new Promise((resolve, reject) => {
      fs.promises.mkdir(path.join(__dirname, `${assetsPath}${folder}`), {
         recursive: true
      });
      const { file } = files;
      const splitName = file.name.split('.');
      const extension = splitName[splitName.length - 1];

      if (!extensionesValidas.includes(extension)) {
         return reject(`La extensión ${extension} no es permitida - ${extensionesValidas}`);
      }

      const nameTemp = `${v4()  }.${  extension}`;
      const uploadPath = path.join(__dirname, `${assetsPath}${folder}`, nameTemp);

      file.mv(uploadPath, (err: any) => {
         if (err) {
            console.log(err);
            reject(err);
         }
         resolve(nameTemp);
      });
   });
};

export const uploadFileCopy = (file: any, folder = 'images') => {
   const extensionesValidas = [ 'jpg', 'jpeg', 'png', 'raw' ];
   return new Promise((resolve, reject) => {
      fs.promises.mkdir(path.join(__dirname, `${assetsPath}${folder}`), {
         recursive: true
      });
      const splitName = file.name.split('.');
      const extension = splitName[splitName.length - 1];

      if (!extensionesValidas.includes(extension)) {
         return reject(`La extensión ${extension} no es permitida - ${extensionesValidas}`);
      }

      const nameTemp = `${v4()  }.${  extension}`;
      const uploadPath = path.join(__dirname, `${assetsPath}${folder}`, nameTemp);

      file.mv(uploadPath, (err: any) => {
         if (err) {
            console.log(err);
            reject(err);
         }
         resolve(nameTemp);
      });
   });
};

export const deleteFileSystem = (nameTemp: any, folder = 'images') => {
   return new Promise((resolve, reject) => {
      const name: string = path.join(__dirname, `${assetsPath}${folder}`, nameTemp);
      if (!fs.existsSync(name)) {reject('error en el servidor');}
      fs.unlink(name, function (err) {
         if (err) {reject(err);}
         resolve('deleted');
      });
   });
};
