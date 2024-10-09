import { Application, Response, Request } from "express";
import { IRoute } from "../../Types/general.types";
import userRoute from './user.route';


const routes: IRoute[] = [
  {
    path: '/api/user',
    handler: userRoute
  },
  {
    path: '/',
    handler: (req: Request, res: Response): void => {
      res.status(200).json({
        msg: `Server running properly`
      })
    }
  }
];

export default (app: Application): void => {
  routes.forEach(route => {
    if (route.path == '/') {
      app.get(route.path, route.handler);
    } else {
      app.use(route.path, route.handler);
    }
  })
} 