import './src/config/ImportEnv';
import './src/config/DbConfig';
import app from './src/app';

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log('App run on ' + port);
});