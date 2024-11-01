import jwt from "jsonwebtoken";

export const generateJWT = (uid: any = "", time: string = "15m") => {
  const secret: any = process.env.SECRET_KEY || 'Limpoint';
  return new Promise((resolve, reject) => {
    const payload = { uid };

    // exp: Math.floor(Date.now() / 1000) + 60 * 60 
    // expiresIn: "15m"

    jwt.sign(payload, secret, { expiresIn: time }, (err: any, token: any) => {
      if (err) {
        console.error('token: ', err);  
        reject("No se generó el Token");
      } else {
        resolve(token);
      }
    });
  });
};

export const parseJwt = async (token: any) => {
  const secret: any = process.env.SECRET_KEY || 'Limpoint';
  return new Promise((resolve, reject) => {
    jwt.verify(token, secret, (err: any, decoded: any) => {
      if (err) {        
        reject("No se generó el Token");
      } else {
        let date = new Date();        
        date.setTime(decoded.exp * 1000);
        // resolve(decoded.exp * 1000);
        resolve(date);
      }
    });
  });
};

export const verifyJwt = async (token: any) => {
  const secret: any = process.env.SECRET_KEY || 'Limpoint';
  
  return new Promise((resolve, reject) => {
    jwt.verify(token, secret, (err: any, decoded: any) => {
      if (err) {        
        reject("El Token ya expiró");
      } else {
        resolve('Token vigente');
      }
    });
  });
};