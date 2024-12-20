import express from 'express';
import TaskRouter from './modules/tasks/tasks.route';
import { PgDataSource } from '../db/datasource';
import cors from 'cors';

const app = express();

app.use(cors());

// Middleware
app.use(express.json());

// Routes

const tasksRouter = new TaskRouter().init();

app.use('/tasks', tasksRouter);

// Example route
app.get('/example', async (req, res) => {
  const tasks = await PgDataSource.getRepository('Task').find();
  res.send({
    tasks: tasks,
  });
});

export default app;
