import express from 'express';
import TaskRouter from './modules/tasks/tasks.route';
import ContactRouter from './modules/contacts/contacts.route';
import { PgDataSource } from '../db/datasource';
import cors from 'cors';
import ImgurService from './services/storage/imgur.service';
import multer from 'multer';

// Multer Storage
const multerStorage = multer.memoryStorage();
const upload = multer({ storage: multerStorage });

const app = express();

app.use(cors());

// Third party services - Image storage
const imgurClientId = '0c9268ee7f1b1be';
const storageService = new ImgurService(imgurClientId);

// Middleware
app.use(express.json());

// Routes

const tasksRouter = new TaskRouter().init();
const contactRouter = new ContactRouter(storageService, upload).init();

app.use('/tasks', tasksRouter);
app.use('/contacts', contactRouter);

// Example route
app.get('/example', async (req, res) => {
  const tasks = await PgDataSource.getRepository('Task').find();
  res.send({
    tasks: tasks,
  });
});

export default app;
