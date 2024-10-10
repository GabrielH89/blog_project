# My_gallery

## Blog
![GitHub repo size](https://img.shields.io/github/repo-size/GabrielH89/blog_project)
![GitHub language count](https://img.shields.io/github/languages/count/GabrielH89/blog_project)

![project_image](https://github.com/user-attachments/assets/1740e063-6abd-4674-81c7-acfcd336cd20)
![project_image](https://github.com/user-attachments/assets/444faf27-23c3-4284-879c-fcd09d720635)

## Tecnologias usadas no projeto: 
![Node.js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)
![typescript](https://img.shields.io/badge/typesctript-43853D?style=for-the-badge&logo=typescript&logoColor=)
![Express.js](https://img.shields.io/badge/Express.js-404D59?style=for-the-badge)
![Javascript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Vite](https://img.shields.io/badge/vite-%23646CFF.svg?style=for-the-badge&logo=vite&logoColor=white)
![CSS3](https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white)

## Descrição
O projeto premite que o usuário crie uma conta e, após isso, faça o login no sistema. Após isso, ele tem acesso a todos os posts criados por ele e outros usuários. o usuário pode comentar, dar likes e avaliar um post.

## Requisitos
Tenha o npm, o mysql e o node Js instalados na sua máquina.

## Instalação e execução do projeto na máquina local
1. Execute o comando: git clone git@github.com:GabrielH89/blog_project.git

#### No diretório backend
1. Estando no diretório backend, execute o comando $ npm install.

2. Crie um arquivo .env e insira, nele, as variáveis do arquivo .env.example, que está na raíz do diretório backend. Obs: é necessário criar um banco de dados no mysql, na sua máquina local.

3. Após isso, execute o arquivo para criar as tabelas no banco: $mysql -u seu_usuario_mysql -p nomedobanco -e "source ./src/database/connection_DB/create_tables.sql" 

4. Por fim, execute o comando $ npm start

OBS: ainda irei atualizar o readme.md

#### No diretório frontend
1. Dentro do diretório frontend, execute o comando $ npm install.   

2.Lembre-se de manter a porta do frontend igual à do backend para garantir a conexão.

3. Após as dependências serem instaladas, através do comando anterior, o projeto está pronto para funcionar em sua própria máquina, com o comando $npm run dev, que mostrará em qual porta está rodando a aplicação, geralmente a localhost:5173.