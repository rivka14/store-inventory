import request from 'supertest';
import app from '../../src/app.js';
import { productRepository } from '../../src/repositories/productRepository.js';
import { inventoryRepository } from '../../src/repositories/inventoryRepository.js';

describe('Inventory API', () => {
  beforeEach(() => {
    const allProducts = productRepository.getAll();
    allProducts.forEach(p => productRepository.delete(p.name));
    inventoryRepository.reset();
    productRepository.create('Product 1');
    productRepository.create('Product 2');
  });

  describe('GET /inventory', () => {
    it('should return empty array when no inventory exists', async () => {
      const response = await request(app).get('/inventory');
      expect(response.status).toBe(200);
      expect(response.body).toEqual([]);
    });

    it('should return current inventory', async () => {
      inventoryRepository.save([
        { name: 'Product 1', quantity: 5 },
        { name: 'Product 2', quantity: 10 },
      ]);
      const response = await request(app).get('/inventory');
      expect(response.status).toBe(200);
      expect(response.body).toHaveLength(2);
    });
  });

  describe('POST /inventory', () => {
    it('should save valid inventory', async () => {
      const items = [
        { name: 'Product 1', quantity: 5 },
        { name: 'Product 2', quantity: 10 },
      ];
      const response = await request(app).post('/inventory').send({ items });
      expect(response.status).toBe(200);
      expect(response.body).toEqual(items);
    });

    it('should return 400 for invalid items format', async () => {
      const response = await request(app)
        .post('/inventory')
        .send({ items: 'not an array' });
      expect(response.status).toBe(400);
    });

    it('should return 400 for missing name', async () => {
      const items = [{ quantity: 5 }];
      const response = await request(app).post('/inventory').send({ items });
      expect(response.status).toBe(400);
    });

    it('should return 400 for invalid quantity', async () => {
      const items = [{ name: 'Product 1', quantity: 0 }];
      const response = await request(app).post('/inventory').send({ items });
      expect(response.status).toBe(400);
    });

    it('should return 400 for non-existent product', async () => {
      const items = [{ name: 'Non-existent', quantity: 5 }];
      const response = await request(app).post('/inventory').send({ items });
      expect(response.status).toBe(400);
    });

    it('should return 400 for duplicate products', async () => {
      const items = [
        { name: 'Product 1', quantity: 5 },
        { name: 'Product 1', quantity: 10 },
      ];
      const response = await request(app).post('/inventory').send({ items });
      expect(response.status).toBe(400);
    });

    it('should replace existing inventory', async () => {
      await request(app)
        .post('/inventory')
        .send({ items: [{ name: 'Product 1', quantity: 5 }] });
      const response = await request(app)
        .post('/inventory')
        .send({ items: [{ name: 'Product 2', quantity: 10 }] });
      expect(response.status).toBe(200);
      expect(response.body).toEqual([{ name: 'Product 2', quantity: 10 }]);
    });
  });

  describe('POST /inventory/reset', () => {
    it('should clear all inventory items', async () => {
      inventoryRepository.save([{ name: 'Product 1', quantity: 5 }]);
      const response = await request(app).post('/inventory/reset');
      expect(response.status).toBe(200);
      expect(response.body).toEqual([]);
    });

    it('should work on empty inventory', async () => {
      const response = await request(app).post('/inventory/reset');
      expect(response.status).toBe(200);
      expect(response.body).toEqual([]);
    });
  });
});
