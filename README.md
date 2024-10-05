# Recrutamento Interno

## Visão Geral

Este projeto consiste em um catálogo de produtos, com um backend em Node.js e um frontend em React. Ele permite visualizar, adicionar, editar e excluir produtos.

## Tecnologias Utilizadas

- **Backend:** Node.js, Express
- **Frontend:** React
- **Banco de Dados:** JSON (product.json)

## Pré-requisitos

Antes de começar, certifique-se de ter o seguinte instalado em sua máquina:

- Node.JS
  
## Instalação e Execução

### 1. Backend

**Clone o repositório:**
```
git clone https://github.com/Maykol-Souza/recrutamento-digisac.git
cd recrutamento-digisac/backend
```
**Instale as dependências:**
Certifique-se de estar na pasta do projeto e execute:
```
npm install
npm install react-scripts
npm install
npm install express
npm install nodemon --save-dev
```
Inicie o servidor:
```
npm start
```
A API estará disponível em http://localhost:5000.

## Endpoints Principais
- Listar Produtos: GET /products
- Adicionar Produto: POST /products
- Atualizar Produto: PUT /products/id
- Deletar Produto: DELETE /products/id
  
## Erros Comuns
- 404 Not Found: Rota não encontrada.
- 500 Internal Server Error: Erro interno no servidor.

### 2. Frontend
**Acessando o repositorio:**
Com o repositorio já clonado, acesse a pasta frondend:
```
cd frontend
```
**Instale as dependências:**
Certifique-se de estar na pasta do projeto e execute:
```
npm install
npm install react-scripts
```

**Inicie o servidor:**
```
npm start
```
O aplicativo estará disponível em http://localhost:3000.

#### Erro na inicialização:
Caso apresente erro durante a inicialização, remove e reinstale novamente o node_modules. Ás vezes, pode ficar corrompido... Tente remover e reinstalar todas as dependências:
```
rm -rf node_modules
npm install
```

### Funcionalidades do Catálogo de Produtos
- Visualização de Produtos: Lista todos os produtos disponíveis no catálogo.
- Adicionar Produto: Permite que novos produtos sejam adicionados ao catálogo.
- Editar Produto: Possibilita a edição das informações de produtos já existentes.
- Remover Produto: Permite a exclusão de produtos do catálogo.

- Observações
Certifique-se de que o backend está em execução em http://localhost:5000 para que as requisições funcionem corretamente.
