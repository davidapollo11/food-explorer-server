# 🍽️ Food Explorer Server

**Status**: 🚀 Em desenvolvimento

## 💻 Projeto

O **Food Explorer Server** é o backend de uma aplicação de cardápio digital para um restaurante fictício. Ele gerencia a lógica de negócios e o armazenamento de dados, fornecendo uma API para o frontend consumir.

## 🚀 Tecnologias Utilizadas

- Node.js
- Express
- SQLite
- Knex.js

## 📂 Estrutura do Projeto

```
├── src/
|   ├── configs/
│   ├── controllers/
│   ├── database/
|   ├── middlewares/
|   ├── providers/
│   ├── routes/
|   ├── utils/
│   ├── server.js
├── tmp/
|   ├── uploads/
├── knexfile.js
├── package.json
└── README.md
```

## 🚀 **Rotas da API**

### **Usuários**

- **POST `/users`**  
  Cria um novo usuário.  
  - **Body**: `name`, `email`, `password`, `is_admin`.
  - **Autenticação**: Não é necessária.

- **PUT `/users`**  
  Atualiza as informações do usuário autenticado.  
  - **Body**: `name`, `email`, `old_password`, `password`,`is_admin`.
  - **Autenticação**: Necessária (usuário logado).

### **Pratos**

- **POST `/plates`**  
  Cria um novo prato.  
  - **Body**: `title`, `description`, `price`, `category`, `ingredients`.
  - **Autenticação**: Necessária (usuário com permissão de admin logado).

- **PUT `/plates/:id`**  
  Atualiza um prato existente.  
  - **Body**: `title`, `description`, `price`, `category`, `ingredients`.
  - **Autenticação**: Necessária (usuário com permissão de admin logado).

- **GET `/plates/:id`**  
  Obtém os detalhes de um prato específico.  
  - **Autenticação**: Não é necessária.

- **DELETE `/plates/:id`**  
  Exclui um prato.  
  - **Autenticação**: Necessária (usuário com permissão de admin logado).

- **GET `/plates`**  
  Lista todos os pratos.  
  - **Autenticação**: Não é necessária.

- **PATCH `/plates/image/:id`**  
  Atualiza a imagem de um prato.  
  - **Body**: Imagem (via multipart).
  - **Autenticação**: Necessária (usuário com permissão de admin logado).

### **Favoritos**

- **POST `/favorites`**  
  Adiciona um prato aos favoritos do usuário.  
  - **Body**: `plate_id`.
  - **Autenticação**: Necessária (usuário logado).

- **GET `/favorites`**  
  Lista os pratos favoritos do usuário autenticado.  
  - **Autenticação**: Necessária (usuário logado).

### **Pedidos**

- **POST `/orders`**  
  Cria um novo pedido.  
  - **Body**: `details`, `total_price`, `status`.
  - **Autenticação**: Necessária (usuário logado).

- **GET `/orders`**  
  Lista todos os pedidos.  
  - **Autenticação**: Não é necessária.

### **Sessões (Login)**

- **POST `/sessions`**  
  Realiza o login de um usuário e retorna o token de autenticação.  
  - **Body**: `email`, `password`.
  - **Autenticação**: Não é necessária.
  - A API retorna um token, que deve ser incluído no cabeçalho de todas as requisições que necessitam de autenticação.

## 🛠️ Como Instalar e Rodar o Projeto

1. **Clone o repositório:**

   ```bash
   git clone https://github.com/davidapollo11/food-explorer-server.git
   ```

2. **Navegue até o diretório do projeto:**

   ```bash
   cd food-explorer-server
   ```

3. **Instale as dependências:**

   ```bash
   npm install
   ```

4. **Execute as migrations para criar as tabelas:**

   ```bash
   npx knex migrate:latest
   ```

5. **Inicie o projeto:**

   ```bash
   npm run dev
   ```

   O servidor estará rodando em `http://localhost:3333`.

## 📖 Como Contribuir

1. Faça um fork do projeto.
2. Crie uma branch para sua feature (`git checkout -b minha-feature`).
3. Faça commit das suas alterações (`git commit -m 'Adiciona minha feature'`).
4. Faça push para a branch (`git push origin minha-feature`).
5. Abra um Pull Request.

---

Feito com ❤️ por [David Apollo](https://github.com/davidapollo11) 🚀

