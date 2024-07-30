const request = require('supertest');
const app = require('../index');

describe('Products API', () => {
    let productId;

    it('should create a new product', async () => {
        const res = await request(app)
            .post('/products')
            .send({
                name: 'Product 1',
                price: 100
            });
        expect(res.statusCode).toEqual(201);
        expect(res.body).toHaveProperty('id');
        productId = res.body.id;
    });

    it('should fetch all products', async () => {
        const res = await request(app).get('/products');
        expect(res.statusCode).toEqual(200);
        expect(res.body.length).toBeGreaterThan(0);
    });

    it('should fetch a single product by ID', async () => {
        const res = await request(app).get(`/products/${productId}`);
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('id', productId);
    });

    it('should update a product by ID', async () => {
        const res = await request(app)
            .put(`/products/${productId}`)
            .send({
                name: 'Updated Product',
                price: 150
            });
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('name', 'Updated Product');
    });

    it('should delete a product by ID', async () => {
        const res = await request(app).delete(`/products/${productId}`);
        expect(res.statusCode).toEqual(200);
        expect(res.body[0]).toHaveProperty('id', productId);
    });
});
