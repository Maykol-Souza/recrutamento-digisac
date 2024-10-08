const express = require('express');
const cors = require('cors');
const app = express();
const portaServer = 5000;

// Importando as funções do catálogo de produtos
const {
  listarProdutos,
  obterProdutoPorId,
  adicionarProduto,
  atualizarProduto,
  deletarProduto
} = require('./catalogoProdutos');

app.use(express.json());
app.use(cors());

// Rotas - Usando as funções importadas de catalogoProdutos.js
app.get('/products', listarProdutos);
app.get('/products/:id', obterProdutoPorId);
app.post('/products', adicionarProduto);
app.put('/products/:id', atualizarProduto);
app.delete('/products/:id', deletarProduto);


app.listen(portaServer, () => {
  console.log(`Servidor rodando na porta ${portaServer}`);
});
