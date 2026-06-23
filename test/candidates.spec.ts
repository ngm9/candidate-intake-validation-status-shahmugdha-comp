import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';

describe('Candidates intake (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleRef.createNestApplication();
    await app.init();
  });

  afterEach(async () => {
    await app.close();
  });

  it('creates a valid candidate and returns 201', async () => {
    const res = await request(app.getHttpServer())
      .post('/candidates')
      .send({ name: 'Asha Rao', email: 'asha@example.com', experienceYears: 3 })
      .expect(201);

    expect(res.body).toEqual(
      expect.objectContaining({
        id: expect.any(Number),
        name: 'Asha Rao',
        email: 'asha@example.com',
        experienceYears: 3,
      }),
    );
  });

  it('stores experienceYears as a number even when sent as a string', async () => {
    const res = await request(app.getHttpServer())
      .post('/candidates')
      .send({ name: 'Vikram Singh', email: 'vikram@example.com', experienceYears: '5' })
      .expect(201);

    expect(res.body.experienceYears).toBe(5);
    expect(typeof res.body.experienceYears).toBe('number');
  });

  it('rejects a candidate with a missing name', async () => {
    await request(app.getHttpServer())
      .post('/candidates')
      .send({ email: 'noname@example.com', experienceYears: 2 })
      .expect(400);
  });

  it('rejects a candidate with an invalid email', async () => {
    await request(app.getHttpServer())
      .post('/candidates')
      .send({ name: 'Bad Email', email: 'not-an-email', experienceYears: 2 })
      .expect(400);
  });

  it('rejects a candidate with a negative experienceYears', async () => {
    await request(app.getHttpServer())
      .post('/candidates')
      .send({ name: 'Negative Exp', email: 'neg@example.com', experienceYears: -1 })
      .expect(400);
  });
});
