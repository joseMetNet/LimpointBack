import { Router } from 'express';
import { postResource, getResources, deleteResource, postResourceOrder, getResourcesOrder, deleteResourcesOrder } from '../controllers/resource.controller';

const resourceRouter = Router();

// Upload image
var multipart = require("connect-multiparty");
const multipartMiddleware = multipart({ uploadDir: "assets/" });

resourceRouter.post("/resource",postResource);
resourceRouter.get("/resource",getResources);
resourceRouter.delete("/resource/:id", deleteResource);
resourceRouter.post("/resourceOrder",postResourceOrder);
resourceRouter.get("/resourceOrder/:idOrder",getResourcesOrder);
resourceRouter.delete("/resourceOrder/:id",deleteResourcesOrder);

export default resourceRouter;
