const fs = require('fs');
const path = require('path');

const produtosFilePath = path.join(__dirname, 'produtos.json');

// Função para ler o arquivo JSON "Meu banco de dados"
const lerProdutos = () => {
  const data = fs.readFileSync(produtosFilePath);
  return JSON.parse(data);
};

// Função para salvar produtos no arquivo JSON "Meu banco de dados"
const salvarProdutos = (produtos) => {
  fs.writeFileSync(produtosFilePath, JSON.stringify(produtos, null, 2));
};

const listarProdutos = (req, res) => {
  try {
    const produtos = lerProdutos();
    let filteredProducts = produtos; 

    // Filtragem por nome
    if (req.query.nome) {
      const nameFilter = req.query.nome.toLowerCase();
      filteredProducts = filteredProducts.filter(product =>
        product.nome && product.nome.toLowerCase().includes(nameFilter)
      );
    }

    // Filtragem por preço
    if (req.query.price) {
      const precoFilter = parseFloat(req.query.price);
      filteredProducts = filteredProducts.filter(product => product.price === precoFilter);
    }

    // Filtragem por quantidade
    if (req.query.quantity) {
      const quantidadeFilter = parseInt(req.query.quantity, 10); // Converte para número
      filteredProducts = filteredProducts.filter(product => product.quantity === quantidadeFilter);
    }

    // Verifica se algum produto foi encontrado
    if (filteredProducts.length === 0) {
      return res.status(404).json({ message: 'Nenhum produto encontrado' });
    }

    // Ordenação por quantidade
    if (req.query.orderBy) {
      if (req.query.orderBy === 'quantity-asc') {
        filteredProducts.sort((a, b) => a.quantity - b.quantity);
      } else if (req.query.orderBy === 'quantity-desc') {
        filteredProducts.sort((a, b) => b.quantity - a.quantity);
      }
    }

    return res.json(filteredProducts);
  } catch (error) {
    console.error('Erro ao listar produtos:', error);
    res.status(500).json({ message: 'Erro interno do servidor' }); 
  }
};

// Função para obter um produto por ID
const obterProdutoPorId = (req, res) => {
  const produtos = lerProdutos();
  const product = produtos.find(p => p.id === parseInt(req.params.id));
  if (!product) return res.status(404).json(
    {
      message: 'Produto não encontrado' 
    });
  res.json(product);
};


const adicionarProduto = (req, res) => {
  const { nome, price, quantity } = req.body;
  const produtos = lerProdutos();

  // Definindo valores padrão para os campos
  const newProduct = {
    id: produtos.length > 0 ? produtos[produtos.length - 1].id + 1 : 1,
    nome: nome || 'null',
    price: price !== undefined ? price : 0, // 
    quantity: quantity !== undefined ? quantity : 0 
  };

  produtos.push(newProduct);
  salvarProdutos(produtos);
  res.status(201).json(newProduct);
};

// Atualiza apenas os campos que foram enviados na requisição
const atualizarProduto = (req, res) => {
  const produtos = lerProdutos();
  const productIndex = produtos.findIndex(p => p.id === parseInt(req.params.id));
  
  if (productIndex === -1) {
    return res.status(404).json({ message: 'Produto não encontrado' });
  }
  /* 
  No stackoverflow achei essa informação "!== undefined" caso o valor não seja declarado, não tenha alteração em outro campo
  */
  const { nome, price, quantity } = req.body;
  if (nome) {
    produtos[productIndex].nome = nome; 
  }
  if (price !== undefined) {
    produtos[productIndex].price = price;
  }
  if (quantity !== undefined) {
    produtos[productIndex].quantity = quantity;
  }

  salvarProdutos(produtos);
  res.json(produtos[productIndex]);
};


// Função para deletar um produto
const deletarProduto = (req, res) => {
  const produtos = lerProdutos();
  const productIndex = produtos.findIndex(p => p.id === parseInt(req.params.id));
  if (productIndex === -1) return res.status(404).json(
  { 
    message: 'Produto não encontrado' 
  }
);

  produtos.splice(productIndex, 1);
  salvarProdutos(produtos);
  res.status(204).end();
};

// Exportar as funções para serem usadas em outros arquivos
module.exports = {
  listarProdutos,
  obterProdutoPorId,
  adicionarProduto,
  atualizarProduto,
  deletarProduto
};
