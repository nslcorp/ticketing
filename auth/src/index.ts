import mongoose from 'mongoose';
import { app } from './app';

const start = async () => {
  if (!process.env.JWT_KEY){
    throw Error('JWT_KEY must be defined')
  }

  try {
    const mongoURL = process.env.MODE === 'local' ? 'mongodb://auth-mongo-srv:27017/auth' : 'mongodb://auth-mongo-srv:27017/auth';
    await mongoose.connect(mongoURL);
    console.log('Connected to MongoDb');
  } catch (err) {
    console.error(err);
  }

  app.listen(3000, () => {
    console.log('Listening on port 3000!!!!!!!!');
  });
};

start();
