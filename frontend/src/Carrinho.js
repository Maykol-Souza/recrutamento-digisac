import React, { useState, useEffect } from 'react';

function Cart({ onEditProduct }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
        // Garantir que o preço seja um número
        const formattedData = data.map(product => ({
          ...product,
          price: Number(product.price), // Converter price para número
        }));
        setProducts(formattedData);
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

  const deleteProduct = async (id) => {
    try {
      await fetch(`http://localhost:5000/products/${id}`, { method: 'DELETE' });
      setProducts(products.filter(product => product.id !== id));
    } catch (err) {
      setError(err.message);
    }
  };


  if (loading) return <p>Carregando...</p>;
  if (error) return <p>Erro: {error}</p>;

  const calculateTotal = () => {
    return products.reduce((total, product) => total + product.price * product.quantity, 0).toFixed(2);
  };

  return (
    <div className="cart-container">
      <h2>Carrinho de Compras</h2>
      <div className="cart-header">
        <div>Código do Produto</div>
        <div>Produto</div>
        <div>Valor</div>
        <div>Quantidade</div>
        <div>Ações</div>
      </div>
      {products.map(product => (
    <div key={product.id} className="product-item">
      <div>{product.id}</div>
    <div className="product-info">{product.nome}</div>
    <div>R${product.price.toFixed(2)}</div>
    <div>{product.quantity}</div>

    
    <div>
      <button onClick={() => onEditProduct(product)}>Editar</button>
      <button onClick={() => deleteProduct(product.id)}>Excluir</button>
    </div>


  </div>
      ))}

<div className="summary">
        <h3>Resumo da compra</h3>
        <p><span>Sub-total:</span> <span>R${calculateTotal()}</span></p>
        <p><span>Total:</span> <span>R${calculateTotal()}</span></p>
        <button type="button" onClick={() => {
          const total = calculateTotal();
           if (total > 0) {
             alert('Compra Finalizada!');
                }}}>FINALIZAR COMPRA </button>
</div>
    </div>
  ); 

  
}

export default Cart;
