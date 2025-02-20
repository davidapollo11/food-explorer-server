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

## 📝 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

---

Feito com ❤️ por [David Apollo](https://github.com/davidapollo11) 🚀

