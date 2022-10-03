import express  from 'express';
import 'express-async-errors';
import bodyParser from 'body-parser';
import { NotFoundError } from './errors/not-found-error';
import { errorHandler } from './middlwares/error-handler';
import { currentUserRouter } from './routes/current-user';
import { signinUserRouter } from './routes/signin';
import { signoutUserRouter } from './routes/signout';
import { signupUserRouter } from './routes/signup';


const app = express();

app.use(bodyParser.json())

app.use(currentUserRouter)
app.use(signupUserRouter)
app.use(signinUserRouter)
app.use(signoutUserRouter)

app.get('/', (req, res) => {
  res.send('Success')
})

app.all('*', async (req, res) => {
  throw new NotFoundError();
});

app.use(errorHandler);



app.listen(3000, () => {
  console.log('Express started!!! 14:50')
})
