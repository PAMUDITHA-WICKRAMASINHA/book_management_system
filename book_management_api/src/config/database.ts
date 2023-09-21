import mongoose from 'mongoose';

const URI = process.env.DATABASE_URL;

const connection = mongoose
  .createConnection(URI, {
    autoIndex: false,
  })
  .useDb(process.env.DATABASE || '', { useCache: true, noListener: true });

connection.on('open', async () => {
  console.log('Database Connection has been established successfully!');
});

connection.on('error', (err) => {
  console.error(err);
  process.exit(1);
});

export default connection;
