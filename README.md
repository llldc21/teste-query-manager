# Instruções de uso

Após clonar o repositorio, não se esqueça de digitar o comando:
```
npm install
```
ou
```
yarn install
```
---
## Testes
---
Para rodar os testes usar: 
```
npm test
```
ou
```
yarn test
```
---
## Utilizando a api com Postman
---
- Antes de tudo é necessario iniciar o banco de dados, certifique-se de ter docker-compose instalado, para isso utilize:
```
npm run db:run
``` 
ou
```
yarn run db:run
``` 
- Antes de iniciar a aplicação utilize o seguinte comando para rodar as seeds no banco de dados
```
npm sequelize db:seed:all
``` 
ou
```
yarn sequelize db:seed:all
``` 

- Após isso use o seguinte comando para inciar a aplicação:
```
npm start
``` 
ou
```
yarn star
```
---
## Sobre a api
---

São 9 rotas divididas em:

`/session` - Rota em que faz-se o login na aplicação, atravês do e-mail e senha, o usuario para acesso encontra-se em seeders/.
- `email` - String
- `password` - String
___
`/suppliers/create` - Rota para cadastrar um fornecedor, os campos exigidos são: 
- `name` - String - Nome do fornecedor
- `email` - String - E-mail do fornecedor
- `address` - String - Endereço do fornecedor
- `price_hour` - String - Valor da hora do fornecedor
- `capacity` - String - Capacidade do fornecedor 

`/suppliers/list` - Rota para listar os fornecedores

`/suppliers/update/:id` - Rota para editar os dados de um fornecedor, para esse rota é necessario informar o ID do fornecedor. Os campos passiveis de edição são os mesmo da rota `/suppliers/create`

`/suppliers/delete/:id` - Rota para deletar um fornecedor, para esse rota é necessario informar o ID do fornecedor.
___
`/scheduling/create` - Rota para cadastrar um agendamento, os campos exigidos são: 
- `supplier_id` - Integer - ID do fornecedor
- `start_date` - String (YYYY/MM/DD) - Data de incio
- `start_date` - String (YYYY/MM/DD) - Data de fim 

`/scheduling/list` - Rota para listar os agendamentos

`/scheduling/update/:id` - Rota para editar os dados de um agendamento, para esse rota é necessario informar o ID do agendamento. Os campos passiveis de edição são os mesmo da rota `/scheduling/create`

`/scheduling/delete/:id` - Rota para deletar um agendamento, para esse rota é necessario informar o ID do agendamento.
___

Na pasta `/postman` estão os arquivos utilizados para os testes. Com a ferramente é possivel realizar chamadas para a api de maneira mais simplificada.
 