import { Request, Response } from 'express';
import { ContactService } from 'src/modules/contacts/contacts.service';
import ImgurService from 'src/services/storage/imgur.service';

export class ContactsController {
  constructor(
    private contactService: ContactService,
    private imgurService: ImgurService,
  ) {}

  private uploadContactPhoto = async (req: Request, res: Response) => {
    if (req.file) {
      const uploadedFileUrl = await this.imgurService.upload(req.file.buffer);
      req.body.photoUrl = uploadedFileUrl;
    }
  };

  async getAll(req: Request, res: Response): Promise<Response> {
    try {
      const page = parseInt(req.query.page as string, 10) || 1;
      const pageSize = parseInt(req.query.pageSize as string, 10) || 10;

      const result = await this.contactService.findAll(page, pageSize);

      return res.status(200).json(result);
    } catch (error) {
      console.error('Error fetching contacts:', error);
      return res.status(500).json({ error: 'Failed to fetch contacts' });
    }
  }

  async getOne(req: Request, res: Response) {
    const task = await this.contactService.findOne(+req.params.id);
    return res.json(task);
  }

  async create(req: Request, res: Response) {
    try {
      await this.uploadContactPhoto(req, res);
      const contact = await this.contactService.create(req.body);
      return res.status(201).json(contact);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }

  async update(req: Request, res: Response) {
    try {
      await this.uploadContactPhoto(req, res);
      const contact = await this.contactService.update(
        +req.params.id,
        req.body,
      );
      return res.json(contact);
    } catch (error) {
      return res.status(404).json({ message: error.message });
    }
  }

  async delete(req: Request, res: Response) {
    try {
      const result = await this.contactService.delete(+req.params.id);
      return res.json(result);
    } catch (error) {
      return res.status(404).json({ message: error.message });
    }
  }
}
