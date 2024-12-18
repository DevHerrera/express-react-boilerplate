import express from 'express';
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
const contactRouter = new ContactRouter(storageService, upload).init();

app.use('/contacts', contactRouter);

export default app;
