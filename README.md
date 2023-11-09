# Diogo Madeira - Recruiting Challenge Mosano

## Backend

### Tecnologias Utilizadas
- Nest JS (Node JS + Express JS)
- MongoDB
- Mongoose
- Autenticação JWT
- Typescript
- Eslint

### Funcionalidades
Para o backend, desenvolvi uma autenticação com users hard-coded. Além disso, implementei 2 CRUDs completos:
1. CRUD para os customers
2. CRUD para os countries

Decidi integrar a autenticação, mesmo que não fosse obrigatória, para adicionar alguns pontos extras ao projeto.

O MONGODB_URI está hard-coded, desta forma podem aceder à bd que está disponível online.

## Frontend

### Tecnologias Utilizadas
- React JS (Vite)
- Typescript
- Radix UI
- Axios
- Redux Toolkit (Slices method)
- Tailwind CSS
- Eslint

### Funcionalidades
No frontend, criei um login screen e um home screen. Utilizei Redux + Axios para realizar os pedidos à minha API. Configurei o Redux para persistir os dados. No Home screen, é possível visualizar os customers sem autenticação. No entanto, é necessário autenticação para registrar novos ou eliminar existentes. Se o usuário não estiver autenticado, os campos desaparecem, mostrando apenas um botão que redireciona para a tela de login. Toda a listagem de customers e countries é dinâmica, utilizando nossa API e o MongoDB.
