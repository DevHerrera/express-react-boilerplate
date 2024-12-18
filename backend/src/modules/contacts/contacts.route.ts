import { Router } from 'express';
import { PgDataSource } from '../../../db/datasource';
import { Contact } from '../../entities/contact.entity';
import { ContactService } from './contacts.service';
import { ContactsController } from '../../controllers/contacts/contacts.controller';
import { Repository } from 'typeorm';
import { validatePayload } from '../../middlewares/validatePayload.middleware';
import { createContactDto } from './dto/createContact.dto';
import { updateContactDto } from './dto/updateContact.dto';
import ImgurService from 'src/services/storage/imgur.service';
import multer from 'multer';

export default class ContactRouter {
  public router: Router;
  private contactService: ContactService;
  private contactController: ContactsController;
  private contactRepository: Repository<Contact>;

  private createContactMiddleware = validatePayload(createContactDto);
  private updateContactMiddleware = validatePayload(updateContactDto);

  constructor(
    private storageService: ImgurService,
    private upload: multer.Multer,
  ) {
    this.router = Router();
    this.contactRepository = PgDataSource.getRepository(Contact);
    this.contactService = new ContactService(this.contactRepository);
    this.contactController = new ContactsController(
      this.contactService,
      this.storageService,
    );
  }

  public init() {
    this.router
      .route('/')
      .post(
        this.upload.single('image'),
        this.createContactMiddleware.bind(this.createContactMiddleware),
        this.contactController.create.bind(this.contactController),
      );

    this.router
      .route('/:id')
      .get(this.contactController.getOne.bind(this.contactController));

    this.router
      .route('/:id')
      .patch(
        this.upload.single('image'),
        this.updateContactMiddleware.bind(this.updateContactMiddleware),
        this.contactController.update.bind(this.contactController),
      );

    this.router
      .route('/:id')
      .delete(this.contactController.delete.bind(this.contactController));

    this.router
      .route('/')
      .get(this.contactController.getAll.bind(this.contactController));

    return this.router;
  }
}
