# TFC - Trybe Futebol Clube

## Descrição 

O TFC é um site informativo sobre partidas e classificações de futebol! ⚽️

No time de desenvolvimento do TFC, meu squad ficou responsável por desenvolver uma API (utilizando o método TDD) e também integrar - através do docker-compose - as aplicações para que elas funcionem consumindo um banco de dados.

Nesse projeto, precisei construir um back-end dockerizado utilizando modelagem de dados através do Sequelize. O desenvolvimento teve que respeitar regras de negócio providas no projeto e a API desenvolvida teve que ser capaz de ser consumida por um front-end já provido no projeto.

Para adicionar uma partida foi necessário ter um token, portanto a pessoa deverá estar logada para fazer as alterações. Houve um relacionamento entre as tabelas teams e matches para fazer as atualizações das partidas.

O meu back-end implementou regras de negócio para popular adequadamente a tabela disponível no front-end que será exibida para a pessoa usuária do sistema.


## Tecnologias utilizadas 
#### Para desenvolvimento do backend
`Node.js`, `Express`, `TypeScript`, `MySQL`, `Sequelize`, `bcryptjs`, `JWT (JSON Web Token)`

#### Para teste de integração do backend
`Mocha`, `Sinon.js`, `Chai`

## Como instalar esse projeto localmente na sua máquina

Antes de tudo é preciso fazer o clone do projeto para sua máquina (é necessário ter o git instalado), escolha uma pasta no seu pc, entre nela e pelo terminal execute o seguinte comando: 

```bash
git clone https://github.com/andersonleite1/project-tfc
```

## Como executar o projeto 

#### Através do Docker

_Obs: você precisa ter o Docker e Docker Compose instalados e configurados na sua máquina para esse passo funcionar corretamente_

```bash
cd project-tfc
```
Para subir o container

```bash
npm run compose:up
```
Para derrubar o container

```bash
npm run compose:down
```
Para visualizar os logs

```bash
npm run logs
```
#### Para visualizar

Para visualizar o frontend consumindo os dados da API acesse [http://localhost:3000/](http://localhost:3000/)
Para acessar a API [http://localhost:3001/](http://localhost:3001/)

Você já está com o `TFC`  rodando na sua máquina local é só aproveitar :smile: 