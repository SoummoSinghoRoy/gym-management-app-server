import express, {Application} from 'express';
import mongoose from 'mongoose';
import env_variables from './config/custom_env_variable';
const app: Application = express();

const PORT: string | number = process.env.PORT || 8020;
import setMiddlewares from './middleware/middleware';
setMiddlewares(app);
import setRoute from './api/routes/route';
setRoute(app);

mongoose.set('strictQuery', false);
mongoose.connect(env_variables.db_uri).then((): void => {
  console.log(`DB connected....`);
  app.listen(PORT, (): void => {
    console.log(`Server connected on port ${PORT}`);
  })
}).catch((err): void => {
  console.log(err);
});
