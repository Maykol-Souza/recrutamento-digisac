# Catálogo de Produtos

Este projeto é um catálogo de produtos em React que permite visualizar, adicionar, editar e excluir produtos.

## Funcionalidades
- **Adicionar Produto**: Permite adicionar um novo produto ao catálogo.
- **Editar Produto**: Permite editar as informações de um produto existente.
- **Excluir Produto**: Permite remover um produto do catálogo.
- **Visualizar Carrinho**: Mostra todos os produtos no carrinho e o total da compra.

## Tecnologias Utilizadas

- **Frontend:** React
- **Backend:** Node.js (express), para gerenciar as rotas e dados dos produtos.
- **Banco de Dados:** JSON (product.json)
- **React**
- **Hooks** (useState, useEffect)
- **Fetch API** para requisições HTTP

## Estrutura do Projeto

O projeto é dividido em dois componentes principais:

1. **Cart.js**: Gerencia a visualização e manipulação do carrinho de compras.
2. **AddProducts.js**: Gerencia a adição e edição de produtos.

### Cart.js

- Exibe a lista de produtos no carrinho.
- Permite editar e excluir produtos.
- Exibe um resumo da compra com subtotal e total.

### AddProducts.js

- Formulário para adicionar novos produtos ou editar produtos existentes.
- Valida a entrada dos produtos desejados pelo usuário antes de salvar.

## Executando o Projeto

## Pré-requisitos

Antes de começar, certifique-se de ter o seguinte instalado em sua máquina:

- Node.js
- NPM (geralmente vem com o Node.js)
- Um servidor backend em execução (como o Express) que forneça a API para os produtos.

## Instalação

1. Clone o repositório:
   ```
   git clone https://github.com/Maykol-Souza/recrutamento-digisac
   cd recrutamento-digisac\frontend
   ```  
2. Instale as dependências:
Certifique-se de estar na pasta do projeto e execute:
```
npm install
npm install react-scripts
```
3. Inicie o servidor:
Após a instalação das dependências, inicie o projeto com:
```
npm start
```
O aplicativo estará disponível em http://localhost:3000.

## Observações
- Certifique-se de que o backend está em execução em http://localhost:5000 para que as requisições funcionem corretamente.
