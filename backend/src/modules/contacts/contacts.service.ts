import { Repository } from 'typeorm';
import { Contact } from 'src/entities/contact.entity';

interface CreateContactInterface {
  //    photoUrl: string;
  fullName: string;
  phone: string;
  email?: string;
}

export class ContactService {
  constructor(private contactRepository: Repository<Contact>) {}

  checkExistingContact = async (id: number) => {
    const contact = await this.contactRepository.findOneBy({ id });
    if (!contact) throw new Error('Contact not found');
    return contact;
  };

  async findAll(page: number, pageSize: number) {
    const skip = (page - 1) * pageSize;

    const [data, total] = await this.contactRepository.findAndCount({
      skip: skip,
      take: pageSize,
      order: {
        fullName: 'ASC',
      },
    });

    return {
      data,
      total,
      page,
      pageSize,
      totalPages: Math.ceil(total / pageSize),
    };
  }

  async findOne(id: number) {
    await this.checkExistingContact(id);
    return this.contactRepository.findOneBy({ id });
  }

  create(contact: CreateContactInterface) {
    const newContact = this.contactRepository.create(contact);
    return this.contactRepository.save(newContact);
  }

  async update(id: number, updateData: Partial<CreateContactInterface>) {
    const contact = await this.checkExistingContact(id);
    this.contactRepository.merge(contact, updateData);
    return this.contactRepository.save(contact);
  }

  async delete(id: number) {
    await this.checkExistingContact(id);
    return this.contactRepository.delete(id);
  }
}
