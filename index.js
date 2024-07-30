const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());

const products = [];
let currentId = 1;

app.post('/products', (req, res) => {
    const product = { id: currentId++, ...req.body };
    products.push(product);
    res.status(201).json(product);
});

app.get('/products', (req, res) => {
    res.json(products);
});

app.get('/products/:id', (req, res) => {
    const product = products.find(p => p.id === parseInt(req.params.id));
    if (!product) return res.status(404).send('Produto não encontrado');
    res.json(product);
});

app.put('/products/:id', (req, res) => {
    const product = products.find(p => p.id === parseInt(req.params.id));
    if (!product) return res.status(404).send('Produto não encontrado');
    Object.assign(product, req.body);
    res.json(product);
});

app.delete('/products/:id', (req, res) => {
    const index = products.findIndex(p => p.id === parseInt(req.params.id));
    if (index === -1) return res.status(404).send('Produto não encontrado');
    const deleted = products.splice(index, 1);
    res.json(deleted);
});

if (require.main === module) {
    app.listen(port, () => {
        console.log(`Servidor rodando em http://localhost:${port}`);
    });
}

module.exports = app;
