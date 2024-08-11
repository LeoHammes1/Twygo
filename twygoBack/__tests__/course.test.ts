import request from 'supertest';
import mongoose from 'mongoose';
import app from '../src/index';
import Course from '../src/models/Course';

describe('Course Controller', () => {
  beforeAll(async () => {
    await mongoose.connect(process.env.MONGO_URI!);
  });

  afterEach(async () => {
    await mongoose.connection.db.dropDatabase();
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  describe('POST /api/courses', () => {
    it('Deve criar um novo curso com dados válidos', async () => {
      const response = await request(app)
        .post('/api/courses')
        .send({
          title: 'Curso de Testes',
          description: 'Aprenda a testar APIs com Jest.',
          endDate: '2024-12-31',
          videos: [
            { title: 'Introdução aos Testes', size: 100 }
          ]
        });

      expect(response.status).toBe(201);
      expect(response.body.title).toBe('Curso de Testes');
    });

    it('Deve retornar erro ao criar curso com dados inválidos', async () => {
      const response = await request(app)
        .post('/api/courses')
        .send({
          title: '',
          description: '',
          endDate: '',
          videos: []
        });

      expect(response.status).toBe(400);
      expect(response.body.message).toContain('O título do curso é obrigatório');
    });
  });

  describe('GET /api/courses', () => {
    it('Deve retornar uma lista de cursos válidos', async () => {
      await Course.create({
        title: 'Curso de Node.js',
        description: 'Curso avançado de Node.js.',
        endDate: '2024-12-31',
        videos: [{ title: 'Node.js Básico', size: 50 }]
      });

      const response = await request(app).get('/api/courses');
      expect(response.status).toBe(200);
      expect(response.body.length).toBe(1);
      expect(response.body[0].title).toBe('Curso de Node.js');
    });
  });

  describe('PUT /api/courses/:id', () => {
    it('Deve retornar erro ao tentar atualizar curso com dados inválidos', async () => {
      const course = await Course.create({
        title: 'Curso de Node.js',
        description: 'Curso avançado de Node.js.',
        endDate: '2024-12-31',
        videos: [{ title: 'Node.js Básico', size: 50 }]
      });
  
      const response = await request(app)
        .put(`/api/courses/${course._id}`)
        .send({
          title: '',
        });
  
      expect(response.status).toBe(400);
      expect(response.body.message).toContain('Error updating course: O título do curso é obrigatório');
    });

    it('Deve retornar erro ao tentar atualizar curso com dados inválidos', async () => {
      const course = await Course.create({
        title: 'Curso de Node.js',
        description: 'Curso avançado de Node.js.',
        endDate: '2024-12-31',
        videos: [{ title: 'Node.js Básico', size: 50 }]
      });

      const response = await request(app)
        .put(`/api/courses/${course._id}`)
        .send({
          title: '',
        });

      expect(response.status).toBe(400);
      expect(response.body.message).toContain('Error updating course');
    });
  });

  describe('DELETE /api/courses/:id', () => {
    it('Deve deletar um curso existente', async () => {
      const course = await Course.create({
        title: 'Curso de Node.js',
        description: 'Curso avançado de Node.js.',
        endDate: '2024-12-31',
        videos: [{ title: 'Node.js Básico', size: 50 }]
      });

      const response = await request(app).delete(`/api/courses/${course._id}`);

      expect(response.status).toBe(200);
      expect(response.body.message).toBe('Course deleted');

      const deletedCourse = await Course.findById(course._id);
      expect(deletedCourse).toBeNull();
    });

    it('Deve retornar erro ao tentar deletar um curso que não existe', async () => {
        const response = await request(app).delete(`/api/courses/613b1c8b2f3b4f34c0f1a2a7`);
        expect(response.status).toBe(404);
        expect(response.body.message).toBe('Curso não encontrado');
      });
  });
});
