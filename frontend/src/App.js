import React, { useState } from 'react';
import Cart from './Carrinho';
import AddProducts from './AdicionarProdutos';

function App() {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [view, setView] = useState('addProduct'); 

  // Função para salvar ou editar produto
  const handleSaveProduct = async (savedProduct) => {
    const method = savedProduct.id ? 'PUT' : 'POST';
    const url = savedProduct.id 
      ? `http://localhost:5000/products/${savedProduct.id}` 
      : 'http://localhost:5000/products';

    try {
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(savedProduct),
      });

      if (!response.ok) throw new Error('Erro ao salvar o produto');

      const product = await response.json();
      setProducts(prevProducts => 
        savedProduct.id 
          ? prevProducts.map(p => (p.id === product.id ? product : p))
          : [...prevProducts, product] 
      );

      setView('cart');
      setSelectedProduct(null); // Limpa a seleção
    } catch (error) {
      console.error(error);
    }
  };

  // Função para excluir produto
  const handleDeleteProduct = async (id) => {
    try {
      await fetch(`http://localhost:5000/products/${id}`, {
        method: 'DELETE',
      });
      setProducts(prevProducts => prevProducts.filter(product => product.id !== id)); // Remove produto
    } catch (error) {
      console.error(error);
    }
  };

  // Função para editar um produto
  const handleEditProduct = (product) => {
    setSelectedProduct(product);
    setView('addProduct');
  };

  const renderView = () => {
    const commonProps = { 
      products, 
      onEditProduct: handleEditProduct, 
      onDeleteProduct: handleDeleteProduct 
    };

    return view === 'cart' 
      ? <Cart {...commonProps} /> 
      : <AddProducts selectedProduct={selectedProduct} onSave={handleSaveProduct} />;
  };

  return (
    <div>
      <header>
        <h1>Catálogo de Produtos</h1>
        <button onClick={() => setView('addProduct')}>Adicionar Produto</button>
        <button onClick={() => setView('cart')}>Ver Carrinho</button>
      </header>
      {renderView()}
    </div>
  );
}

export default App;
