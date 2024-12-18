import request from 'supertest';
import app from '../../../app';
import { Contact } from '../../../entities/contact.entity';
import { PgDataSource as AppDataSource } from '../../../../db/datasource';
import { builtinModules } from 'module';

const buildDatabase = async () => {
  await AppDataSource.dropDatabase();
  await AppDataSource.runMigrations();
};

const seedDatabase = async () => {
  await buildDatabase();
  const contactRepository = AppDataSource.getRepository(Contact);
  await contactRepository.save([
    {
      id: 1,
      fullName: 'John Doe',
      email: 'john@example.com',
      phone: '1234567890',
    },
    {
      id: 2,
      fullName: 'Jane Doe',
      email: 'jane@example.com',
      phone: '0987654321',
    },
  ]);
};

beforeAll(async () => {
  if (!AppDataSource.isInitialized) {
    await AppDataSource.initialize();
  }

  await buildDatabase();
});

describe('GET /contacts', () => {
  it('should not return a list of contacts', async () => {
    const response = await request(app).get('/contacts');
    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      page: 1,
      pageSize: 10,
      total: 0,
      totalPages: 0,
      data: [],
    });
  });

  it('should return a list of contacts', async () => {
    await seedDatabase();
    const response = await request(app).get('/contacts');
    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      page: 1,
      pageSize: 10,
      total: 2,
      totalPages: 1,
      data: expect.arrayContaining([
        expect.objectContaining({
          fullName: 'John Doe',
          email: 'john@example.com',
          phone: '1234567890',
          photoUrl: null,
        }),
        expect.objectContaining({
          fullName: 'Jane Doe',
          email: 'jane@example.com',
          phone: '0987654321',
          photoUrl: null,
        }),
      ]),
    });
  });
});

describe('GET /contacts/:id', () => {
  it('should return a contact', async () => {
    await seedDatabase();
    const response = await request(app).get('/contacts/1');
    expect(response.status).toBe(200);
  });

  it('should not return a contact', async () => {
    await buildDatabase();
    const response = await request(app).get('/contacts/1');
    expect(response.status).toBe(404);
  });
});

describe('Patch /contacts/:id', () => {
  it('should not patch a contact - invalid payload', async () => {
    await buildDatabase();
    const response = await request(app).patch('/contacts/1', {});
    expect(response.status).toBe(400);
  });

  it('should patch a contact', async () => {
    await seedDatabase();
    const response = await request(app).patch('/contacts/1').send({
      fullName: 'John Doe',
      email: 'test@test.com',
    });
    expect(response.status).toBe(200);
  });
});

describe('Post /contacts', () => {
  it('should not post a contact - invalid payload', async () => {
    await buildDatabase();
    const response = await request(app).post('/contacts', {});
    expect(response.status).toBe(400);
  });

  it('should post a contact', async () => {
    await seedDatabase();
    const response = await request(app).post('/contacts').send({
      fullName: 'John Doe',
      email: 'test@test.com',
      phone: '1234567890',
    });
    expect(response.status).toBe(201);
  });
});
