import express from 'express';
import cors from 'cors';
import path from 'path';
import router from './routers/router';
import GlobalErrorHandler from './utils/Errors/GlobalErrorHandler';
import AppError from './utils/Errors/AppError';

const app = express();

app.use(express.json());
app.use(cors());

app.use('/api/v1', router);

// Docs
app.use("/docs", (req, res) => {
  res.redirect("https://documenter.getpostman.com/view/9978541/TzRRBTKk");
});

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  })
}

app.all('*', (req, res, next) => {
  next(new AppError("Can't find " + req.originalUrl + "on this server!", 404));
});

app.use(GlobalErrorHandler);

export default app;