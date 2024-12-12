import app from './app';

import { PgDataSource } from '../db/datasource';

const PORT = process.env.PORT || 3000;

PgDataSource.initialize()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
    console.log('Database connected');
  })
  .catch((error) => {
    console.error(`Error connecting to database: ${error}`);
  });
