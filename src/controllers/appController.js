   import CatchAsync from '../middlewares/CatchAsync';
   import sendMessage from '../utils/responses/sendMessage';

   export const welcome = CatchAsync(async (req, res, next) => {
     res.setHeader('Content-type', 'application/json');

     return sendMessage(res, 'Welcome to PMB');
   });