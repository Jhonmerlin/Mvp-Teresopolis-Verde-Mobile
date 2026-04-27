# MVP Mobile Teresópolis Verde

[Requisitos](https://docs.google.com/spreadsheets/d/1IZSwmbxBpIOXO3OpsqzFw1VTxJPGX-l041Kza5OrA3k/edit?usp=sharing)


Este projeto foi desenvolvido com o objetivo de permitir que usuários visualizem trilhas, cachoeiras e eventos, além de realizarem inscrições de forma simples e rápida.

A aplicação conta com um sistema de autenticação, gerenciamento de itens e controle de inscrições, funcionando de forma integrada entre frontend, backend e banco de dados em nuvem. O foco principal é oferecer uma experiência fluida para usuários em dispositivos mobile, com navegação simples e responsiva.

---
▶️ Como executar o projeto

Para rodar o sistema localmente, siga os passos abaixo:

📦 Pré-requisitos

Antes de iniciar, você precisa ter instalado:

Node.js
NPM ou Yarn
Conta no MongoDB Atlas (banco em nuvem)
📁 Clonar o projeto
git clone https://github.com/Jhonmerlin/MVP-Mobile-Teres-polis-Verde
cd trilhas-app

📥 Instalar dependências

Dentro da pasta do backend, execute:

npm install
⚙️ Configurar o banco de dados

O projeto utiliza MongoDB em nuvem.
Configure a conexão no arquivo principal do backend:

mongoose.connect(process.env.MONGO_URI)

Depois, crie um arquivo .env na raiz do backend:

MONGO_URI=sua_string_de_conexao_do_mongodb_atlas
🚀 Iniciar o servidor

Para rodar a aplicação:

node servidor.js

Ou, se preferir modo desenvolvimento:

npx nodemon servidor.js
🌐 Acessar a aplicação

Após iniciar o servidor:

Backend: http://localhost:3000
Frontend: abrir o arquivo index.html ou rodar via extensão Live Server

🔗 Integração

O frontend se comunica com o backend através de requisições HTTP (fetch), consumindo rotas como:

/registrar
/login
/itens
/inscrever
/minhas-inscricoes



## 🚀 Funcionalidades

* Cadastro de usuários
* Login com validação de senha
* Listagem de trilhas, cachoeiras e eventos
* Visualização de detalhes de cada item
* Inscrição em datas e horários disponíveis
* Cancelamento de inscrição
* Área do usuário com histórico de inscrições

---

## 🛠️ Tecnologias utilizadas

### Frontend

* HTML
* CSS
* Bootstrap
* JavaScript

### Backend

* Node.js
* Express

### Banco de dados

* MongoDB (utilizando banco em nuvem)

### Outros

* Bcrypt (criptografia de senha)
* CORS


## 📱 Telas do sistema

* Tela inicial com navegação entre categorias
* Tela de login e cadastro
* Tela de listagem de itens
* Tela de detalhes
* Tela de inscrição
* Área do usuário com histórico e cancelamento

---

## 🔐 Segurança

As senhas dos usuários são criptografadas antes de serem armazenadas no banco de dados, garantindo maior segurança das informações.

Além disso, o sistema realiza validações para evitar duplicidade de inscrições.

---

## 📈 Considerações

O projeto foi desenvolvido com foco em aprendizado prático, aplicando conceitos de desenvolvimento web completo, desde a interface até a persistência de dados.

A estrutura permite evolução futura, como melhorias na interface, autenticação mais robusta e integração com outros serviços.

---

## 👨‍💻 Autor

Desenvolvido por Jonathan bandeira Barboza - 06000943

