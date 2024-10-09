import React, { useState, useEffect } from 'react';

function AddProducts({ selectedProduct, onSave }) {
  const [newProduct, setNewProduct] = useState({ nome: '', price: '', quantity: '' });
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (selectedProduct) {
      setNewProduct(selectedProduct);
      setIsEditing(true);
    } else {
      setNewProduct({ nome: '', price: '', quantity: '' });
      setIsEditing(false);
    }
  }, [selectedProduct]);

  const saveProduct = async () => {
    const { nome, price, quantity } = newProduct;

    if (!nome || !price || !quantity) {
      window.alert('Por favor, preencha todos os campos do produto.');
      return;
    }

    try {
      const url = isEditing
        ? `http://localhost:5000/products/${selectedProduct.id}`
        : 'http://localhost:5000/products';

      const method = isEditing ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method: method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newProduct),
      });

      if (!response.ok) {
        throw new Error(isEditing ? 'Erro ao atualizar produto' : 'Erro ao adicionar produto');
      }

      const savedProduct = await response.json();
      onSave(savedProduct);
      setNewProduct({ nome: '', price: '', quantity: '' });
    } catch (err) {
      console.error(err);
      window.alert(err.message);
    }
  };

  return (
    <div>
      <h2>{isEditing ? 'Editar Produto' : 'Adicionar Novo Produto'}</h2>
      <form>
        <label>Nome:<input type="text" value={newProduct.nome} onChange={(e) => setNewProduct({ ...newProduct, nome: e.target.value })} /></label>
       
        <label>Preço:<input type="number" value={newProduct.price} onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })} /></label>
        
        <label>Quantidade:<input type="number" value={newProduct.quantity} onChange={(e) => setNewProduct({ ...newProduct, quantity: e.target.value })} /></label>
        
        <button type="button" onClick={saveProduct}>
          {isEditing ? 'Salvar Alterações' : 'Adicionar Produto'}
        </button>
        
      </form>
    </div>
  );
}

export default AddProducts;