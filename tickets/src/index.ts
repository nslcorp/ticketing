import mongoose from 'mongoose';
import { app } from './app';

const start = async () => {
  if (!process.env.JWT_KEY){
    throw Error('JWT_KEY must be defined')
  }
  if (!process.env.MONGO_URI){
    throw Error('JWT_KEY must be defined')
  }
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDb:: tickets-mongo');
  } catch (err) {
    console.error(err);
  }

  app.listen(3000, () => {
    console.log('Listening on port 3000!!!!!!!!');
  });
};

start();
