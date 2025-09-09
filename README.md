# 🚀 Sistema simples para armazenar receitas

![Badge de Status](https://img.shields.io/badge/Status-Conclu%C3%ADdo-green)
![Badge de Licença](https://img.shields.io/github/license/wvinim/recipes)

## 📝 Descrição do projeto

Solução para o desafio de criar um sistema para o gerenciamento de receitas culinárias.
Meu tempo estava bem curto, então eu me preocupei com as funcionalidades e deixei a estilização de lado.

## 🌟 Funcionalidades principais
* 📦 Funcionalidade 1: Cadastro de usuário no sistema.
* 📦 Funcionalidade 2: Login de usuário.
* 📦 Funcionalidade 3: Logoff de usuário.
* 📦 Funcionalidade 4: Cadastro de receitas.
* 📦 Funcionalidade 5: Listagem de receitas.
* 📦 Funcionalidade 6: Edição de uma receita.
* 📦 Funcionalidade 7: Exclusão de uma receita.
* 📦 Funcionalidade 8: Visualização de uma receita.

## 💻 Tecnologias utilizadas

* **Backend:** `NestJS com Typescript e Swagger`
* **Backend:** `Vue.js`
* **Banco de Dados:** `MySQL`
* **Outros:** `Docker` (versão 28.3.0)

## ⚙️ Antes de rodar

1.  Clone este repositório:
    ```bash
    git clone https://github.com/wvinim/recipes.git
    ```
2.  Entre na pasta do projeto:
    ```bash
    cd recipes
    ```
3.  Crie um arquivo `.env` na raiz do projeto, use como exemplo o `.env.example`

## ⚙️ Como rodar em docker

Com o docker instalado em sua máquina, siga os passos abaixo:

1.  Verifique o seu arquivo `.env` (pode copiar de `.env.example` ou alterar como precisar)

2.  Com o comando abaixo, seu serviço estará pronto para receber requisições:
    ```bash
    docker-compose up -d
    ```
    - Este comando inicia o MySQL, Backend e Frontend diretamente no docker

## ⚙️ Como remover este aplicativo do seu docker

```bash
docker-compose down --rmi all
```

## 🗺️ Como usar

Se você usou as mesmas portas do `.env.example`, basta acessar:

1.  Swagger para testar o backend: [http://localhost:3001/api](http://localhost:3001/api) (3001 - BACKEND_PORT)

2.  Para acessar o frontend: [http://localhost:8088](http://localhost:8088) (8088 - FRONTEND_PORT)

## 📝 Documentação das tabelas no MySQL

- O próprio script cria as tabelas durante a inicialização (se não existir), de acordo com a entity dos módulos.
        
## 💻 Testes unitários

Basta entrar em `cd backend` ou `cd frontend` e depois rodar:

```bash
    npm run test
```

## 🌟 Considerações finais

- O docker sobe os serviços com interdependência e em ambiente de desenvolvimento
    - Não criei uma versão com as builds para prod
- O token está sendo salvo em um cookie e não em localStorage
- Usei o verbo Patch ao invés de Put pois ele atende a todos os possíveis casos futuros
- Já fiz algo parecido com outras tecnologias:
    - React [challenge-meetings](https://github.com/wvinim/challenge-meetings)
    - React Native [news](https://github.com/wvinim/news)
- Foi meu primeiro desafio criando um app do zero em Vue.js
- Foquei em fazer o simples que funciona, mas segue as minhas sugestões para essa estrutura:
    - Gerenciar os dados via estado
    - Tornar off-line first
    - Melhorar o layout e adicionar camadas de exibição
    - Tratamento de erros mais robusto e com retentativa

## 📄 Licença

Este projeto está sob a licença [MIT](LICENSE) - veja o arquivo `LICENSE` para mais detalhes.

## 👤 Autor

* **Wellington Moraes** - [GitHub](https://github.com/wvinim) | [LinkedIn](https://www.linkedin.com/in/wellington-vinicius-moraes-726b4b58/)

---