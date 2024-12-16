import { Request, Response } from 'express';
import { ContactService } from 'src/modules/contacts/contacts.service';

export class ContactsController {
  constructor(private contactService: ContactService) {}

  async getAll(req: Request, res: Response): Promise<Response> {
    try {
      // Get `page` and `pageSize` from query parameters, with defaults
      const page = parseInt(req.query.page as string, 10) || 1;
      const pageSize = parseInt(req.query.pageSize as string, 10) || 10;

      // Call the service method to fetch paginated data
      const result = await this.contactService.findAll(page, pageSize);

      // Respond with paginated data
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
    const contact = await this.contactService.create(req.body);
    return res.status(201).json(contact);
  }

  async update(req: Request, res: Response) {
    try {
      const task = await this.contactService.update(+req.params.id, req.body);
      return res.json(task);
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
