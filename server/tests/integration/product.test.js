import request from 'supertest';
import app from '../../src/app.js';
import { setupTestDB, clearDatabase, seedProducts, seedInventory } from '../helpers/dbHelper.js';

describe('Product API', () => {
  beforeAll(async () => {
    await setupTestDB();
  });

  beforeEach(async () => {
    await clearDatabase();
  });

  describe('GET /product/all', () => {
    it('should return empty array when no products exist', async () => {
      const response = await request(app).get('/product/all');
      expect(response.status).toBe(200);
      expect(response.body).toEqual([]);
    });

    it('should return all products', async () => {
      await seedProducts([{ name: 'Product 1' }, { name: 'Product 2' }]);
      const response = await request(app).get('/product/all');
      expect(response.status).toBe(200);
      expect(response.body).toHaveLength(2);
    });
  });

  describe('PUT /product', () => {
    it('should create a new product', async () => {
      const response = await request(app)
        .put('/product')
        .send({ name: 'Test Product' });
      expect(response.status).toBe(200);
      expect(response.body).toEqual([{ name: 'Test Product' }]);
    });

    it('should return 400 for empty name', async () => {
      const response = await request(app).put('/product').send({ name: '' });
      expect(response.status).toBe(400);
    });

    it('should return 400 for missing name', async () => {
      const response = await request(app).put('/product').send({});
      expect(response.status).toBe(400);
    });

    it('should return 400 for duplicate product', async () => {
      await request(app).put('/product').send({ name: 'Test Product' });
      const response = await request(app)
        .put('/product')
        .send({ name: 'Test Product' });
      expect(response.status).toBe(400);
    });
  });

  describe('PATCH /product/:name', () => {
    beforeEach(async () => {
      await request(app).put('/product').send({ name: 'Old Name' });
    });

    it('should update product name', async () => {
      const response = await request(app)
        .patch('/product/Old Name')
        .send({ name: 'New Name' });
      expect(response.status).toBe(200);
      expect(response.body).toEqual({ name: 'New Name' });
    });

    it('should return 404 for non-existent product', async () => {
      const response = await request(app)
        .patch('/product/Non-existent')
        .send({ name: 'New Name' });
      expect(response.status).toBe(404);
    });

    it('should return 409 if new name already exists', async () => {
      await request(app).put('/product').send({ name: 'Existing Name' });
      const response = await request(app)
        .patch('/product/Old Name')
        .send({ name: 'Existing Name' });
      expect(response.status).toBe(409);
    });

    it('should allow updating product with same name', async () => {
      const response = await request(app)
        .patch('/product/Old Name')
        .send({ name: 'Old Name' });
      expect(response.status).toBe(200);
    });
  });

  describe('DELETE /product/:name', () => {
    beforeEach(async () => {
      await request(app).put('/product').send({ name: 'Test Product' });
    });

    it('should delete product', async () => {
      const response = await request(app).delete('/product/Test Product');
      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('message');
    });

    it('should return 404 for non-existent product', async () => {
      const response = await request(app).delete('/product/Non-existent');
      expect(response.status).toBe(404);
    });

    it('should return 400 if product is in inventory', async () => {
      await seedInventory([{ name: 'Test Product', quantity: 5 }]);
      const response = await request(app).delete('/product/Test Product');
      expect(response.status).toBe(400);
    });
  });
});
