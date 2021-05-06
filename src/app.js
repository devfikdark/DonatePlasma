   import express from 'express';
   import cors from 'cors';
   import router from './routers/router';
   import GlobalErrorHandler from './utils/Errors/GlobalErrorHandler';
   import AppError from './utils/Errors/AppError';

   const app = express();

   app.use(express.json());
   app.use(cors());

   app.use('/api/v1', router);

   app.all('*', (req, res, next) => {
     next(new AppError("Can't find " + req.originalUrl + "on this server!", 404));
   });

   app.use(GlobalErrorHandler);

   export default app;