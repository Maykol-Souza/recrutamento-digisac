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

// Função para listar todos os produtos com filtros e ordenação
const listarProdutos = (req, res) => {
  try {
    const produtos = lerProdutos(); // Lê os produtos do arquivo JSON
    let filteredProducts = produtos; // Inicia a lista filtrada como todos os produtos

    // Filtragem por nome
    if (req.query.nome) {
      const nameFilter = req.query.nome.toLowerCase(); // Converte o filtro para minúsculas
      filteredProducts = filteredProducts.filter(product =>
        product.nome && product.nome.toLowerCase().includes(nameFilter) // Verifica se o nome do produto contém o filtro
      );
    }

    // Filtragem por preço
    if (req.query.preco) {
      const precoFilter = parseFloat(req.query.preco); // Converte para número
      filteredProducts = filteredProducts.filter(product => product.preco === precoFilter); // Filtra pelo preço exato
    }

    // Filtragem por quantidade
    if (req.query.quantidade) {
      const quantidadeFilter = parseInt(req.query.quantidade, 10); // Converte para número
      filteredProducts = filteredProducts.filter(product => product.quantidade === quantidadeFilter); // Filtra pela quantidade exata
    }

    // Verifica se algum produto foi encontrado
    if (filteredProducts.length === 0) {
      return res.status(404).json({ message: 'Nenhum produto encontrado' });
    }

    // Ordenação por quantidade
    if (req.query.orderBy) {
      if (req.query.orderBy === 'quantity-asc') {
        filteredProducts.sort((a, b) => a.quantidade - b.quantidade); // Ordenação crescente
      } else if (req.query.orderBy === 'quantity-desc') {
        filteredProducts.sort((a, b) => b.quantidade - a.quantidade); // Ordenação decrescente
      }
    }

    return res.json(filteredProducts); // Retorna os produtos filtrados
  } catch (error) {
    console.error('Erro ao listar produtos:', error); // Log do erro no console
    res.status(500).json({ message: 'Erro interno do servidor' }); // Responde com erro 500
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


// Função para adicionar um novo produto
const adicionarProduto = (req, res) => {
  const { nome, preco, quantidade } = req.body;
  const produtos = lerProdutos();

  // Definindo valores padrão para os campos
  const newProduct = {
    id: produtos.length > 0 ? produtos[produtos.length - 1].id + 1 : 1,
    nome: nome || 'null', // Se não for fornecido, define como string vazia
    preco: preco !== undefined ? preco : 0, // Se não for fornecido, define como 0
    quantidade: quantidade !== undefined ? quantidade : 0 // Se não for fornecido, define como 0
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
  const { nome, preco, quantidade } = req.body;
  if (nome) {
    produtos[productIndex].nome = nome; // Atualiza o nome se fornecido
  }
  if (preco !== undefined) {
    produtos[productIndex].preco = preco; // Atualiza o preço se fornecido
  }
  if (quantidade !== undefined) {
    produtos[productIndex].quantidade = quantidade; // Atualiza a quantidade se fornecida
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
