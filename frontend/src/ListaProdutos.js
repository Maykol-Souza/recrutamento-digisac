import React, { useState, useEffect } from 'react';
import './ListaProdutos.css';

function ProductList() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [newProduct, setNewProduct] = useState({ nome: '', price: '', quantity: '' });
  const [isEditing, setIsEditing] = useState(false); // Estado para controlar se estamos editando
  const [editProductId, setEditProductId] = useState(null); // ID do produto que está sendo editado

  // Função para buscar todos os produtos
  const fetchProducts = async () => {
    try {
      const response = await fetch('http://localhost:5000/products');
      if (!response.ok) {
        if (response.status === 404) {
          setProducts([]);
        } else {
          throw new Error('Erro ao buscar produtos');
        }
      } else {
        const data = await response.json();
        setProducts(data);
      }
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // Função para adicionar um novo produto
  const addProduct = async () => {
    const { nome, price, quantity } = newProduct;

    if (!nome || !price|| !quantity) {
      window.alert('Por favor, preencha todos os campos do produto.');
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newProduct),
      });

      if (!response.ok) {
        throw new Error('Erro ao adicionar produto');
      }

      const product = await response.json();
      setProducts([...products, product]);
      setNewProduct({ nome: '', price: '', quantity: '' });
    } catch (err) {
      setError(err.message);
    }
  };

  // Função para deletar um produto
  const deleteProduct = async (id) => {
    try {
      await fetch(`http://localhost:5000/products/${id}`, {
        method: 'DELETE',
      });
      setProducts(products.filter(product => product.id !== id));
    } catch (err) {
      setError(err.message);
    }
  };

  // Função para iniciar a edição de um produto
  const startEditProduct = (product) => {
    setNewProduct(product);
    setIsEditing(true); // Habilita o modo de edição
    setEditProductId(product.id);
  };

  // Função para salvar as alterações do produto
  const saveProduct = async () => {
    const { nome, price, quantity } = newProduct;

    if (!nome || !price || !quantity) {
      window.alert('Por favor, preencha todos os campos do produto.');
      return;
    }

    try {
      const response = await fetch(`http://localhost:5000/products/${editProductId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newProduct),
      });

      if (!response.ok) {
        throw new Error('Erro ao atualizar produto');
      }

      const updatedProduct = await response.json();
      setProducts(products.map(product => (product.id === editProductId ? updatedProduct : product)));
      setIsEditing(false); // Sai do modo de edição
      setNewProduct({ nome: '', price: '', quantity: '' });
      setEditProductId(null); // Reseta o ID do produto em edição
    } catch (err) {
      setError(err.message);
    }
  };

  if (loading) return <p>Carregando...</p>;
  if (error) return <p>Erro: {error}</p>;

  return (
    <div className="product-list">
      <header>
        <h1>Catálogo de Produtos</h1>
      </header>

      <main>
        {products.length === 0 ? (
          <p><strong>Carrinho vazio</strong></p>
        ) : (
          <ul>
            {products.map(product => (
              <li key={product.id}>
                <strong>{product.nome}</strong> 
                <span>R${product.price}</span>
                <span>Quantidade: {product.quantity}</span>
                <button onClick={() => startEditProduct(product)}>Editar</button>
                <button onClick={() => deleteProduct(product.id)}>Excluir</button>
              </li>
            ))}
          </ul>
        )}

        <h2>{isEditing ? 'Editar Produto' : 'Adicionar Novo Produto'}</h2>

        <form>
          <label>
            Nome: <input 
              type="text" 
              value={newProduct.nome} 
              onChange={(e) => setNewProduct({ ...newProduct, nome: e.target.value })} 
            />
          </label>

          <label>
            Preço: <input 
              type="number" 
              value={newProduct.price} 
              onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })} 
            />
          </label>

          <label>
            Quantidade: <input 
              type="number" 
              value={newProduct.quantity} 
              onChange={(e) => setNewProduct({ ...newProduct, quantity: e.target.value })} 
            />
          </label>

          {/* Exibe o botão "Salvar" se estiver editando ou "Adicionar Produto" se não estiver */}
          <button type="button" onClick={isEditing ? saveProduct : addProduct}>
            {isEditing ? 'Salvar Alterações' : 'Adicionar Produto'}
          </button>
        </form>
      </main>
    </div>
  );
}

export default ProductList;