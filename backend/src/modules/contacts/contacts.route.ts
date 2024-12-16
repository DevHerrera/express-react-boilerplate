import { Router } from 'express';
import { PgDataSource } from '../../../db/datasource';
import { Contact } from '../../entities/contact.entity';
import { ContactService } from './contacts.service';
import { ContactsController } from '../../controllers/contacts/contacts.controller';
import { Repository } from 'typeorm';
import { validatePayload } from '../../middlewares/validatePayload.middleware';
import { createContactDto } from './dto/createContact.dto';
import { updateContactDto } from './dto/updateContact.dto';

export default class ContactRouter {
  public router: Router;
  private contactService: ContactService;
  private contactController: ContactsController;
  private contactRepository: Repository<Contact>;

  private createContactMiddleware = validatePayload(createContactDto);
  private updateContactMiddleware = validatePayload(updateContactDto);

  constructor() {
    this.router = Router();
    this.contactRepository = PgDataSource.getRepository(Contact);
    this.contactService = new ContactService(this.contactRepository);
    this.contactController = new ContactsController(this.contactService);
  }

  public init() {
    this.router
      .route('/') // host/contacts POST
      .post(
        this.createContactMiddleware.bind(this.createContactMiddleware),
        this.contactController.create.bind(this.contactController),
      );

    this.router
      .route('/:id')
      .get(this.contactController.getOne.bind(this.contactController));

    this.router
      .route('/:id')
      .patch(
        this.updateContactMiddleware.bind(this.updateContactMiddleware),
        this.contactController.update.bind(this.contactController),
      );

    this.router
      .route('/:id')
      .delete(this.contactController.delete.bind(this.contactController));

    this.router
      .route('/')
      .get(this.contactController.getAll.bind(this.contactController));

    //  this.router.post(
    //    '/',
    //    this.createTaskMiddleware.bind(this.createTaskMiddleware),
    //    this.taskController.create.bind(this.taskController),
    //  );
    //  this.router
    //    .route('/:id')
    //    .put(this.taskController.update.bind(this.taskController));
    return this.router;
  }
}
